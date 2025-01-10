#!/bin/bash
URL="http://127.0.0.1:3002/login"
response=$(curl -o /dev/null -s -w "%{http_code}\n" $URL)
http_code=$(tail -n1 <<< "$response")  # get the last line
content=$(sed '$ d' <<< "$response")   # get all but the last line which contains the status code
echo "$http_code"
if [ $http_code != "200" ]; then
   echo "is not 200"
   /usr/local/lib/nodejs/node-v20.10.0-linux-x64/bin/node dist/ssr/index.js
else
   echo "is 200"
fi
