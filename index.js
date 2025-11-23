const fs = require('fs');

const data = fs.readFileSync("./input.txt").toString();

function parseTokens() {
    const tokens = data.split(/\s+/)
    return tokens;
}

