const { exec } = require("child_process");
const fs = require("fs");
const { resolve } = require("path");
const path = require('path');

const outputPath = path.join(__dirname, "outputs");

if (!fs.existsSync(outputPath)){
    fs.mkdirSync(outputPath, { recursive: true});
}

const executeCpp = (filepath) => {
    const jobId = path.basename(filepath).split(".")[0];
    const outPath = path.join(outputPath, `${jobId}.out`);

    return new Promise((resolve, reject) => {
        exec(`g++ "${filepath}" -o "${outPath}" && cd "${outputPath}" && "./${jobId}.out"`, 
        (error, stdout, stderr) => {
            // error && reject({error,stderr});
            // stderr && reject(stderr);
            // resolve(stdout);
            if(error){
                console.error(`Error: ${error.message}`);
                reject({error,stderr});
                
            }
            else if(stderr){
                console.error(`Stderr: ${stderr}`);
                reject(stderr);
            }
            else {
            resolve(stdout);
            }
        }
        );
    });
};

module.exports = {
    executeCpp,
}