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
class AddSituation extends Component {
  
  constructor(props) {
    super(props);
    this.state = { note: '' }
  }
  
  handleChange = (event) => {
    this.setState( { note: event.target.value } );
  }
  
  handleClick = (event) => {
    event.preventDefault();    

    // let the app manage the persistence & state 
    this.props.addSituation( this.state ); 
    
    // reset the input text box value
    this.setState( { note: '' } );
  }
  
  render() {
    return (
      <div className="container p-3">
            <div className="input-group mb-3 p-3">
              <input type="text" className="form-control form-control-lg" placeholder="Add Your Financial Situation" aria-label="Question" aria-describedby="basic-addon2" value={ this.state.note } onChange={this.handleChange}/>
              <div className="input-group-append">
                <button onClick={ this.handleClick } className="btn btn-outline-success btn-lg" type="submit">{ "Submit" }</button>  
              </div>
            </div>
        </div>  
    )
  }
}

class App extends Component {
  
    constructor(props) {
    super(props);
    this.state = { notes:[] }
    }
//  const [posts, setPosts] = useState([]);
  
//  const fetchPost = () => {
//    fetch('https://jsonplaceholder.typicode.com/posts?_limit=10')
//     .then(response => response.json())
//     .then(data => console.log(data));
//  }
    
  addSituation = async (note) => {
    
    var newNote = note;
//    newQuestion = noteAnalysis.textInterpretation.sentiment.predominant;
    
//    var result = await BedrockAPI.graphql(graphqlOperation(createNote, {input:newNote})); //calls API to add a note - {input: note} passes type "note" you want to add when clicking
//    this.state.notes.push(result.data.createNote);
    this.setState( { notes: this.state.notes } );
  }
  
  render(){
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
      <AddSituation addSituation={ this.addSituation }/>
    </div>
  );
  }
}

export default App;
