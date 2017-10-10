var config = require('./config');
var request = require('request');
var MailListener = require("mail-listener2");

var mailListener = new MailListener({
	username: config.email.username,
	password: config.email.password,
	host: config.email.host,
	port: config.email.port,
	tls: config.email.tls,
	mailbox: "INBOX",
	markSeen: true,
	fetchUnreadOnStart: true
});

mailListener.start();

mailListener.on("server:connected", function () {
	console.log("imap connected. Listening for emails");
});

mailListener.on("mail", function (mail, seqno, attributes) {
	var fromEmail = mail.from[0].address;
	var toEmail = mail.to[0].address;

	if(config.aliases[toEmail] != undefined) {
		var data = {
			json: {
				text: 
`
New email!

*From:* ${fromEmail}
*To:* ${toEmail}
*Subject:* ${mail.subject.replace("Fwd: ", "")}

The mail contents are as follows:
`,
				username: "Email BOT",
				channel: config.aliases[toEmail],
				attachments: [
					{
						text: mail.text
					}
				]
			}
		};
		request.post(config.slack.url, data, function(err, response, body) {
			console.log(body);
		});
	}
});