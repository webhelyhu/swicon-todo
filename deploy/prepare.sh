#!/bin/bash

## move the current app out of the way. Erase previous backup
rm -rf node.backup
mv -f node node.backup

mkdir -p postgres/database-data
mkdir -p node/uploads/images
cp Dockerfile.node node/Dockerfile

cp -r ../app node/
cp -r ../config node/
cp -r ../migrations node/
cp -r ../models node/
cp ../production.env node/.env
cp ../.sequelizerc node/
cp ../package*.json node/
cp ../server.js node/

cd ../client/
npm run build
cd ..
mkdir -p deploy/node/client/
cp -r client/build deploy/node/client/

