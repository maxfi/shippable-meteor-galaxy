var fs = require('fs');
var path = require('path');

var target     = process.argv[2]
, tokenFile    = path.join(process.cwd(), process.argv[3]) || 'meteor_token.json'
, settingsFile = path.join(process.cwd(), process.argv[4]) || 'meteor_settings.json'
, tokenJSON
, settingsJSON;

function escapeQuote(str) {
    return str.replace(/"/g, '\\"');
}

function getJSON(filePath) {
    try {
        var json = JSON.stringify(JSON.parse(fs.readFileSync(filePath)));
    }
    catch (e) {
        console.error("Something went wrong. Please check your files.");
        process.exit(1);
    }
    return json;
}

tokenJSON = getJSON(tokenFile);
settingsJSON = getJSON(settingsFile);

var envString = "METEOR_TARGET='" + escapeQuote(target) + "' " +
                "METEOR_TOKEN='" + escapeQuote(tokenJSON) + "' " +
                "METEOR_SETTINGS='" + escapeQuote(settingsJSON) + "'";

console.log(envString);