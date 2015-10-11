var http = require('http')
var request = require('request')

var re = /<code\s.+?>(.+?)<\/code>/g

exports.handler = function (event, context) {
  http.get(process.env.PASSPLUM_URL, function(res) {
    console.log('response status: ' + res.statusCode)
    res.setEncoding('utf8')
    var body = ''
    res.on('data', function (chunk) {
      body += chunk;
    }).on('end', function() {
      var matches = re.exec(body)
      if (matches.length > 1) {
        console.log('found passphrase', matches[1])

        request.post({
          url: 'https://api.twitter.com/1.1/statuses/update.json',
          oauth: {
            consumer_key: process.env.TWITTER_CONSUMER_KEY,
            consumer_secret: process.env.TWITTER_CONSUMER_SECRET,
            token: process.env.TWITTER_ACCESS_TOKEN,
            token_secret: process.env.TWITTER_ACCESS_SECRET
          },
          qs: {
            status: 'Here is a great password: ' + matches[1]
          }
        }, function (err) {
          if (err) {
            console.log(err)
            context.fail(err)
          }

          context.succeed()
        })

      } else {
        context.fail(new Error('could not find passphrase'))
      }
    })
  }).on('error', function(e) {
    console.log('problem with request: ' + e.message);
    context.fail(e)
  })
}
