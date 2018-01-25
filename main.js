const {line_reader} = require("./linereader.js");


async function start() {
    try {
        await line_reader();
    }
    catch (err) {
        console.log(err);
        process.exit(1);
    }
};

start();