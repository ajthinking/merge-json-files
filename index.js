const core = require('@actions/core');
const fs = require('fs');

try {

    let data1 = JSON.parse(
        fs.readFileSync(__dirname + '/data1.json')
    );
    let data2 = JSON.parse(
        fs.readFileSync(__dirname + '/data2.json')
    );

    let data3 = {
        ...data1,
        ...data2
    }
    
    core.setOutput("data3", data3);

} catch (error) {
    core.setFailed(error.message);
}

/* OLD
    core.setOutput("time", time);
    const github = require('@actions/github');
    //const nameToGreet = core.getInput('who-to-greet');
    console.log(`Hello ${nameToGreet}!`);
    const time = (new Date()).toTimeString();
    const payload = JSON.stringify(github.context.payload, undefined, 2)
    console.log(`The event payload: ${payload}`);
*/