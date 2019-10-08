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
      handleCheckBoxChange: this.handleCheckBoxChange,
      books_enabled: false,
      journal_enabled: false,
      render_books: false,
      render_journal: false,
      books_count: 0,
      books_result: [],
      journal_count: 0,
      journal_result: [],
      is_online_clicked: false
    }
  }

  performSearch = (e) => {
    e.preventDefault();
    var online_checked = e.target.onesearch_online.checked;
    this.setState({is_online_clicked: online_checked})
    var title_only_checked = e.target.onesearch_title_only.checked;
    if (this.state.books_enabled) {
      axios.get(`http://localhost:8002/?kw=${this.state.kw}&online=${online_checked}&title_only=${title_only_checked}`).then((res) => {
        this.setState({books_count: res.data.result.numResults});
         if (res.data.result.numResults > 0) {
          this.setState({books_result: res.data.result.records});
          this.setState({render_books: true});
        }
      });
    }

    if (this.state.journal_enabled) {
      axios.get(`http://localhost:8002/journal_article.php?kw=${this.state.kw}&online=${online_checked}&title_only=${title_only_checked}`).then((res) => {
        this.setState({journal_count: res.data.result.numResults});
         if (res.data.result.numResults > 0) {
          this.setState({journal_result: res.data.result.records});
          this.setState({render_journal: true});
        }
      });  
    }
  }

  updateKW = (e) => {
    this.setState({kw : e.target.value});
  }

  handleCheckBoxChange = (e) => {
    var name = e.target.name;
    this.setState( {
      [name]: e.target.checked
    })
  }

  componentDidMount() {
    var settingsElement = document.querySelector('head > script[type="application/json"][data-drupal-selector="drupal-settings-json"], body > script[type="application/json"][data-drupal-selector="drupal-settings-json"]');
    var drupal_settings_json = JSON.parse(settingsElement.textContent);
    this.setState({books_enabled: drupal_settings_json.books_enabled});
    this.setState({journal_enabled: drupal_settings_json.journal_enabled});
  }

  render() {
    return (
      <div className="App">
      <OnesearchProvider value={this.state}>
        <SearchArea />
        {(this.state.books_count > 0 && this.state.render_books) && <ResultBox heading={'Books'} items_count={this.state.books_count} items_list={this.state.books_result} is_online={this.state.is_online_clicked} />}
        {(this.state.journal_count > 0 && this.state.render_journal) && <ResultBox heading={'Journals & Databases'} items_count={this.state.journal_count} items_list={this.state.journal_result} is_online={this.state.is_online_clicked} />}
        </OnesearchProvider>
        
      </div>
    );
  }
}

export default Onesearch_Feeds;
