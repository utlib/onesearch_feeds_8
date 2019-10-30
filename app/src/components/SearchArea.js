import React, { Component } from 'react';
import { OnesearchConsumer } from "../OnesearchContext";
class SearchArea extends Component {
    render () {
        return (
            <OnesearchConsumer>
                {(context) => {
                    return (
                        <div>
                            <h2>Your Search</h2>
                            <form onSubmit={context.submitSearch} id="searchArea">
                                <input className="onesearch_input form-control" id="onesearch-query-front" name="onesearch-query" placeholder="Find books, ebooks, articles, journals, more" type="text" value={context.kw} onChange={context.updateKW} />
                                <input className="searchButton allButton" id="onesearch-submit" name="onesearch-submit" type="submit" value="Search" />
                                <br />
                                <label for="onesearch_title_only">Search by title</label>&nbsp; <input id="onesearch_title_only" name="onesearch_title_only" type="checkbox" defaultChecked={context.is_title_only} /> &nbsp;&nbsp;&nbsp;<label for="onesearch_online"> Online only</label> &nbsp; <input id="onesearch_online" name="onesearch_online" type="checkbox"  defaultChecked={context.is_online_clicked} />&nbsp;
                            </form>  
                        </div>
                    )
                }}
            </OnesearchConsumer>

        )
    }
}

export default SearchArea;