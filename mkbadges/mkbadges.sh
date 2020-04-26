#!/bin/bash

TIMESTART=$(date +"%r")


BASEDIR=$PWD

OLDIFS=$IFS
IFS=";"

i=0
#nbprocess=$(wc -l $1)

###############################
#-----------------------------#
modele="modele.svg"
listing="listing.csv"

oData1="{variable1}"
oData2="{variable2}"
oData3="{variable3}"
oData4="{variable4}"
oData5="{variable5}"
oData6="{variable6}"


#-----------------------------#
###############################

mkdir -p "Badges"

while read id nData1 nData2 nData3 nData4 nData5 nData6
 do

mkdir -p ".tmp"


#SED DATAS

cp "$modele" ".tmp/tmpfile.svg"


sed -i "s%$oData1%$nData1%g" ".tmp/tmpfile.svg"
sed -i "s%$oData2%$nData2%g" ".tmp/tmpfile.svg"
sed -i "s%$oData3%$nData3%g" ".tmp/tmpfile.svg"
sed -i "s%$oData4%$nData4%g" ".tmp/tmpfile.svg"
sed -i "s%$oData5%$nData5%g" ".tmp/tmpfile.svg"
sed -i "s%$oData6%$nData6%g" ".tmp/tmpfile.svg"

fileName="$nData1 - $nData2 $nData3 - $id"
inkscape ".tmp/tmpfile.svg" -A Badges/$fileName.pdf

rm -r ".tmp"

((i++))
echo -e "$i : Badge ID $id -> DONE !"
done < "$listing"

IFS=$OLDIFS
TIMEEND=$(date +'%r')
echo -e "\n\nStart : $TIMESTART"
echo -e "End   : $TIMEEND"

exit
