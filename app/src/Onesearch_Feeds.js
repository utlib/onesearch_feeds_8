import React, { Component } from 'react';
import axios from "axios";
import { OnesearchProvider } from "./OnesearchContext";
import SearchArea from './components/SearchArea';
import { ResultBox }  from './components/ResultBox';
import { FormatBox }  from './components/FormatBox';
import { GuidesBox }  from './components/GuidesBox';
import { ArticlesBox }  from './components/ArticlesBox';

class Onesearch_Feeds extends Component {
  constructor(props) {
    super(props);

    this.state = {
      performSearch: this.performSearch,
      kw: '',
      is_local: 1,
      items_per_block: '',
      updateKW: this.updateKW,
      handleCheckBoxChange: this.handleCheckBoxChange,
      books_enabled: false,
      journal_enabled: false,
      formats_enabled: false,
      render_books: false,
      render_journal: false,
      next_most_format: '',
      summon_enabled: 0,
      summon_count: 0,
      guides_enabled: 0,
      books_count: 0,
      books_result: [],
      journal_count: 0,
      journal_result: [],
      guides_result: [],
      is_online_clicked: false,
      is_title_only: false,
      other_format_list: [],
      next_most_format_list: [],
      next_most_format_count: 0,
      libguides_site_id: '',
      libguides_api_key: '',
      libguides_group_id: '',
      summon_lists: [],
      next_most_format_id: '',
    }
  }

  renderAllUrl = (id, title_only, online_only,kw) => {
    var nTx = 'mode+matchallpartial';
    if (title_only) {
        var nTk = 'Title';
        if (id == 6962) {
            nTx = 'mode+matchallpartial+rel+phrase(approximate),nterms,maxfield,glom,static(Publication_year,descending)';
        }
        

    } else {
        var nTk = 'Anywhere';
    }

    if (id == 206416) {
        nTk = 'Title';
        nTx = 'mode+matchallpartial+rel+nterms,exact,static(Online,ascending),maxfield,glom';
    }

    if (online_only) {
        var n_keyword = id+'+207006';
    } else {
        var n_keyword = id;
    }

    var url = `https://search.library.utoronto.ca/search?Ntx=${nTx}&Nu=p_work_normalized&N=${n_keyword}&Np=1&Ntt=${kw}&Ntk=${nTk}&format=json&results=${this.state.items_per_block}`;
    return url;
}

renderFormatUrl = (title_only, online_only,kw) => {

  if (online_only) {
    var n_keyword  = '0+207006';
  } else {
    var n_keyword = '0';
  }

  if (title_only) {
    var nTk = 'Title';
  } else {
    var nTk ='Anywhere';
  }
    var url = `https://search.library.utoronto.ca/search?Nu=p_work_normalized&Np=1&action=get_all_facetvals&facet=Format&format=json&Ntx=mode+matchallpartial&Ntt=${kw}&N=${n_keyword}&Ntk=${nTk}`
    return url;
  }

  callAxios = async (url) => {
    return axios.get(url);
  }

