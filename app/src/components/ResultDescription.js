import React, { Component } from 'react';

export const ResultDescription = (props) => {

    return (
        <React.Fragment>
            <div className='title'><a href={props.item.link}>{props.item.title}</a></div>
            {props.item.rollup && <React.Fragment><span>{props.item.numRecords} Grouped records </span><br/></React.Fragment>}
            {(!props.item.rollup && props.item.authors != '') && <React.Fragment><span className='authors'>{props.item.authors}</span><br/></React.Fragment>}
            {props.item.imprint != '' && <span className='imprint'>{props.item.imprint}</span>}
            <br />
        </React.Fragment>
    )
}  