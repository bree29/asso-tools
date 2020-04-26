# Prérequis
### 1. Télécharger le script est installer les dépendances dans un dossier dédié.
```
mkdir -p mkbadges && cd mkbadges
wget https://raw.githubusercontent.com/bree29/asso-tools/master/mkbadges/mkbadges.sh
sudo apt install inkscape
```

### 2. Rendre le script exécutable
`chmod +x mkbadges.sh` (ou clic droit, propriété, permissions, cocher la case exécutable)

# Step by Step
La base de donnée (listing.csv) et le modèle (modele.svg) doivent être dans le même dossier que le script, à partir duquel celui-ci sera exécuté.

### 1. La charte graphique
La charte graphique doit être nommée `modele.svg`. L'ouvrir au moins une fois avec Inkscape pour vérifier que tout soit à la bonne place, graphiquement. C'est le modèle, au FORMAT .SVG (Inkscape), selon une charte graphique.
Les variables (nom, prénom, ...) vont de 1 à 6, et mises entre crochets
- {variable1}
- {variable2}
- {variable3}
- {variable4}
- {variable5}
- {variable6}

### 2. La base de données
Le fichier de variable doit être nommé `listing.csv`
Il doit être ouvert avec un éditeur de texte avant de lancer le script pour vérifier que les données soient bien séparées par un point-virgule. De fait, les données elles-mêmes ne doivent pas contenir de point-virgules. Idéalement, elles ne doivent pas contenir non plus de tabulations, ou de virgules.


##### Google Sheet
> Les CSV sont exportés avec une VIRGULE. Il y a donc une petite manipulation à faire
> Télécharger > format CSV
> Éditeur de texte : rechercher et remplacer ===> "," par ";"


Le fichier de variable doit in fine contenir chaque ligne telles que
id;{variable1};{variable2};...{variable5};{variable6}

Il est possible de ne pas prendre en compte les dernières variables (ignorez les, tout simplement)

**La première colonne doit contenir un identfiant unique (pour éviter les erreurs de doublons).**
Le plus simple étant de faire : 1, 2, 3, 4 .... 134848, 133849, ....



# Lancez le script, c'est magique.
`./mkbadges.sh`

Chaque version dérivée du modèle se trouveront dans le dossier "Badges".

Pour tout fusionner, utiliser un logiciel pour fusionner tous les PDFs (ou tout simplement utiliser PDF ToolKit : pdftk)

```
sudo apt install pdftk
pdftk Badges/*.pdf cat ouput merged.pdf
```


Erreur ?
canberra-gtk-module manquant ? ==> sudo apt install libcanberra-gtk-module
