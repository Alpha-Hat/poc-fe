import logo from './logo.svg';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import React, { useState } from 'react';
import AddPost from './components/addPost';
import Post from './components/post';
import awsconfig from './aws-exports';
import '@aws-amplify/ui-react/styles.css';

// Visual component box to Question
function AddSituation({ note, setNote }) {
  function handleNoteChange(e) {
    setNote(e.target.value);
  }

  function handleClick() {
    setNote('');
  }

  return (
    <div className="container p-3">
      <div className="input-group mb-3 p-3">
        <input
          type="text"
          className="form-control form-control-lg"
          placeholder="Add Your Financial Situation"
          aria-label="Question"
          aria-describedby="basic-addon2"
          value={note}
          onChange={handleNoteChange}
        />
        <button onClick={handleClick} className="btn btn-outline-success btn-lg" type="button">
          Submit
        </button>
      </div>
    </div>
  );
}

// Visual component box to output
function SituationOutput({ apiMessage }) {
  return (
    <div className="container">
      <div className="border border-primary rounded p-3 m-3">
        <pre><code>{JSON.stringify(apiMessage, null, 2)}</code></pre>
      </div>
    </div>
  );
}

export default function App() {
  const [note, setNote] = useState('');
  const [posts, setPosts] = useState([]);
  const [showResult, setShowResult] = useState(false);
  const [apiMessage, setApiMessage] = useState("");

  const getApiMessage = async () => {
    try {
      const response = await fetch(`${process.env.REACT_APP_ENDPOINT}src`, {
        mode: 'cors',
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ prompt: "what is 5+5? Answer with a one word response." })
      });

      const responseData = await response.text();
      console.log(responseData);

      setShowResult(true);
      setApiMessage(responseData);
    } catch (error) {
      console.error("Error fetching API message:", error);
    }
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
      <AddSituation note={note} setNote={setNote} />
      <button onClick={getApiMessage}>Call Lambda</button>
      {showResult && <SituationOutput apiMessage={apiMessage} />}
    </div>
  );
}
