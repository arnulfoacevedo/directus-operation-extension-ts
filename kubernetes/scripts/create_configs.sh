#!/usr/bin/env bash

mkdir -p ./kubernetes/configs && \
cp docker-compose.yml ./kubernetes/configs && \
cp .env ./kubernetes/configs && \
cd ./kubernetes/configs && \
kompose convert && \
rm -f docker-compose.yml .env && \
cd ../..
