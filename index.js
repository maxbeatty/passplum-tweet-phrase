const request = require('request')

const RE = /<code\s.+?>(.+?)<\/code>/g

exports.handler = function (event, context) {
  request(process.env.PASSPLUM_URL, function(err, res, body) {
    console.log('response status: ' + res.statusCode)
    console.log('response body', body)

    if (err) {
      console.log('problem with request', err);
      return context.fail(err)
    }

    const matches = RE.exec(body)

    if (matches && matches.length > 1) {
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
}
