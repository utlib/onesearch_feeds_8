import React, { Component } from 'react';
import { OnesearchConsumer } from "../OnesearchContext";
class SearchArea extends Component {
    render () {
        return (
            <OnesearchConsumer>
                {(context) => {
                    return (
                        <div>
                            <h1 class="title">Search {context.site_name}</h1>
                            <form onSubmit={context.submitSearch} id="searchArea">
                                <input className="onesearch_input form-control" id="onesearch-query-front" name="onesearch-query" placeholder="Find books, ebooks, articles, journals, more" type="text" value={context.kw} onChange={context.updateKW} />
                                <br />
                                <label for="onesearch_title_only">Search by title</label>&nbsp; <input id="onesearch_title_only" name="onesearch_title_only" type="checkbox" defaultChecked={context.is_title_only} /> &nbsp;&nbsp;&nbsp;<label for="onesearch_online"> Online only</label> &nbsp; <input id="onesearch_online" name="onesearch_online" type="checkbox"  defaultChecked={context.is_online_clicked} />&nbsp;
                                {context.enable_limit_results_library? <React.Fragment><label for="limit_results_library">Current Library Only</label> &nbsp;<input id="limit_results_library" name="limit_results_library" type="checkbox" defaultChecked={context.limit_to_library} /></React.Fragment>: null}
                                <input className="searchButton allButton" id="onesearch-submit" name="onesearch-submit" type="submit" value="Search" />
                            
                            </form>  
                        </div>
                    )
                }}
            </OnesearchConsumer>

        )
    }
}

export default SearchArea;