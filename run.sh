#!/bin/bash

DIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" >/dev/null 2>&1 && pwd )"

# Load all variables from .env and export them all for script to read
if [[ -f "$DIR/.env" ]]; then
    source "$DIR/.env"
    export USER_ID=$UID
    export GROUP_ID=$UID
else
    echo $DIR
    echo '.env file is missing.'
    exit
fi

docker-compose up -d --build