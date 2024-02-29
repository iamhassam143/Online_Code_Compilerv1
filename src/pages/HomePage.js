import React, { useState } from 'react';
import axios from "axios"
import '../HomePage.css'; // Import your CSS file for styling
import { Link } from 'react-router-dom';
import Signin from './Signin';

function HomePage() {
    const [code, setCode] = useState('');
    const [output, setOutput] = useState('');
    const [language, setLanguage] = useState("cpp");
    const [status, setStatus] = useState(null);
    const [jobDetails, setJobDetails] = useState(null);
    const [jobId, setJobId] = useState(null);


    const [err, setErr] = useState('');

    let pollInterval;

      const handleClear = () => {
    setCode('');
    setOutput('');
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(code);
    alert("Code copied to clipboard!");
  };

    const handleSubmit = async () => {
        console.log("submit click");
        const payload = {
            language,
            code
        };
        try {
            setOutput("");
            setStatus(null);
            setJobId(null);
            setJobDetails(null);
            const { data } = await axios.post("http://localhost:5000/run", payload);
            setOutput(data.output);
            setJobId(data.jobId);
            setStatus("Submitted.");


        } catch (error) {
            if (error.response) {
                console.log(error.response);
                console.log("m in if loop");
                console.log(error.response.data.error);
                console.log(error.response.data.stderr);

                setOutput(error.response.data.error.stderr);
                // The request was made and the server responded with a status code
                // that falls out of the range of 2xx
                // if (error.response.data && error.response.data.err) {
                //   const errMsg = error.response.data.err.stderr;
                //   setOutput(errMsg);
            } else if (error.request) {
                // The request was made but no response was received
                setOutput("No response received from the server.");
            } else {
                // Something happened in setting up the request that triggered an error
                setOutput("An error occurred. Please retry submitting.");
            }
        }

    };

    return (
        <div className="container">
            <nav className="navbar">
                <div className="navleftitems">
                    <img src="/code-sync.png"
                        alt="code-sync-logo"
                        style={{ width: '160px', height: '45px' }}/>
                    <div className="dropdowncon">
                        <select className="btn select-language" value={language} onChange={(e) => {setLanguage(e.target.value);}}>
                            <option value="cpp" > C++ </option>
                            <option value="py" > Python </option>
                    </select>
                    </div>
                </div>
                <div className="navrightitems">
                    <button className="btn"><Link to="http://localhost:3001/" style={{ textDecoration: 'none', color: 'white' }}>Create/Join Room</Link></button>
                    <button className="btn"><Link to="/signin" style={{ textDecoration: 'none', color: 'white' }}>Sign Up/Sign In</Link></button>
                </div>
            </nav>
            <div className='editorcon'>
                <textarea className="code-editor" rows="20" cols="75" value={code} onChange={(e) => {
                    setCode(e.target.value);
                }} placeholder={language}></textarea>
            </div>
            <div className="runbtncon">
                <button className="btn run-btn" onClick={handleSubmit}>Run</button>
                <button className="btn run-btn" onClick={handleCopy}>Copy</button>
                <button className="btn run-btn" onClick={handleClear}>Clear</button>
            </div>
            <div className='outputcon'>
                <label className='labelcss'>Output: <label className='labelcss1'>{output}</label></label>
            </div>
        </div>
        );
}

export default HomePage;
