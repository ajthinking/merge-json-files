const core = require('@actions/core');
const fs = require('fs');

try {
    let workspace = JSON.parse(core.getInput('runner_context')).workspace;
    let repo_name = workspace.split("/").pop();
    let root = repo_name == 'merge-json-files' ? `${workspace}/${repo_name}` : workspace;

    fs.readdirSync(root, function (err, files) {
        //handling error
        if (err) {
            return console.log('Unable to scan directory: ' + err);
        } 

        console.log("Listing files :)!.")
        //listing all files using forEach
        files.forEach(function (file) {
            // Do whatever you want to do with the file
            console.log(file); 
        });
    });



    let repo_path = `${root}/${core.getInput('repo_relative_path')}`;
    let composer_path = `${root}/composer.json`;
    let composer_data = JSON.parse(
        fs.readFileSync(composer_path)
    );

    

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