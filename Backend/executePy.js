const { exec } = require("child_process");






const executePy = (filepath) => {
    

    return new Promise((resolve, reject) => {
        exec(`python "${filepath}"`, 
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
    executePy,
}