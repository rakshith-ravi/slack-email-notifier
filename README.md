## Slack Email Notifier
### Why did I do this?
So basically the purpose of this application is simple.

We had a gazillion emails to check for different purposes, each for a different team. For example, each person has their own email, while hello@vicaratech.com was to be notified to the whole team, and social@vicaratech.com was for the marketing team.

Slack has this feature where it notifies you on slack channels for emails, however it was a feature only for paid teams.

I instead decided to run a script on my server, that listens on a particular email address and every time an email is recieved, it'll notify that particular person / channel on slack. So this works by me setting up forwards for each email to a central email ID. This system listens on that central email ID and once an email is recieved, it'll check who forwarded it (which is who the email was meant for) and notify that particular person on slack.

## Setup Instructions

- Clone the repository with these commands:

	```bash
	git clone https://github.com/vicaratech/slack-email-notifier
	cd slack-email-notifier
	```

- There is a file called `config-example.js`, copy and paste it in the same folder with the name, `config.js`.

- Add all aliases as you require to `config.js`. Add it in the following form:

	```js
	"emailaddress@domain.com": "@slackusername" / "#slackchannel"
	```

- Setup your email username (email ID), password and host in `config.js`. For most cases, you would not need to change any other value

- Setup your slack incoming webhook URL in the `config.js` file.

- Finally, just do:

	```bash
	npm install
	npm start
	```