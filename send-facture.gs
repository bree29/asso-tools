// Load a menu item called "Project Admin" with a submenu item called "Send Status"
// Running this, sends the currently open sheet, as a PDF attachment
function onOpen() {
  var submenu = [{name:"Envoyer la facture", functionName:"exportSomeSheets"}];
  SpreadsheetApp.getActiveSpreadsheet().addMenu('Trésorerie', submenu);  
}

function exportSomeSheets() {
  // Set the Active Spreadsheet so we don't forget
  var originalSpreadsheet = SpreadsheetApp.getActive();
  var setUp = originalSpreadsheet.getSheetByName("setup");
  var printSheet = originalSpreadsheet.getSheetByName("Facture");
  
  var envoyerMail = 0
  var facturePartenaire = 0
  
  // On récupère ce qu'on veut faire de ce script
  // Est-qu'il faut envoyer le mail au destinaire de la facture ?
 // var envoyerMail = setUp.getRange(3, 5).getValues();
 // var facturePartenaire = setUp.getRange(6, 5).getValues();
  
  var ui = SpreadsheetApp.getUi(); // Same variations.
  var result = ui.alert(
     'Envoyer un mail au destinataire de la facture ?',
     'Le message sera le message pré-formaté. Prenez gare à bien avoir rempli toutes les options',
      ui.ButtonSet.YES_NO);

  if (result == ui.Button.YES) {
    // User clicked "Yes".
   envoyerMail = "Oui";
  } 

  var ui = SpreadsheetApp.getUi(); // Same variations.
  var result = ui.alert(
     'La Facture est-elle destinée à un partenaire ?',
     'Autrement dit, les responsables des partenariats auront-ils besoin de cette facture ?',
      ui.ButtonSet.YES_NO);

  if (result == ui.Button.YES) {
    // User clicked "Yes".
   facturePartenaire = "Oui";
  }  
  
  // On récupère les différentes autres viariables qui nous serviront ensuite
  // Numéro de facture
  var numeroFacture = printSheet.getRange("e3:e3").getValues();  
 
   
  
    
   if (envoyerMail == "Oui" ) {
     // Si il faut envoyer un mail au partenaire
     
     // Export de la Sheet "Facture" ($printSheet) en PDF
  // on commence à cacher la sheet "setUp" afin qu'il ne soit pas exporté en PDF
     printSheet.showSheet();
     setUp.hideSheet();
  
  // On crée le PDF à partir du fichier SpreadSheet (!!! on ne peut pas exporter une sheet seule, d'où le hideSheet())
  // On lui donne comme nom "FYYMMDDhhmm.pdf" contenu dans $numeroFacture
  var pdf = DriveApp.getFileById(originalSpreadsheet.getId()).getAs('application/pdf').getBytes();
  var attach = {fileName: numeroFacture + '.pdf',content:pdf, mimeType:'application/pdf'};
  
  // On peut unHide la sheet setUp maintenant que le PDF est exporté
  setUp.showSheet();

     
      var subject = "Facture " + numeroFacture;
      var emailTo = setUp.getRange(14, 3).getValues();
      var genre = setUp.getRange(17, 3).getValues();
      var nomPart = setUp.getRange(20, 3).getValues();
      var prenomPart = setUp.getRange(21, 3).getValues();
      var nomExp = setUp.getRange(25, 3).getValues();
      var prenomExp = setUp.getRange(26, 3).getValues();
      var posteExp = setUp.getRange(27, 3).getValues();
      
    // Rédaction du mail
      var message = genre + " " + prenomPart + " " + nomPart + ",\n\nVous trouverez en pièce-jointe de ce mail la facture correspondante à nos précédents échanges.\n\nN'hésitez pas à me contacter pour toute question, restant à votre entière disposition.\n\nCordialement,\n" + prenomExp + " " + nomExp + ", " + posteExp;
     
    // Envoi du mail
  GmailApp.sendEmail(emailTo, subject, message, {attachments:[attach], name: 'Avant-Centième Congrès de l\'UNECD' });
     
    }

///////////////////////////// else { }
  
// Dans tous les cas on enregistre le PDF dans le dossier des factures émises (/ Trésorerie > Justificatifs > Factures émises)
  var folderTrezID = "1DVOUXnE52ahWTsYR5wox97ZjVZWsk6it";
  var folderTrez = DriveApp.getFolderById(folderTrezID);
  setUp.hideSheet();
  var theBlob = originalSpreadsheet.getBlob().getAs('application/pdf').setName(numeroFacture);
  var newFile = folderTrez.createFile(theBlob);
  setUp.showSheet();
  
  // Et si c'est pour un Part', on ajoute ça dans le dossier partenaire !
  if (facturePartenaire == "Oui" ) {
    var folderPartID = "1FYYPUEF-v-N1JtLOzPW4xPXj2pHbodCk";
    var folderPart = DriveApp.getFolderById(folderPartID);
    var newFile = folderPart.createFile(theBlob);
  }
  
}
