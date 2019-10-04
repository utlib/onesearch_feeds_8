import React, { Component } from 'react';
import './App.css';
import { OnesearchProvider } from "./OnesearchContext";
import SearchArea from './components/SearchArea';

class Onesearch_Feeds extends Component {
  constructor(props) {
    super(props);

    this.state = {
      
    }
  }
  render() {
    return (
      <div className="App">
      <OnesearchProvider>
        <SearchArea />
      </OnesearchProvider>
        
      </div>
    );
  }
}

export default Onesearch_Feeds;
