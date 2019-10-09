import React, { Component } from 'react';
import { ResultDescription } from './ResultDescription';

export const ResultBox = (props) => {

    return (
        <div className="box endeca_box">
            <div className="result-box" id="book_results">
            <header>
                <div>
                    <h2>{ props.is_online ? 'Online': ''} {props.heading} <span>{props.items_count}</span></h2>
                </div>
            </header>
            <ul>
                {props.items_list.map((item) => <li key={item.catkey}><ResultDescription item={item}/> </li>)}

            </ul>
            </div>
        </div>
    )
}  