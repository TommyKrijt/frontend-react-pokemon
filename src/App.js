import React, {useEffect, useState} from 'react';
import axios from "axios";
import './App.css';
import pokemonLogo from "./assets/pokemon-logo.png";
import {PokemonCard} from "./components/pokemon/PokemonCard";
import {PokeButtons} from "./components/buttons/PokeButtons";

//ignore this comment


function App() {
    const [pokemon, setPokemon] = useState([]);

    const [endpoint, setEndpoint] = useState(`https://pokeapi.co/api/v2/pokemon/`);
    const [nextEndpoint, setNextEndpoint] = useState();
    const [previousEndpoint, setPreviousEndpoint] = useState();
    const [loading, setLoading] = useState(true)

    useEffect(()=>{
        async function fetchData() {
            try{
                setLoading(true);
                const data = await axios.get(endpoint);
                setLoading(false);
                setPokemon(data.data.results)
                setNextEndpoint(data.data.next);
                setPreviousEndpoint(data.data.previous);
            } catch(e) {
                console.error(e)
            }

        }
        fetchData()
    }, [endpoint]);

    if (loading) {
        return 'Loading...';
    }

    function goToNextPage() {
        setEndpoint(nextEndpoint);
    }

    function goToPreviousPage() {
        setEndpoint(previousEndpoint);
    }




    return (
        <>
            <div className='app'>
                <header className= 'app-header'>
                    <img className='pokemon-logo' src={pokemonLogo}/>
                </header>
                <div className='app-buttons'>
                    <PokeButtons
                        goToNext = {goToNextPage}
                        goToPrev = {goToPreviousPage}
                        nextEndpoint = {nextEndpoint}
                        previousEndpoint = {previousEndpoint}
                    />
                </div>
                <div className='app-card-container'>
                    {pokemon.map((p) => {
                        return <PokemonCard key={p.name} pokemon={p.name}/>
                    })}
                </div>



            </div>
        </>
  );
}

export default App;
