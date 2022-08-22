import React from 'react';
import { useState, useEffect } from 'react';
import Card from './card';
import './cardScreen.css';

const CardScreen = () => {
    return (
        <>
        <div className='card-view-wrapper'>
            <div className='single-card-view'>
                <hr style={{marginLeft: '10px', marginRight: '10px'}}/>
                <div className='graph-wrapper'>
                    <Card projectId={295} />
                </div>
                <hr style={{marginLeft: '10px', marginRight: '10px'}} />
            </div>
            <div className='rest'>
            </div>
        </div>
        </>
        
    )
}


export default CardScreen;