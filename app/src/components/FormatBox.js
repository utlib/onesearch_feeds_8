import React, { Component } from 'react';
import { ResultDescription } from './ResultDescription';

export const FormatBox = (props) => {

    return (
        <div className="box books-box books endeca_box" id="books">
            <div className="result-box" id="format_results">
            <header>
                <div>
                    <h2>More Formats</h2>
                </div>
            </header>
            <ul>
                {props.items_list.map((item) => <li key={item.id}> <a href={`https://search.library.utoronto.ca/${item.link}`}> {item.name} {item.count} </a> </li>)}

            </ul>
            </div>
        </div>
    )
}  