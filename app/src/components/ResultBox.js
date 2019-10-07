import React, { Component } from 'react';
import { OnesearchConsumer } from "../OnesearchContext";
import { Link } from 'react-router-dom'

export const ResultBox = (props) => {
    return (
        <OnesearchConsumer>
            {(context) => {
                return (
                    <div className="box books-box books endeca_box" id="books">
                        <div className="result-box" id="book_results">
                        <header>
		                    <div>
			                    <h2>{props.heading} </h2>
                            </div>
                        </header>
                        {props.items_list[0].catkey} {props.items_list[0].title}
                        <ul>
                            {props.items_list.map((item) => <li key={item.catkey}>  {item.title} </li>)}

                        </ul>
                        </div>
                    </div>
                )
            }}
        </OnesearchConsumer>
    )
}