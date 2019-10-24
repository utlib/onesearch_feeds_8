import React, { Component } from 'react';
import { ResultDescription } from './ResultDescription';
import NumberFormat from 'react-number-format';

export const ResultBox = (props) => {

    const renderAllUrl = (id, title_only, online_only,kw) => {

        var nTx = 'mode+matchallpartial';
        if (title_only) {
            var nTk = 'Title';
            if (id == 6962) {
                nTx = 'mode+matchallpartial+rel+phrase(approximate),nterms,maxfield,glom,static(Publication_year,descending)';
            }
            

        } else {
            var nTk = 'Anywhere';
        }

        if (id == 206416) {
            nTk = 'Title';
			nTx = 'mode+matchallpartial+rel+nterms,exact,static(Online,ascending),maxfield,glom';
        }

        if (online_only) {
            var n_keyword = id+'+207006';
        } else {
            var n_keyword = id;
        }

        var url = `https://search.library.utoronto.ca/search?Ntx=${nTx}&Nu=p_work_normalized&N=${n_keyword}&Np=1&Ntt=${kw}&Ntk=${nTk}`;
        return url;
    }

    return (
        <div className="box endeca_box"> 
        {props.items_count > 0 ?
            <div className="result-box" id="book_results">
            <header>
                <div>
                    <h2>{ props.is_online ? 'Online': ''} {props.heading} <NumberFormat value={props.items_count} displayType={'text'} thousandSeparator={true} /></h2>
                </div>
            </header>
            <ul>
                {props.items_list.map((item) => <li key={item.catkey}><ResultDescription item={item}/> </li>)}

            </ul>
            <footer>
                <a href={renderAllUrl(props.id,props.title_only, 1, props.kw)} className="view_more_guides">{props.online_only? 'All' : ''} Online {props.heading} {props.online_only? <NumberFormat value={props.items_count} displayType={'text'} thousandSeparator={true} /> : ''}</a>
                <a href={renderAllUrl(props.id,props.title_only, 0, props.kw)} className="view_more_guides">All {props.heading} {props.online_only? '' : <NumberFormat value={props.items_count} displayType={'text'} thousandSeparator={true} />}</a>
            </footer>
            
            </div>
        : <div></div>
        }

        </div>
    )
}  