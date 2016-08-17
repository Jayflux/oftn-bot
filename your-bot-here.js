var Util = require("util");
var Bot = require("./lib/irc");
var heapdump = require("heapdump");

var YourBot = function(profile) {
	Bot.call(this, profile);
	this.set_log_level(this.LOG_ALL);
	this.set_trigger("!"); // Exclamation
};

Util.inherits(YourBot, Bot);

YourBot.prototype.init = function() {
	Bot.prototype.init.call(this);
	
	this.register_command("ping", this.ping);
	this.on('command_not_found', this.unrecognized);
};


YourBot.prototype.ping = function(cx, text) {
	cx.channel.send_reply (cx.sender, "Pong!");
	heapdump.writeSnapshot(Date.now() + '.heapsnapshot');
};

YourBot.prototype.unrecognized = function(cx, text) {
	cx.channel.send_reply(cx.sender, "There is no command: "+text);
};

var profile = [{
	host: "irc.freenode.net",
	port: 6667,
	nick: "mybot",
	password: "password_to_authenticate",
	user: "username",
	real: "Real Name",
	channels: ["#web-testing"]
}];

(new YourBot(profile)).init();
