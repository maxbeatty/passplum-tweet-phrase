# passplum-tweet-phrase

> a scheduled AWS Lambda function that tweets sample passphrases from [passplum.com](http://passplum.com)

1. requests passplum.com
2. gets passphrase
3. posts passphrase as status update on twitter

## environment

_Use Node v4.3.2 to match AWS Lambda Node.js 4.3 (`nvm use`)_

### variables

- `PASSPLUM_URL`- instance of [passplum](https://github.com/maxbeatty/passplum)
- `TWITTER_CONSUMER_KEY`- Twitter API app consumer key
- `TWITTER_CONSUMER_SECRET`- Twitter API app consumer secret
- `TWITTER_ACCESS_TOKEN`- Twitter account access token for above API app
- `TWITTER_ACCESS_SECRET`- Twitter account access token secret for above API app

## deploy

1. With the environment variables above set, run `script/deploy` to generate `.tmp/lambda.zip`
2. Upload `.tmp/lambda.zip` to AWS Lambda
3. Test your code using Lambda's UI
4. Add a Scheduled Event source
