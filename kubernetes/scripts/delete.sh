#!/usr/bin/env bash

kubectl apply -k "$(pwd)"/kubernetes/configs/cache \
              -k "$(pwd)"/kubernetes/configs/db \
              -k "$(pwd)"/kubernetes/configs/directus
