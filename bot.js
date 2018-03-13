var HTTPS = require('https');
var cool = require('cool-ascii-faces');

var botID = process.env.BOT_ID;

function respond() {
    var request = JSON.parse(this.req.chunks[0]),
        botRegexRolld20 = /^roll d20$/
    botRegexRolld20 = /^roll d20$/
    botRegexRolld12 = /^roll d12$/
    botRegexRolld10 = /^roll d10$/
    botRegexRolld8 = /^roll d8$/
    botRegexRolld6 = /^roll d6$/
    botRegexRolld4 = /^roll d4$/
    botRegexHelp = /^bot help$/;

    if (request.text && botRegexRolld20.test(request.text)) {
        this.res.writeHead(200);
        postRoll(20);
        this.res.end();
    } else if (request.text && botRegexRolld12.test(request.text)) {
        this.res.writeHead(200);
        postRoll(12);
        this.res.end();
    } else if (request.text && botRegexRolld10.test(request.text)) {
        this.res.writeHead(200);
        postRoll(10);
        this.res.end();
    } else if (request.text && botRegexRolld8.test(request.text)) {
        this.res.writeHead(200);
        postRoll(8);
        this.res.end();
    } else if (request.text && botRegexRolld6.test(request.text)) {
        this.res.writeHead(200);
        postRoll(6);
        this.res.end();
    } else if (request.text && botRegexRoll4.test(request.text)) {
        this.res.writeHead(200);
        postRoll(4);
        this.res.end();
    } else if (request.text && botRegexHelp.test(request.text)) {
        this.res.writeHead(200);
        postHelp();
        this.res.end();
    } else {
        console.log("don't care");
        this.res.writeHead(200);
        this.res.end();
    }
}

function postRoll(roll) {
    var botResponse, options, body, botReq;
    var rand = Math.random() * roll;
    botResponse = "Rolling D" + roll + ": " + Math.ceil(rand);

    options = {
        hostname: 'api.groupme.com',
        path: '/v3/bots/post',
        method: 'POST'
    };

    body = {
        "bot_id": "758b3d466c9f9c407f43f8cb74",
        "text": botResponse
    };

    console.log('sending ' + botResponse + ' to ' + botID);

    botReq = HTTPS.request(options, function (res) {
        if (res.statusCode == 202) {
            //neat
        } else {
            console.log('rejecting bad status code ' + res.statusCode);
        }
    });

    botReq.on('error', function (err) {
        console.log('error posting message ' + JSON.stringify(err));
    });
    botReq.on('timeout', function (err) {
        console.log('timeout posting message ' + JSON.stringify(err));
    });
    botReq.end(JSON.stringify(body));
}

function postHelp() {
    var botResponse, options, body, botReq;
    botResponse = "Just say roll and then a d20-4 to get a random number\nMore to come...";

    options = {
        hostname: 'api.groupme.com',
        path: '/v3/bots/post',
        method: 'POST'
    };

    body = {
        "bot_id": "758b3d466c9f9c407f43f8cb74",
        "text": botResponse
    };

    console.log('sending ' + botResponse + ' to ' + botID);

    botReq = HTTPS.request(options, function (res) {
        if (res.statusCode == 202) {
            //neat
        } else {
            console.log('rejecting bad status code ' + res.statusCode);
        }
    });

    botReq.on('error', function (err) {
        console.log('error posting message ' + JSON.stringify(err));
    });
    botReq.on('timeout', function (err) {
        console.log('timeout posting message ' + JSON.stringify(err));
    });
    botReq.end(JSON.stringify(body));
}
exports.respond = respond;