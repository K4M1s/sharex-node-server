#!/bin/bash

DIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" >/dev/null 2>&1 && pwd )"

# Load all variables from .env and export them all for script to read
if [[ -f "$DIR/app/.env" ]]; then
    source "$DIR/app/.env"
    export USER_ID=$UID
    export GROUP_ID=$UID
else
    echo $DIR
    echo '.env file is missing.'
    exit
fi

docker-compose --env-file app/.env -f build/docker-compose.yml down -v
docker-compose --env-file app/.env -f build/docker-compose.yml up -d --build