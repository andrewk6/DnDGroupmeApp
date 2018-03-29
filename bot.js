var HTTPS = require('https');
var cool = require('cool-ascii-faces');
var monsts = buildMonsters();

//Testing Bot ID: d2ff99c679cbe52f62d7279646
//Real Bot ID: 758b3d466c9f9c407f43f8cb74
var botID = "758b3d466c9f9c407f43f8cb74";


//TODO: Add in a sarcastic summary of past events spoken by Ishwar
function daily() {
    var msg = "Daily Value\n" + getMonster();
    post(msg);
}

//setInterval(daily, (86400 * 1000));

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
    botRegexHelp = /^bot help$/
    botRegexMon = /^!monster$/
    botRegexNot = /don\'t.*go|can\'t.*come/;

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
    }else if (request.text && botRegexNot.test(request.text)) {
        this.res.writeHead(200);
        var name = "" + request.name;
        postNot(name);
        this.res.end();
    } else {
        postRand();
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
    var postMsg = "R(r)oll dX: Where X = number will give a random number 1-X\n!monster: Will give a random Enemy from Monster Manual\nMore to come...";
    post(postMsg);
}

function postMonster() {
    var postMsg = "You encounter a " + getMonster();
    post(postMsg);
}

function postNot(name) {
    var msg = "";
    var rand = Math.floor(Math.random() * 100);
    if (rand < 25) {
        if (name == "Auri-El") {
            msg = "But who will cast Arms of Hadar then, We need our field obscuring darkness spells";
        } else
            msg = "Ishwar Guar: \"Bah who need " + name + ", I mean who needs any of you, you are all going to die anyways\"";
        post(msg);
    }  
}

