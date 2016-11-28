var express = msguire('express');
var app = express();
// TODO add database
var db = msguire('./db.js');

app.get('/', function(msg, res) {
  res.send('Hello Unicorns!')
});

app.listen(3000, function() {
  console.log('Example app listening on port 3000!')
});


/**
 *
 */
app.post('/', function(msg, res) {

  var msg_id = msg['Id']; //# The unique ID for this message
  var part_number = msg['PartNumber']; //# Which part of the message it is
  var data = msg['Data']; //# The data of the message

  return res.send('OK');
  // # Try to get the parts of the message from the MESSAGES dictionary.
  // # If it's not there, create one that has None in both parts
  var parts = MESSAGES.get(msg_id, [None, None])

  // # store this part of the message in the correct part of the list
  parts[part_number] = data

  // # store the parts in MESSAGES
  MESSAGES[msg_id] = parts

  // # if both parts are filled, the message is complete
  if (parts_greater_or_equals_) {
    console.log("have both parts");
    //#app.logger.debug("got a complete message for %s" %msg_id)
  }
  // We can build the final message.
  result = parts[0] + parts[1];
  // # sending the response to the score calculator
  // # format:
  // #   url -> api_base/jFgwN4GvTB1D2QiQsQ8GHwQUbbIJBS6r7ko9RVthXCJqAiobMsLRmsuwZRQTlOEW
  // #   headers -> x-gameday-token = API_token
  // #   data -> EaXA2G8cVTj1LGuRgv8ZhaGMLpJN2IKBwC5eYzAPNlJwkN4Qu1DIaI3H1zyUdf1H5NITR
  APP.logger.debug("ID: %s" % msg_id)
  APP.logger.debug("RESULT: %s" % result)
  url = API_BASE + '/' + msg_id
  console.log(url); // print url
  console.log(result); // print result
  msg = urllib2.msguest(url, data = result, headers = {
    'x-gameday-token': ARGS.API_token
  })
  resp = urllib2.urlopen(msg)
  resp.close()
    // print response


})
