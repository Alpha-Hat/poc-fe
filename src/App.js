import logo from './logo.svg';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import React, { Component } from 'react';
import {useState, useEffect} from 'react';
import ReactDOM from 'react-dom/client';
import AddPost from './components/addPost';
import Post from './components/post';
import awsExports from "./aws-exports";
import '@aws-amplify/ui-react/styles.css';
import awsconfig from './aws-exports';

// Visual component box to Question
function AddSituation ({note, setNote, posts, setposts}) {
  
  
  function handleNoteChange(e) {
    setNote(e.target.value);
  }
  
  function handleclick(e) {
    setNote('');
    
  }
  
  
      return (
      <div className="container p-3">
            <div className="input-group mb-3 p-3">
              <input type="text" className="form-control form-control-lg" placeholder="Add Your Financial Situation" aria-label="Question" aria-describedby="basic-addon2" value={ note } onChange={handleNoteChange}/>
              <div className="input-group-append">
                <button onClick={ handleclick } className="btn btn-outline-success btn-lg" type="submit">{ "Submit" }</button>  
              </div>
            </div>
        </div>  
    )
}  
// visual component box to output
function SituationOutput({apiMessage})  {
  
//  let newNote = {note};
  return (
    <div className="container">
      <div className="border border-primary rounded p-3 m-3">
      
       <tbody>{<code>{JSON.stringify(apiMessage, null, 2)}</code>}</tbody> 
        
      </div>
    </div>
    );
}


export default function App () {
  
  const [note, setNote] = useState('');
  const [posts, setPosts] = useState([]);
    
  const [showResult, setShowResult] = useState(false);
  const [apiMessage, setApiMessage] = useState("");
  
  const getApiMessage = async () => {
    
//    const data = new URLSearchParams();
    const params = new URLSearchParams({prompt: "what is 5+5? Answer with a one word response."});
//    data.append('what is 2+2? Answer with a one word response.');
    console.log(process.env.REACT_APP_ENDPOINT);
    console.log(params.toString());
    const response = await fetch(`${process.env.REACT_APP_ENDPOINT}src`, 
      {mode: 'cors',
      method: 'POST',
  	  headers: {
  		'Content-Type': 'prompt'
  	  },
  	body: params
      });
    
    const responseData = await response.text();
    console.log(responseData)

    setShowResult(true);
    setApiMessage(responseData);  
  };
    
    return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Take Control of Your Financial Safety
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React LIKE ME!
        </a>
      </header>
      <AddSituation 
        note = {note}
        setNote = {setNote}
        posts= {posts}
        setPosts = {setPosts}
        />
      <button onClick={getApiMessage}>Call Lambda</button>
      
      <SituationOutput 
        apiMessage = {apiMessage}
        />
        
    </div>
  );
}
