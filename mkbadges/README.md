# Prérequis
### 0. Installer les dépendances
`sudo apt install inkscape`

### 1. Rendre le script exécutable
`sudo chmod +x mkbadges.sh` (ou clic droit, propriété, permissions, cocher la case exécutable)

### 2. La charte graphique doit être nommé `modele.svg`
L'ouvrir au moins une fois avec Inkscape pour vérifier que tout soit à la bonne place, graphiquement
C'est le modèle, au FORMAT .SVG (Inkscape), selon une charte graphique.
Les variables (nom, prénom, ...) vont de 1 à 6, et mises entre crochets
 - {variable1}
 - {variable2}
 - {variable3}
 - {variable4}
 - {variable5}
 - {variable6}

### 3. Le fichier de variable doit être nommé `listing.csv' 
Il doit être ouvert avec un éditeur de texte avant de lancer le script pour vérifier que les données soient bien séparées par un point-virgule.
De fait, les données elles-mêmes ne doivent pas contenir de point-virgules. Idéalement, elles ne doivent pas contenir non plus de tabulations, ou de virgules.

Sous Google Sheet, les CSV sont exportés avec une VIRGULE. Il y a donc une petite manipulation à faire

Procédure via Google Sheet
Télécharger > format CSV
Éditeur de texte : rechercher et remplacer ===> "," par ";"


Le fichier de variable doit in fine contenir chaque ligne telles que
id;{variable1};{variable2};...{variable5};{variable6}

Il est possible de ne pas prendre en compte les dernières variables (ignorez les, tout simplement)

##### La première colonne doit contenir un identfiant unique (pour éviter les erreurs de doublons).
Le plus simple étant de faire : 1, 2, 3, 4 .... 134848, 133849, ....



# Lancez le script, c'est magique.
`./mkbadges.sh`

Chaque version dérivée du modèle se trouveront dans le dossier "Badges".

Pour tout fusionner, utiliser un logiciel pour fusionner tous les PDFs (ou tout simplement utiliser PDF ToolKit : pdftk)

```
sudo apt install pdftk
pdftk Badges/*.pdf cat ouput merged.pdf
```

