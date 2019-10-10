import React, { Component } from 'react';

export const ArticlesBox = (props) => {

    return (
        <div className="box guides" id="guides">
            <div className="result-box" id="guides_results">
            <header>
                <div>
                    <h2>Articles <span>{props.items_count}</span></h2>
                </div>
            </header>
            <ul>
                {props.items_list.map((item, index) => <li key={index}>
                <a href={item.link}>{item.Title[0]}</a> <br /> 
                {item.PublicationTitle && `${item.PublicationTitle[0]}, `} {item.PublicationYear && `${item.PublicationYear[0]}, `} {item.Volume && `Volume: ${item.Volume[0]}, `} {item.Issue && `Issue: ${item.Issue[0]}, `}
                {item.EndPage? 'pp.' : 'p. '} {item.StartPage && item.StartPage[0]} {item.EndPage && `- ${item.EndPage[0]}`} 
                </li>)}
            </ul>
            <footer>
            
            </footer>
            
            </div>
        </div>
    )
}  