function postRand() {
    var rand = Math.floor(Math.random() * 100);
    if (rand < 5 && rand > 2)
        post("Rocks Fall Everyone Dies");
    else if (rand == 2)
        post("An earth elemental steps on your head to make sure your dead");
    else if (rand == 1)
        post("The world is a mimic, it sowly devourers you and all your friends");
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
        "bot_id": botID,
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

function buildMonsters() {
    var mons = ['Aarakocra'];
    /*A*/{
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
    }//A
    /*B*/{
        mons.push('Baboon');
        mons.push('Badger');
        mons.push('Balor');
        mons.push('Bandit');
        mons.push('Bandit Captain');
        mons.push('Banshee');
        mons.push('Barbed Devil');
        mons.push('Barlgura');
        mons.push('Basilisk');
        mons.push('Bat');
        mons.push('Bearded Devil');
        mons.push('Behir');
        mons.push('Beholder');
        mons.push('Beholder, Zombie');
        mons.push('Berserker');
        mons.push('Black Bear');
        mons.push('Black Dragon Wyrmling');
        mons.push('Black Pudding');
        mons.push('Blink Dog');
        mons.push('Blood Hawk');
        mons.push('Blue Dragon Wyrmling');
        mons.push('Blue Slaad');
        mons.push('Boar');
        mons.push('Bone Devil');
        mons.push('Bone Naga');
        mons.push('Brass Dragon Wyrmling');
        mons.push('Bronze Draggon Wyrmling');
        mons.push('Brown Bear');
        mons.push('Bugbear');
        mons.push('Bugbear, Chief');
        mons.push('Bulette');
        mons.push('Bullywug');
    }//B
    /*C*/{
        mons.push('Cambion');
        mons.push('Camel');
        mons.push('Carrion Crawler');
        mons.push('Cat');
        mons.push('Cave Bear');
        mons.push('Centaur');
        mons.push('Chain Devil');
        mons.push('Chasme');
        mons.push('Chimera');
        mons.push('Chuul');
        mons.push('Clay Golem');
        mons.push('Cloaker');
        mons.push('Cloud Giant');
        mons.push('Cockatrice');
        mons.push('Commoner');
        mons.push('Constrictor Snake');
        mons.push('Copper Dragon Wyrmling');
        mons.push('Coautl');
        mons.push('Courtier');
        mons.push('Crab');
        mons.push('Crawling Claw');
        mons.push('Crocodile');
        mons.push('Cult, Fantaic');
        mons.push('Cultist');
        mons.push('Cyclops');
    }//C
    /*D*/{
        mons.push('Dao');
        mons.push('Darkmantle');
        mons.push('Death Dog');
        mons.push('Death Knight');
        mons.push('Death Slaad');
        mons.push('Death Tyrant');
        mons.push('Deep Gnome(Svirfbeblin)');
        mons.push('Deer');
        mons.push('Demilich');
        mons.push('Deva');
        mons.push('Dire Wold');
        mons.push('Diseased Giant Rat');
        mons.push('Displacer Beast');
        mons.push('Djinni');
        mons.push('Doppleganger');
        mons.push('Draft Horse');
        mons.push('Dragon Turtle');
        mons.push('Dretch');
        mons.push('Drider');
        mons.push('Drow');
        mons.push('Drow Elite Warrior');
        mons.push('Drow Mage');
        mons.push('Drow Priestess of Lolth');
        mons.push('Druid');
        mons.push('Dryad');
        mons.push('Duergar');
        mons.push('Duodrone');
        mons.push('Dust Mephit');
    }//D
    /*E*/{
        mons.push('Eagle');
        mons.push('Earth Elemental');
        mons.push('Efreeti');
        mons.push('Elephant');
        mons.push('Elk');
        mons.push('Empyrean');
        mons.push('Erinyes');
        mons.push('Ettercap');
        mons.push('Ettin');

    }//E
    /*F*/{
        mons.push('Faerie Dragon');
        mons.push('Fire Elemental');
        mons.push('Fire Giant');
        mons.push('Fire Snake');
        mons.push('Flameskull');
        mons.push('Flesh Golem');
        mons.push('Flumph');
        mons.push('Flying Snake');
        mons.push('Flying Sword');
        mons.push('Fomorian');
        mons.push('Frog');
        mons.push('Frost Giant');
    }//F
    /*G(No GIANTS)*/{
        mons.push('Galeb Duhr');
        mons.push('Gargoyle');
        mons.push('Gas Spore');
        mons.push('Gelatinous Cube');
        mons.push('Ghast');
        mons.push('Ghost');
        mons.push('Ghoul');
        mons.push('Gibbering Mouther');
        mons.push('Githyanki Knight');
        mons.push('Githyanki Warrior');
        mons.push('Githzerai Monk');
        mons.push('Githzerai Zerth');
        mons.push('Glabrezu');
        mons.push('Gladiator');
        mons.push('Gnoll');
        mons.push('Gnoll, Fang of Yeenoghu');
        mons.push('Gnoll, Pack Lord');
        mons.push('Goat');
        mons.push('Goblin');
        mons.push('Goblin Boss');
        mons.push('Gold Dragon Wyrmling');
        mons.push('Gorgon');
        mons.push('Goristro');
        mons.push('Gray Ooze');
        mons.push('Gray Slaad');
        mons.push('Green Dragon Wyrmling');
        mons.push('Green Hag');
        mons.push('Green Slaad');
        mons.push('Grell');
        mons.push('Grick');
        mons.push('Grick, Alpha');
        mons.push('Griffon');
        mons.push('Grimlock');
        mons.push('Guard');
        mons.push('Guardian Naga');
        mons.push('Gynosphinx');
    }//G
    /*H*/{
        mons.push('Half-Orc');
        mons.push('Half-Red Dragon Veteran');
        mons.push('Harpy');
        mons.push('Hawk');
        mons.push('Hell Hound');
        mons.push('Helmed Horror');
        mons.push('Herzou');
        mons.push('Hill Giant');
        mons.push('Hippogriff');
        mons.push('Hobgoblin');
        mons.push('Hobgoblin, Chief');
        mons.push('Hobgoblin, Warlord');
        mons.push('Homunculus');
        mons.push('Hook Horror');
        mons.push('Horned Devil');
        mons.push('Hunter Shark');
        mons.push('Hydra');
        mons.push('Hyena');
    }//H
    /*I*/{
        mons.push('Ice Devil');
        mons.push('Ice Mephit');
        mons.push('Imp');
        mons.push('Incubus');
        mons.push('Intellect Devourer');
        mons.push('Invisible Stalker');
        mons.push('Iron Golem');
    }//I
    /*J*/{
        mons.push('Jackal');
        mons.push('Jackalwere');
    }//J
    /*K*/{
        mons.push('Kenku');
        mons.push('Killer Whale');
        mons.push('Knight');
        mons.push('Kobold');
        mons.push('Kraken');
        mons.push('Kuo-toa');
        mons.push('Kuo-toa, Archpriest');
        mons.push('Kuo-toa Whip');
    }//K
    /*L*/{
        mons.push('Lamia');
        mons.push('Lemure');
        mons.push('Lich');
        mons.push('Lion');
        mons.push('Lizard');
        mons.push('Lizard King/Queen');
        mons.push('Lizardfolk');
        mons.push('Lizardfolk, Shaman');
    }//L
    /*M*/{
        mons.push('Mage');
        mons.push('Magma Mephit');
        mons.push('Magmin');
        mons.push('Mammoth');
        mons.push('Manes');
        mons.push('Manticore');
        mons.push('Marid');
        mons.push('Marilith');
        mons.push('Mastiff');
        mons.push('Medusa');
        mons.push('Merfolk');
        mons.push('Merrow');
        mons.push('Mezzoloth');
        mons.push('Mimic');
        mons.push('Mind Flayer');
        mons.push('Mind Flayer, Arcanist');
        mons.push('Minotaur');
        mons.push('Minotaur, Skeleton');
        mons.push('Monodrone');
        mons.push('Med Mephit');
        mons.push('Mule');
        mons.push('Mummy');
        mons.push('Mummy Lord');
        mons.push('Myconid Adult');
        mons.push('Myconid Sovereign');
        mons.push('Myconid Scout');
    }//M
    /*N*/{
        mons.push('Nalfeshnee');
        mons.push('Needle Blight');
        mons.push('Night Hag');
        mons.push('Nightmare');
        mons.push('Noble');
        mons.push('Nothic');
        mons.push('Nycaloth');
    }//N
    /*O*/{
        mons.push('Ochre Jelly');
        mons.push('Octopus');
        mons.push('Ogre');
        mons.push('Ogre, Zombie');
        mons.push('Oni');
        mons.push('Orc');
        mons.push('Orc, Eye of Gruumsh');
        mons.push('Orc, War Chief');
        mons.push('Orog');
        mons.push('Otyugh');
        mons.push('Owl');
        mons.push('Owlbear');
    }//O
    /*P*/{
        mons.push('Panther');
        mons.push('Pegasus');
        mons.push('Pentadrone');
        mons.push('Peryton');
        mons.push('Phase Spider');
        mons.push('Piercer');
        mons.push('Pirate');
        mons.push('Pirate Captain');
        mons.push('Pit Fiend');
        mons.push('Pixie');
        mons.push('Planetar');
        mons.push('Plesiosaurus');
        mons.push('Poisonous Snake');
        mons.push('Polar Bear');
        mons.push('Poltergeist');
        mons.push('Pony');
        mons.push('Priest');
        mons.push('Psuedodragon');
        mons.push('Psychic Gray Ooze');
        mons.push('Pteranodon');
        mons.push('Purple Worm');
    }//P
    /*Q*/{
        mons.push('Quadrone');
        mons.push('Quaggoth');
        mons.push('Quaggoth, Spore Servant');
        mons.push('Quaggoth, Thonot');
        mons.push('Quasit');
        mons.push('Quipper');
    }//Q
    /*R*/{
        mons.push('Rakshasa');
        mons.push('Rat');
        mons.push('Raven');
        mons.push('Red Dragon Wyrmling');
        mons.push('Red Slaad');
        mons.push('Reef Shark');
        mons.push('Remorhaz');
        mons.push('Revenant');
        mons.push('Rhinoceros');
        mons.push('Riding Horse');
        mons.push('Roc');
        mons.push('Rogue Modron');
        mons.push('Roper');
        mons.push('Rug of Smothering');
        mons.push('Rust Monster');
    }//R
    /*S(NO SWARM)*/{
        mons.push('Saber-toothed Tiger');
        mons.push('Sahuagin');
        mons.push('Sahuagin, Baron');
        mons.push('Sahuagin, Priestess');
        mons.push('Salamander');
        mons.push('Satyr');
        mons.push('Scarecrow');
        mons.push('Scorpion');
        mons.push('Scout');
        mons.push('Sea Hag');
        mons.push('Sea Horse');
        mons.push('Shadow');
        mons.push('Shadow Demon');
        mons.push('Shadow Dragon');
        mons.push('Shambling Mound');
        mons.push('Shield Guardian');
        mons.push('Shrieker');
        mons.push('Silver Dragon Wyrmling');
        mons.push('Skeleton');
        mons.push('Slaad Tadpole');
        mons.push('Smoke Mephit');
        mons.push('Solar');
        mons.push('Spectator');
        mons.push('Specter');
        mons.push('Spider');
        mons.push('Spined Devil');
        mons.push('Spirit Naga');
        mons.push('Spore Servant');
        mons.push('Sprite');
        mons.push('Spy');
        mons.push('Steam Mephit');
        mons.push('Stirge');
        mons.push('Stone Giant');
        mons.push('Stone Golem');
        mons.push('Storm Giant');
        mons.push('Succubus');
        mons.push('Svirfneblin');
    }//S
    /*T*/{
        mons.push('Terrasque');
        mons.push('Thri-kreen');
        mons.push('Thug');
        mons.push('Tiger');
        mons.push('Toad');
        mons.push('Treant');
        mons.push('Tribal Shaman');
        mons.push('Tribal Warrior');
        mons.push('Triceratops');
        mons.push('Tridrone');
        mons.push('Troglodyte');
        mons.push('Troll');
        mons.push('Twig Blight');
        mons.push('Tyrannosaurus Rex');
    }//T
    /*U*/{
        mons.push('Ultroloth');
        mons.push('Umber Hulk');
        mons.push('Unicorn');
        mons.push('Urid');
    }//U
    /*V*/{
        mons.push('Vampire');
        mons.push('Vampire, Servant');
        mons.push('Veteran');
        mons.push('Vine Blight');
        mons.push('Violet Fungus');
        mons.push('Vrock');
        mons.push('Vulture');
    }//V
    /*W*/{
        mons.push('Warhorse');
        mons.push('Warhorse, Skeleton');
        mons.push('Water Elemental');
        mons.push('Water Weird');
        mons.push('Weasal');
        mons.push('Werebear');
        mons.push('Wereboar');
        mons.push('Wererat');
        mons.push('Weretiger');
        mons.push('Werewolf');
        mons.push('White Dragon Wyrmling');
        mons.push('Wight');
        mons.push('Will-O-Wisp');
        mons.push('Winged Kobold');
        mons.push('Winter Wolf');
        mons.push('Wolf');
        mons.push('Worg');
        mons.push('Wraith');
        mons.push('Wyvern');
    }//W
    /*X*/mons.push('Xorn');
    /*Y*/{
        mons.push('Yeti');
        mons.push('Yochlol');
        mons.push('Young Black Dragon');
        mons.push('Young Blue Dragon');
        mons.push('Young Brass Dragon');
        mons.push('Young Bronze Dragon');
        mons.push('Young Copper Dragon');
        mons.push('Young Gold Dragon');
        mons.push('Young Green Dragon');
        mons.push('Young Red Dragon');
        mons.push('Young Red Shadow Dragon');
        mons.push('Young Remorhaz');
        mons.push('Young Silver Dragon');
        mons.push('Young White Dragon');
        mons.push('Yuan-ti Abomination');
        mons.push('Yuan-ti Malison');
        mons.push('Yuan-ti Pureblood');

    }//Y
    /*Z*/mons.push('Zombie');
    return mons;
}

function getMonster() {
    return monsts[Math.floor(Math.random() * monsts.length)];
}

exports.respond = respond;