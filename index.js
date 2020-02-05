const core = require('@actions/core');
const fs = require('fs');

try {
    let root = JSON.parse(core.getInput('runner_context')).workspace;
    let repo_path = `${root}/${core.getInput('repo_relative_path')}`;
    let composer_path = `${root}/composer.json`;
    let composer_data = JSON.parse(
        fs.readFileSync(composer_path)
    );

    console.log

    fs.writeFile(
        composer_path,
        JSON.stringify({
            ...composer_data,
            ...{
                repositories: [
                    {
                        type: "path",
                        url: repo_path
                    }
                ]
            }
        }),
        function(err) {
            if(err) {
                return console.log(err);
            }
            console.log(`composer.json was updated!`);
            let resultData = fs.readFileSync(composer_path, "utf8");
            console.log("Review new data below");
            console.log(resultData);
        }); 

} catch (error) {
    core.setFailed(error.message);
}