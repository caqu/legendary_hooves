TOKEN=26dafa1607
IP=35.156.72.7
MESSAGE_ID=Carlos_test

function test {
  curl -si -H "API_Token: $TOKEN" -H "API_base: /" -H 'Content-Type: application/json' "http://$IP" -d "$1" > /tmp/file
  cat /tmp/file
}

test "{\"Id\":\"$MESSAGE_ID\",\"TotalParts\":2,\"PartNumber\":0,\"Data\":\"Happy\"}"
# test "{\"Id\":\"Carlos_test\",\"TotalParts\":2,\"PartNumber\":1,\"Data\":\"Thanksgiving\"}"
