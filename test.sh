TOKEN=26dafa1607
IP=localhost
PORT=3000
MESSAGE_ID=Carlos_test_7


# -si
function test {
  curl -s -H "API_Token: $TOKEN" -H "API_base: /" -H 'Content-Type: application/json' "http://$IP:$PORT" -d "$1" > /tmp/file
  cat /tmp/file
}

while true; do
  sleep 1
  test "{\"Id\":\"$MESSAGE_ID\",\"TotalParts\":2,\"PartNumber\":0,\"Data\":\"Happy \"}"
  sleep 1
  test "{\"Id\":\"$MESSAGE_ID\",\"TotalParts\":2,\"PartNumber\":1,\"Data\":\"Thanksgiving\"}"
done
