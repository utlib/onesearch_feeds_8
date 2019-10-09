import React, { Component } from 'react';

export const GuidesBox = (props) => {

    return (
        <div className="box books-box books endeca_box" id="books">
            <div className="result-box" id="book_results">
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
            </div>
        </div>
    )
}  