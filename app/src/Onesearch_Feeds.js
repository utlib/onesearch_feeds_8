import React, { Component } from 'react';
import './App.css';
import axios from "axios";
import { OnesearchProvider } from "./OnesearchContext";
import SearchArea from './components/SearchArea';
import { ResultBox }  from './components/ResultBox';
import { FormatBox }  from './components/FormatBox';

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
      formats_enabled: false,
      render_books: false,
      render_journal: false,
      next_most_format: '',
      books_count: 0,
      books_result: [],
      journal_count: 0,
      journal_result: [],
      is_online_clicked: false,
      other_format_list: [],
      next_most_format_list: [],
      next_most_format_count: 0
    }
  }

  performSearch = (e) => {
    e.preventDefault();
    var online_checked = e.target.onesearch_online.checked;
    this.setState({is_online_clicked: online_checked})
    var title_only_checked = e.target.onesearch_title_only.checked;
    if (this.state.books_enabled) {
      axios.get(`http://localhost:8002/?kw=${this.state.kw}&online=${online_checked}&title_only=${title_only_checked}&format=6962`).then((res) => {
        this.setState({books_count: res.data.result.numResults});
         if (res.data.result.numResults > 0) {
          this.setState({books_result: res.data.result.records});
          this.setState({render_books: true});
        }
      });
    }

    if (this.state.journal_enabled) {
      axios.get(`http://localhost:8002/?kw=${this.state.kw}&online=${online_checked}&title_only=${title_only_checked}&format=206416`).then((res) => {
        this.setState({journal_count: res.data.result.numResults});
         if (res.data.result.numResults > 0) {
          this.setState({journal_result: res.data.result.records});
          this.setState({render_journal: true});
        }
      });  
    }

    if(this.state.formats_enabled) {
      axios.get(`http://localhost:8002/formats.php?kw=${this.state.kw}&online=${online_checked}&title_only=${title_only_checked}`).then((res) => {
        var formats_list = res.data.values;
        if (this.state.books_enabled) {
          var books_idx = formats_list.findIndex(x => x.id == '6962');
          formats_list.splice(books_idx,1);
        }
        if (this.state.journal_enabled) {
          var journal_idx = formats_list.findIndex(x => x.id == '206416');
          formats_list.splice(journal_idx,1);
          formats_list.splice(formats_list.findIndex(x => x.id == '6979'),1);
        }
        
        this.setState({next_most_format: formats_list[0].name});
        var next_most_format_id = formats_list[0].id;
        formats_list.splice(0,1);
        formats_list.sort(function (a, b) {
          return b.count - a.count;
        });
        this.setState({other_format_list: formats_list});
        
        axios.get(`http://localhost:8002/?kw=${this.state.kw}&online=${online_checked}&title_only=${title_only_checked}&format=${next_most_format_id}`).then((res) => {
          this.setState({next_most_format_count: res.data.result.numResults});
           if (res.data.result.numResults > 0) {
            this.setState({next_most_format_list: res.data.result.records});
          }
        });  
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
    this.setState({formats_enabled: drupal_settings_json.formats_enabled});
  }

  render() {
    return (
      <div className="App">
      <OnesearchProvider value={this.state}>
        <SearchArea />
        {(this.state.books_count > 0 && this.state.render_books) && <ResultBox heading={'Books'} items_count={this.state.books_count} items_list={this.state.books_result} is_online={this.state.is_online_clicked} />}
        {(this.state.journal_count > 0 && this.state.render_journal) && <ResultBox heading={'Journals & Databases'} items_count={this.state.journal_count} items_list={this.state.journal_result} is_online={this.state.is_online_clicked} />}
        {(this.state.next_most_format_count > 0 && this.state.formats_enabled)  && <ResultBox heading={this.state.next_most_format} items_count={this.state.next_most_format_count} items_list={this.state.next_most_format_list} is_online={this.state.is_online_clicked} />}
        {(this.state.other_format_list.length > 0 && this.state.formats_enabled)  && <FormatBox items_list={this.state.other_format_list} />}
        </OnesearchProvider>
        
      </div>
    );
  }
}

export default Onesearch_Feeds;
