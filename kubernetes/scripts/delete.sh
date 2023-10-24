#!/usr/bin/env bash

kubectl delete -k "$(pwd)"/kubernetes/configs/config-map
kubectl delete -k "$(pwd)"/kubernetes/configs/cache
kubectl delete -k "$(pwd)"/kubernetes/configs/db
kubectl delete -k "$(pwd)"/kubernetes/configs/directus
