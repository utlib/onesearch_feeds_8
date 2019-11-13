import React, { Component } from 'react';
import { ResultDescription } from './ResultDescription';
import NumberFormat from 'react-number-format';

export const SiteSearchBox = (props) => {
    if (props.items_list.length > 0) {
        return(
            <div className="box" id="site_search">
                <header>
                    <div>
                        <h2>Library Web Pages</h2>
                    </div>
                </header>
                <ul>
                    {props.items_list.map((item, index) => <li key={index}> <a href={item.alias}>{item.title}</a> <br /> <span dangerouslySetInnerHTML={{__html: item.excerpt}} /></li>)}
    
                </ul>
                <footer>
                <a href={`/search/node?keys=${props.kw}`} className="view_more_guides">See all site search results for {props.kw}</a>
                </footer>
            </div>
        )
    } else {
        return null;
    }


}