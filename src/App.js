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

function SituationOutput({note})  {
  
//  let newNote = {note};
  return (
    <div className="container">
      <div className="border border-primary rounded p-3 m-3">
      
       <tbody>{note}</tbody> 
        
      </div>
    </div>
    );
}


export default function App () {
  
    const [note, setNote] = useState('');
    const [posts, setPosts] = useState([]);
    
    return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          My successful switch to functions from stupid class syntax
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
      
      <SituationOutput 
        note = {note}
        />
    </div>
  );
}