  performSearch = async (e) => {
    e.preventDefault();
    var online_checked = e.target.onesearch_online.checked;
    this.setState({is_online_clicked: online_checked});
    var title_only_checked = e.target.onesearch_title_only.checked;
    this.setState({is_title_only: title_only_checked});

    var kw_encoded = encodeURIComponent(this.state.kw);

    if (this.state.books_enabled) {
      if (this.state.is_local) {
        var url = `/api/call_endeca/${this.state.kw}/${online_checked}/${title_only_checked}/6962`;
      } else {
        var url = this.renderAllUrl('6962',title_only_checked, online_checked, kw_encoded);
      }

      let res = await this.callAxios(url);
      this.setState({books_count: res.data.result.numResults});
        if (res.data.result.numResults > 0) {
        this.setState({books_result: res.data.result.records});
        this.setState({render_books: true});
      }
    }

    if (this.state.journal_enabled) {
      if (this.state.is_local) {
        var url = `/api/call_endeca/${this.state.kw}/${online_checked}/${title_only_checked}/206416`;
      } else {
        var url = this.renderAllUrl('206416',title_only_checked, online_checked, kw_encoded);
      }
      let res = await this.callAxios(url);
      this.setState({journal_count: res.data.result.numResults});
        if (res.data.result.numResults > 0) {
        this.setState({journal_result: res.data.result.records});
        this.setState({render_journal: true});
      }
    }

    if(this.state.formats_enabled) {
      if (this.state.is_local) {
        var url = `/api/formats_list/${this.state.kw}/${online_checked}/${title_only_checked}`;
      } else {
        var url = this.renderFormatUrl(title_only_checked, online_checked, kw_encoded);
      }
      let res = await this.callAxios(url);
      var formats_list = res.data.values;
      if (this.state.books_enabled) {
        var books_idx = formats_list.findIndex(x => x.id == '6962');
        if (books_idx !== -1) {
          formats_list.splice(books_idx,1);
        }
      }
      if (this.state.journal_enabled) {
        var journal_idx = formats_list.findIndex(x => x.id == '206416');
        if (journal_idx !== -1) {
          formats_list.splice(journal_idx,1);
        }

        var second_journal_idx = formats_list.findIndex(x => x.id == '6979');
        if (second_journal_idx !== -1) {
          formats_list.splice(second_journal_idx,1);
        }
      }
      
      formats_list.sort(function (a, b) {
        return b.count - a.count;
      });

      console.log(formats_list);
      this.setState({next_most_format: formats_list[0].name});
      this.setState({next_most_format_id: formats_list[0].id});
      formats_list.splice(0,1);
      this.setState({other_format_list: formats_list});
      if (this.state.is_local) {
        var url = `/api/call_endeca/${this.state.kw}/${online_checked}/${title_only_checked}/${this.state.next_most_format_id}`;
      } else {
        var url = this.renderAllUrl(this.state.next_most_format_id,title_only_checked, online_checked, kw_encoded);
      }
      let res_most_format = await this.callAxios(url);
      this.setState({next_most_format_count: res_most_format.data.result.numResults});
        if (res_most_format.data.result.numResults > 0) {
        this.setState({next_most_format_list: res_most_format.data.result.records});
      }
    }    

    if(this.state.guides_enabled) {
      axios.get(`//lgapi-ca.libapps.com/1.1/guides?search_match=2&status=1&site_id=${this.state.libguides_site_id}&key=${this.state.libguides_api_key}&search_terms=${kw_encoded}`).then((res) => {
      
      this.setState({guides_result: res.data.splice(0,this.state.items_per_block)});
      })
    }

    if(this.state.summon_enabled) {
      if (this.state.is_local) {
        var url = `/api/summon/${this.state.kw}/${online_checked}/${title_only_checked}`;
      } else {
        if (online_checked) {
          var fulltext = '&fulltext=1';
        } else {
            var fulltext = '';
        }
  
        if (title_only_checked) {
            var kw_summon = `(Title:(${kw_encoded}))`;
        } else {
            var kw_summon = kw_encoded;
        }

        var url = `https://query.library.utoronto.ca/index.php/search/json?kw=${kw_summon}&num_results=${this.state.items_per_block}&facet[0]=addFacetValueFilters(ContentType,Journal+Article)${fulltext}`;
      }
      let res = await this.callAxios(url);
      this.setState({summon_lists: res.data.documents});
      this.setState({summon_count: res.data.recordCount});
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
    this.setState({is_local: drupal_settings_json.is_local});
    this.setState({items_per_block: drupal_settings_json.items_per_block});
    this.setState({books_enabled: drupal_settings_json.books_enabled});
    this.setState({journal_enabled: drupal_settings_json.journal_enabled});
    this.setState({formats_enabled: drupal_settings_json.formats_enabled});
    this.setState({guides_enabled: drupal_settings_json.guides_enabled});
    this.setState({summon_enabled: drupal_settings_json.summon_enabled});
    this.setState({libguides_site_id: drupal_settings_json.libguides_site_id});
    this.setState({libguides_api_key: drupal_settings_json.libguides_api_key});
    this.setState({libguides_group_id: drupal_settings_json.libguides_group_id});
  }

  render() {
    return (
      <div className="App">
      <OnesearchProvider value={this.state}>
        <SearchArea />
        <div id='result_area'>
          <div id='catalogue_list'>
            {(this.state.summon_count > 0 && this.state.summon_enabled) && <ArticlesBox items_count={this.state.summon_count} items_list={this.state.summon_lists} kw={this.state.is_title_only? `(Title:(${this.state.kw}))` : this.state.kw} is_online={this.state.is_online_clicked} />}
            {(this.state.books_count > 0 && this.state.render_books) && <ResultBox heading={'Books'} id={'6962'} items_count={this.state.books_count} items_list={this.state.books_result} title_only={this.state.is_title_only} is_online={this.state.is_online_clicked} kw={this.state.kw} />}
            {(this.state.journal_count > 0 && this.state.render_journal) && <ResultBox heading={'Journals & Databases'} id={'206416'} items_count={this.state.journal_count} items_list={this.state.journal_result} title_only={this.state.is_title_only} is_online={this.state.is_online_clicked} kw={this.state.kw} />}
            {(this.state.next_most_format_count > 0 && this.state.formats_enabled)  && <ResultBox heading={this.state.next_most_format} id={this.state.next_most_format_id} items_count={this.state.next_most_format_count} title_only={this.state.is_title_only} items_list={this.state.next_most_format_list} is_online={this.state.is_online_clicked} kw={this.state.kw} />}
            {(this.state.other_format_list.length > 0 && this.state.formats_enabled)  && <FormatBox items_list={this.state.other_format_list} />}
          </div>
          <div id='library_info'>
            {(this.state.guides_enabled && this.state.guides_result.length > 0) && <GuidesBox items_list={this.state.guides_result} kw={this.state.kw} />}
          </div>
        </div>
        </OnesearchProvider>
        
      </div>
    );
  }
}

export default Onesearch_Feeds;
