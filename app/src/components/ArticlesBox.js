import React, { Component } from 'react';
import NumberFormat from 'react-number-format';

export const ArticlesBox = (props) => {

    return (
        
        <div className="box guides" id="guides">
            {props.items_count > 0 ?
            <div className="result-box" id="guides_results">
            <header>
                <div>
                    <h2>Articles <NumberFormat value={props.items_count} displayType={'text'} thousandSeparator={true} /></h2>
                </div>
            </header>
            <ul>
                {props.items_list.map((item, index) => <li key={index}>
                <a href={item.link}>{item.Title[0]}</a> <br /> 
                <span className='authors'>{item.Author && `by ${item.Author.join(' and ')}.`}</span>
                <span>{item.PublicationTitle && `${item.PublicationTitle[0]}, `} </span>
                <span>{item.PublicationYear && `${item.PublicationYear[0]}, `}</span> 
                <span>{item.Volume && `Volume: ${item.Volume[0]}, `} </span>
                <span>{item.Issue && `Issue: ${item.Issue[0]}, `}</span>
                {item.EndPage? 'pp.' : 'p. '} {item.StartPage && item.StartPage[0]} {item.EndPage && `- ${item.EndPage[0]}`} 
                </li>)}
            </ul>
            <footer>
            <a href={`http://query.library.utoronto.ca/index.php/search/q?kw=${props.kw}&scholarly=1&facet[0]=addFacetValueFilters(ContentType,Journal+Article)${props.is_online? '&fulltext=1': ''}`} className="view_more_guides">Scholarly Only</a>
            <a href={`http://query.library.utoronto.ca/index.php/search/q?kw=${props.kw}&facet[0]=addFacetValueFilters(ContentType,Journal+Article)${props.is_online? '&fulltext=1': ''}`} className="view_more_guides">All Articles <NumberFormat value={props.items_count} displayType={'text'} thousandSeparator={true} /></a>
            </footer>
            
            </div>
            :<div></div>
            }
        </div>
        
    )
}  