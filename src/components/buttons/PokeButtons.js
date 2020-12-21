import React from 'react';
import './styles.css'



export function PokeButtons({goToPrev, goToNext, nextEndpoint, previousEndpoint}){


    return(
        <>
            <button onClick={goToPrev} disabled={!previousEndpoint}>Previous</button>
            <button onClick={goToNext} disabled={!nextEndpoint}>Next</button>
        </>
    )
}