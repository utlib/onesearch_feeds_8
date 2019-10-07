import React, { Component } from 'react';
import './App.css';
import axios from "axios";
import { OnesearchProvider } from "./OnesearchContext";
import SearchArea from './components/SearchArea';
import { ResultBox }  from './components/ResultBox';

class Onesearch_Feeds extends Component {
  constructor(props) {
    super(props);

    this.state = {
      performSearch: this.performSearch,
      kw: '',
      updateKW: this.updateKW,
      books_enabled: false,
      render_books: false,
      books_count: 0,
      books_result: [],
    }
  }

  performSearch = (e) => {
    e.preventDefault();


    if (this.state.books_enabled) {
      
      axios.get(`http://localhost:8002/?kw=${this.state.kw}`).then((res) => {
        this.setState({books_count: res.data.result.numResults});
         if (res.data.result.numResults > 0) {
          this.setState({books_result: res.data.result.records});
          this.setState({render_books: true});
        }
      });
    }
  }

  updateKW = (e) => {
    this.setState({kw : e.target.value});
  }

  componentDidMount() {
    var settingsElement = document.querySelector('head > script[type="application/json"][data-drupal-selector="drupal-settings-json"], body > script[type="application/json"][data-drupal-selector="drupal-settings-json"]');
    var drupal_settings_json = JSON.parse(settingsElement.textContent);
    this.setState({books_enabled: drupal_settings_json.books_enabled});
  }

  render() {
    return (
      <div className="App">
      <OnesearchProvider value={this.state}>
        <SearchArea />
        {(this.state.books_count > 0 && this.state.render_books) && <ResultBox heading={'Books'} items_list={this.state.books_result} />}
        </OnesearchProvider>
        
      </div>
    );
  }
}

export default Onesearch_Feeds;
