const request = require('request');
const fs = require('fs');

fs.writeFileSync('available.txt', '');

function checkName(name) {
    request.get('https://github.com/' + name, (err, res, body) => {
        if (!res || !res.statusCode) return arguments.callee.apply(this, arguments);

        switch (res.statusCode) {
            case 200: // taken
                console.log('Taken => %s', name);
                break;

            case 404: // available
                console.log('Available => %s', name);
                fs.appendFileSync('available.txt', name + ',');
                break;

            default:
                arguments.callee.apply(this, arguments);
                break;
        }
    });
}

let chars = 'abcdefghijklmnopqrstuvwxyz';
let names = [];

for (let i = 0; i < chars.length; i++) {
    for (let j = 0; j < chars.length; j++) {
        for (let f = 0; f < chars.length; f++) {
            names.push(chars[i] + chars[j] + chars[f]);
        }
    }
}

let i = 0;
let int = setInterval(() => {
    if (i > names.length) return clearInterval(int);
    var name = names[i++];
    checkName(name);
});