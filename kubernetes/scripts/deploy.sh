#!/usr/bin/env bash

kubectl apply -k "$(pwd)"/kubernetes/configs/config-map
kubectl apply -k "$(pwd)"/kubernetes/configs/cache
kubectl apply -k "$(pwd)"/kubernetes/configs/db
kubectl apply -k "$(pwd)"/kubernetes/configs/directus
