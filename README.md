# shippable-meteor-galaxy
> Inspired by [Migrating Meteor Apps from Modulus to Galaxy with Continuous Deployment from Codeship](https://medium.com/@natestrauser/migrating-meteor-apps-from-modulus-to-galaxy-with-continuous-deployment-from-codeship-aed2044cabd9) written by @nate-strauser

Use Shippable to deploy to Meteor Galaxy.

## Overview

Shippable encourages users to encrypt sensitive data in [encrypted environment variables](http://docs.shippable.com/project_settings/#encrypt-environment-variables) rather than in plain text in their `shippable.yml`... and rightly so!

The only issue is that can be a real pain to get your Meteor authentication token and Meteor settings, both of which are JSON representations, working in Shippable.

The supplied `shippable.yml` in this repo helps you with that and will hopefully save you hours of debugging.

Please see @nate-strauser's article [Migrating Meteor Apps from Modulus to Galaxy with Continuous Deployment from Codeship](https://medium.com/@natestrauser/migrating-meteor-apps-from-modulus-to-galaxy-with-continuous-deployment-from-codeship-aed2044cabd9) for a more details.

## Requirements

#### Meteor settings

meteor_settings.json
```JSON
{
	"galaxy.meteor.com": {
		"env": {
			"ROOT_URL": "http://www.awesomesite.com",
			"MONGO_URL": "mongodb://USERNAME:PASSWORD@candidate.22.mongolayer.com:12345,candidate.21.mongolayer.com:12345/somedatabase",
			"MONGO_OPLOG_URL": "mongodb://USERNAME:PASSWORD@candidate.22.mongolayer.com:12345,candidate.21.mongolayer.com:12345/local?authSource=somedatabase",
			"MAIL_URL": "smtp://postmaster@awesomesite:PASSWORD@smtp.mailgun.org:587"
		}
	}
}
```
For more info see [Meteor.settings docs](http://docs.meteor.com/#/full/meteor_settings)

#### Meteor auth token

On a box where you have meteor installed run:

```sh
$ METEOR_SESSION_FILE=meteor_token.json meteor login
```
to get the `meteor_token.json` file.

#### Shippable encrypted environment variable string

In the directory where you have your `meteor_settings.json` and `meteor_token.json` files run:

```sh
$ node create-env-string.js <hostname>
```

or if you have your files somewhere else run:

```sh
$ node create-env-string.js <hostname> <token-path> <settings-path>
```

**NOTE:** `hostname` is the fully qualified domain name where you're planning to host your application (for example, 'www.awesomesite.com').

## Usage

1. Get your METEOR_SETTINGS and METEOR_TOKEN into the correct format to enter in the [encrypted environment variables](http://docs.shippable.com/project_settings/#encrypt-environment-variables) section on your project's shippable settings page. Use the output from the _Shippable encrypted environment variable string_ section above.

2. Insert the formatted string in the [encrypted environment variables](http://docs.shippable.com/project_settings/#encrypt-environment-variables) section on your project's shippable settings page and click the encrypt button.

3. Copy the output to the `env` section in the `shippable.yml`.
4. Copy the updated `shippable.yml` to your project and enjoy automated Meteor Galaxy deployments. :-)


## TODO

* Review best approach for multi branch deployment.
	* http://stackoverflow.com/a/10810859
	* https://github.com/shippableSamples?utf8=%E2%9C%93&query=branch
* Check if there is a shippable API to get the encrypted string as part of the string creation script.