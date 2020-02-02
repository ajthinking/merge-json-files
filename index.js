const core = require('@actions/core');
const fs = require('fs');

try {
    // Mission: merge `additions` into `target`
    let additions = core.getInput('additions')
    let target = core.getInput('target')
    let additionsPath = `${__dirname}/${additions}`;
    let targetPath = `${__dirname}/${target}`;

    let additionsData = JSON.parse(
        fs.readFileSync(additionsPath)
    );
    let targetData = JSON.parse(
        fs.readFileSync(targetPath)
    );

    let resultData = {
        ...additionsData,
        ...targetData
    }

    fs.writeFile(
        targetPath,
        JSON.stringify(resultData),
        function(err) {
            if(err) {
                return console.log(err);
            }
            console.log(`The file ${targetPath} was saved!`);
            let resultData = fs.readFileSync(targetPath);
            console.log("Now it has data: " + resultData);
        }); 

} catch (error) {
    core.setFailed(error.message);
}