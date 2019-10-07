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
                            <form onSubmit={context.performSearch} id="searchArea">
                                <input className="onesearch_input form-control" id="onesearch-query-front" name="onesearch-query" placeholder="Find books, ebooks, articles, journals, more" type="text" value={context.kw} onChange={context.updateKW} />
                                <input className="searchButton allButton" id="onesearch-submit" name="onesearch-submit" type="submit" value="Search" />
                                <br />
                                <label for="onesearch-title-only-front">Search by title</label>&nbsp; <input id="onesearch-title-only-front" name="onesearch-title-only-front" type="checkbox" value="" /> &nbsp;&nbsp;&nbsp;<label for="onesearch-online-front"> Online only</label> &nbsp; <input id="onesearch-online-front" name="onesearch-online" type="checkbox" value="" />&nbsp;
                            </form>  
                        </div>
                    )
                }}
            </OnesearchConsumer>

        )
    }
}

export default SearchArea;