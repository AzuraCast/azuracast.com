#!/usr/bin/env bash

rm -rf ./src
rm -rf ./dist

mkdir -p ./src/content/docs ./src/images ./src/scss
cp ../src/content/config.ts ./src/content
cp -R ../src/content/docs/docs ./src/content/docs/docs
cp -R ../src/images/* ./src/images
cp -R ../src/scss/* ./src/scss
rm -f ./src/content/docs/docs/*.*
cp ./index.md ./src/content/docs

mkdir -p ./public
cp -R ../public/api ./public/api
cp -R ../public/img ./public/img

# Reference the local API in the SwaggerUI docs.
sed -i -r 's|url: "(.*?)"|url: "/api/openapi.yml"|' ./public/api/swagger-initializer.js

cd ..
npm ci
npm run builtin-build
