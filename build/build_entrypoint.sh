#!/usr/bin/env bash

fixuid

npm ci

exec "$@"
