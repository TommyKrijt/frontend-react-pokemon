import React, {useEffect, useState} from 'react';
import axios from "axios";
import './styles.css'




export function PokemonCard({ pokemon }){

    const [pokemonData, setPokemonData] = useState('')
    const [pokemonImage, setPokemonImage] = useState([])
    const [pokemonAbilities, setPokemonAbilities] = useState([])
    const [pokemonMoves, setPokemonMoves] = useState([])

    useEffect(() => {
        async function fetchPokemonData(pokemon) {
            try {
                const result = await axios.get(`https://pokeapi.co/api/v2/pokemon/${pokemon}`)
                setPokemonData(result.data)
                setPokemonImage(result.data.sprites)
                setPokemonAbilities(result.data.abilities)
                setPokemonMoves(result.data.moves)
            } catch(e) {
                console.error(e)
            }
        }
        fetchPokemonData(pokemon)
    },[pokemon])

    return(
        <>

            <div className='pokemon-card'>
                <h1 className='pokemon-name'>{pokemonData.name}</h1>
                <img className='pokemon-image' src={pokemonImage.front_default} alt={pokemonData.name + 'image'}/>
                <p className='pokemon-weight'>Weight: {pokemonData.weight}</p>
                <p className='pokemon-moves'>Moves: {pokemonMoves.length} </p>
                <div className='pokemon-abilities'>
                    <p className='pokemon-abilities-title'>Abilities:</p>
                    <ul>
                        {pokemonAbilities.map((a)=>{
                            return <li className='pokemon-ability' key={a.ability.name}>{a.ability.name}</li>
                        })}
                    </ul>
                </div>
            </div>
        </>
    )
}