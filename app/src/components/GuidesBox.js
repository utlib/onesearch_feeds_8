import React, { Component } from 'react';

export const GuidesBox = (props) => {

    if (props.items_list.length > 0) {
        return (
            <div className="box guides" id="guides">
                <div className="result-box" id="guides_results">
                <header>
                    <div>
                        <h2>Research Guides</h2>
                    </div>
                </header>
                <ul>
                    {props.items_list.map((item) => <li key={item.id}>
                    <a href={item.friendly_url}>{item.name}</a> <br />{item.description} 
                    </li>)}
    
                </ul>
                <footer>
                <a href={`http://guides.library.utoronto.ca/srch.php?q=${props.kw}`} className="view_more_guides">All guides</a>
                </footer>
                
                </div>
            </div>
        )
    } else {
        return null;
    }

}  