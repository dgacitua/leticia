#!/bin/sh

set -e

ORIG=$(pwd)
FILE=$(date +%F)
DEST=$HOME/backups
TEMP=$DEST/temp
LOGF=$DEST/backup.log

mkdir -p $DEST

echo "*** BACKUP STARTED AT $(date -R) ***" >> $LOGF

echo ">> [LeTiCiA-USER] Creating temp folder" >> $LOGF
mkdir -p $TEMP >> $LOGF 2>&1

echo ">> [LeTiCiA-USER] Backing up MongoDB" >> $LOGF
mongodump -v -h localhost:27017 -d leticia-user -o $DEST/temp >> $LOGF 2>&1

echo ">> [LeTiCiA-USER] Compresssing backup" >> $LOGF
cd $TEMP >> $LOGF 2>&1
tar -zcvf $DEST/$FILE-user.tar.gz * >> $LOGF 2>&1
cd $ORIG >> $LOGF 2>&1

echo ">> [LeTiCiA-USER] Deleting temp folder" >> $LOGF
chmod -R +w $TEMP >> $LOGF 2>&1
rm -rf $TEMP >> $LOGF 2>&1

echo ">> [LeTiCiA-DATA] Creating temp folder" >> $LOGF
mkdir -p $TEMP >> $LOGF 2>&1

echo ">> [LeTiCiA-DATA] Backing up MongoDB" >> $LOGF
mongodump -v -h localhost:27017 -d leticia-data -o $DEST/temp >> $LOGF 2>&1

echo ">> [LeTiCiA-DATA] Compresssing backup" >> $LOGF
cd $TEMP >> $LOGF 2>&1
tar -zcvf $DEST/$FILE-data.tar.gz * >> $LOGF 2>&1
cd $ORIG >> $LOGF 2>&1

echo ">> [LeTiCiA-DATA] Deleting temp folder" >> $LOGF
chmod -R +w $TEMP >> $LOGF 2>&1
rm -rf $TEMP >> $LOGF 2>&1

echo "*** BACKUP ENDED AT $(date -R) ***" >> $LOGF

set +e