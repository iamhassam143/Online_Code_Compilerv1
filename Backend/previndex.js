const express = require("express");
const app = express();
const cors = require("cors");
const { executeCpp } = require("./executeCode");
const { generateFile } = require('./generateFile');
const { executePy } = require("./executePy");
const Job = require("./Models/jobs");

const mongoose = require('mongoose');

async function connectToDatabase() {
  try {
    await mongoose.connect('mongodb://localhost/mydatabase', {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log('Connected to MongoDB');
  } catch (error) {
    console.error('Error connecting to MongoDB:', error);
  }
}

connectToDatabase();





app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.get("/", (req, res) => {

    return res.json({hello: "world"});
});

app.post("/run", async(req, res) => {
    // console.log(req.body); 
    const { language = "cpp", code} = req.body;
    console.log(language, code.length);

    if (code === "") {
        return res.status(400).json({ success: false,  error: "emptycode" });
    }

    // we'll generate a c++ or py file with content from the request
    const filepath = await generateFile(language, code);

    if(language === "cpp"){
    try{
    
        // need to run the file and send the respons

        const output = await executeCpp(filepath);
        return res.json({filepath, output});
    } catch(error){
        res.status(500).json({ error });
        // return res.json({filepath, someError: "error"});
    }} else{
        try{
    
                // need to run the file and send the respons
        
                const output = await executePy(filepath);
                return res.json({filepath, output});
            } catch(error){
                res.status(500).json({ error });
                // return res.json({filepath, someError: "error"});
            }
        }
    
    

    
});

app.listen(5000, ()=> {
    console.log(`Listening on port 5000 !!`)
}
);





// https://sourceforge.net/projects/mingw/ for g++ compiler


// const mongoose = require('mongoose');

// mongoose.connect('mongodb://127.0.0.1:27017/test', {
//     useNewUrlParser:true,
//     useUnifiedTopology: true,
// }, (err) => {
//     if(err){
//         console.log(err);
//         process.exit(1);
//     }
//     console.log("successfull " )
// }
// );

// main().catch(err => console.log(err));
 
// async function main() {
//   await mongoose.connect('mongodb://127.0.0.1:27017/test',{
//     useUnifiedTopology: true,
// });

//   // use `await mongoose.connect('mongodb://user:password@127.0.0.1:27017/test');` if your database has auth enabled
// }


// const job = await new Job({language, code}).save;
//     const jobId = job["_id"];

//     res.status(201).json({success: true, jobId});
//     console.log(job);