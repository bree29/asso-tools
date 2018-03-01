// Simple function to send Weekly Status Sheets to contacts listed on the "Contacts" sheet in the MPD.

// Load a menu item called "Project Admin" with a submenu item called "Send Status"
// Running this, sends the currently open sheet, as a PDF attachment
function onOpen() {
  var submenu = [{name:"Envoyer la facture", functionName:"exportSomeSheets"}];
  SpreadsheetApp.getActiveSpreadsheet().addMenu('Trésorerie', submenu);  
}

function exportSomeSheets() {
  // Set the Active Spreadsheet so we don't forget
  var originalSpreadsheet = SpreadsheetApp.getActive();
    
  // Get Project Name from Cell A1
  var projectname = originalSpreadsheet.getRange("E3:E3").getValues(); 
  // Construct the Subject Line
  var subject = "Congrès UNECD : Facture " + projectname;

      
  // Get contact details from "Contacts" sheet and construct To: Header
  // Would be nice to include "Name" as well, to make contacts look prettier, one day.
  var contacts = originalSpreadsheet.getSheetByName("setup");
  var numRows = contacts.getLastRow();
  var emailTo = contacts.getRange(13, 3).getValues();

  // Set the message to attach to the email.
  var message = "Bonjour, vous trouverez en pièce-jointe la facture correspondante à nos précédents échanges.";
  
  // Google scripts can't export just one Sheet from a Spreadsheet
  // So we have this disgusting hack

  // Create a new Spreadsheet and copy the current sheet into it.
  var newSpreadsheet = SpreadsheetApp.create("Spreadsheet to export");
  var sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
  var projectname = SpreadsheetApp.getActiveSpreadsheet();
  sheet = originalSpreadsheet.getActiveSheet();
  sheet.copyTo(newSpreadsheet);
  
  
  // Find and delete the default "Sheet 1", after the copy to avoid triggering an apocalypse
  newSpreadsheet.getSheetByName('Feuille 1').activate();
  newSpreadsheet.deleteActiveSheet();
  
  // Make zee PDF, currently called "Weekly status.pdf"
  // When I'm smart, filename will include a date and project name
  var pdf = DriveApp.getFileById(newSpreadsheet.getId()).getAs('application/pdf').getBytes();
  var attach = {fileName: projectname + '.pdf',content:pdf, mimeType:'application/pdf'};

  // Send the freshly constructed email
  GmailApp.sendEmail(emailTo, subject, message, {attachments:[attach], name: 'Avant-Centième Congrès de l\'UNECD' });
  
  // Delete the wasted sheet we created, so our Drive stays tidy.
  DriveApp.getFileById(newSpreadsheet.getId()).setTrashed(true);  
}
