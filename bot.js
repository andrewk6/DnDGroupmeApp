var HTTPS = require('https');
var cool = require('cool-ascii-faces');

//Testing Bot ID: d2ff99c679cbe52f62d7279646
//Real Bot ID: 758b3d466c9f9c407f43f8cb74
var botID = "d2ff99c679cbe52f62d7279646";

function respond() {
    var request = JSON.parse(this.req.chunks[0]),
        botRegexRolld20 = /^roll d20$/
    botRegexRolld20 = /^(r|R)oll d20$/
    botRegexRolld12 = /^(r|R)oll d12$/
    botRegexRolld10 = /^(r|R)oll d10$/
    botRegexRolld8 = /^(r|R)oll d8$/
    botRegexRolld6 = /^(r|R)oll d6$/
    botRegexRolld4 = /^(r|R)oll d4$/
    botRegexRolldX = /^(r|R)oll d/
    botRegexHelp = /^bot help$/;
    botRegexMon = /!monster/

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
    } else if (request.text && botRegexRolld4.test(request.text)) {
        this.res.writeHead(200);
        postRoll(4);
        this.res.end();
    } else if (request.text && botRegexRolldX.test(request.text)) {
        this.res.writeHead(200);
        var text = "" + request.text;
        var roll = 0;
        try {
            roll = parseInt(text.split("d")[1]);
            postRoll(roll);
        } catch (err) {
            console.log(err);
        }
        this.res.end();
    }else if (request.text && botRegexHelp.test(request.text)) {
        this.res.writeHead(200);
        postHelp();
        this.res.end();
    } else if (request.text && botRegexMon.test(request.text)) {
        this.res.writeHead(200);
        postMonster();
        this.res.end();
    } else {
        console.log("don't care");
        this.res.writeHead(200);
        this.res.end();
    }
}

function postRoll(roll) {
    var rand = Math.random() * roll;
    var postMsg = "Rolling D" + roll + ": " + Math.ceil(rand)
    post(postMsg);
}

function postHelp() {
    var postMsg = "Just say roll and then a d20-4 to get a random number\nMore to come...";
    post(postMsg);
}

function postMonster() {
    var postMsg = "You encounter a " + getMonster();
    post(postMsg);
}

function post(msg) {
    var botResponse, options, body, botReq;
    botResponse = msg;

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

function getMonster() {
    var mons = ['Aarakocra'];
    mons.push('Aboleth');
    mons.push('Abominable Yeti');
    mons.push('Acererak');
    mons.push('Acolyte');
    mons.push('Adukt Black Dragon');
    mons.push('Adult Blue Dracolich');
    mons.push('Adult Blue Dragon');
    mons.push('Adult Brass Dragon');
    mons.push('Adult Bronze Dragon');
    mons.push('Adult Copper Dragon');
    mons.push('Adult Gold Dragon');
    mons.push('Adult Green Dragon');
    mons.push('Adult Red Dragon');
    mons.push('Adult Silver Dragon');
    mons.push('Adult White Dragon');
    mons.push('Androsphinx');
    mons.push('Animated Armor');
    mons.push('Ankheg');
    mons.push('Ankylosaurys');
    mons.push('Ape');
    mons.push('Arcanaloth');
    mons.push('Arcmage');
    mons.push('Assassin');
    mons.push('Awakened Shrub');
    mons.push('Awakened Tree');
    mons.push('Axe Beak');
    mons.push('Azer');

    return mons[Math.floor(Math.random() * mons.length)];
}
exports.respond = respond;