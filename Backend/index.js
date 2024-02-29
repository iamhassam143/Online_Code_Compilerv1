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
    await mongoose.connect('mongodb+srv://sharif2364khan:gmk43LXa5lpHnhWp@cluster0.vi7qd9t.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0', {
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

app.get("/status", async (req, res) => {
  const jobId = req.query.id;

  if (jobId === undefined) {
    return res
      .status(400)
      .json({ success: false, error: "missing id query param" });
  }

  const job = await Job.findById(jobId);

  if (job === undefined) {
    return res.status(400).json({ success: false, error: "couldn't find job" });
  }

  return res.status(200).json({ success: true, job });
});



//post 

app.post("/run", async(req, res) => {

    
    // console.log(req.body); 
    const { language = "cpp", code} = req.body;
    console.log(language, code.length);   

    if (code === "") {
        return res.status(400).json({ success: false,  error: "emptycode" });
    }

    try{
        // we'll generate a c++ or py file with content from the request
        const filepath = await generateFile(language, code);
        
        console.log("i m above save job");
        const job = new Job({language, filepath});
        const savedJob = await job.save();
        console.log("below job save");
        // const jobId = job["_id"];
        const jobId = savedJob._id;
        console.log(jobId);
        // res.status(201).json({success: true, jobId});

        let output;

        // need to run the file and send the respons
        if(language === "cpp"){
            output = await executeCpp(filepath);
            
            console.log(`in cpp loop n output is: ${output}`);
        }else{    
            output = await executePy(filepath);  
            console.log(`in py loop n output is: ${output}`);  
        }
        return res.json({filepath, output});
        // return res.json(output);

       

        
    }catch(error){
    // return res.json({filepath, someError: "error"});
        console.error("Error:", error);
        return res.status(500).json({ error: "Internal Server Error" });
    }
});



//listen
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