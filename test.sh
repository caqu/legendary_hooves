TOKEN=26dafa1607
IP=localhost
PORT=3000
MESSAGE_ID=Carlos_test_
I=1020

# -si
function test {
  curl -si -H "API_Token: $TOKEN" -H "API_base: /" -H 'Content-Type: application/json' "http://$IP:$PORT" -d "$1" > /tmp/file
  cat /tmp/file
}

# while true; do
  cat $I
  test "{\"Id\":\"$MESSAGE_ID$I\",\"TotalParts\":3,\"PartNumber\":1,\"Data\":\"Thanksgiving\"}"
  test "{\"Id\":\"$MESSAGE_ID$I\",\"TotalParts\":3,\"PartNumber\":0,\"Data\":\"Happy \"}"
  test "{\"Id\":\"$MESSAGE_ID$I\",\"TotalParts\":3,\"PartNumber\":2,\"Data\":\", everybody!\"}"
  ((I++))
  sleep 1
# done
