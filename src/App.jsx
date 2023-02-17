import React, { useState, useEffect } from 'react';
import ListadoPokemons from './Components/ListadoPokemons';
import FormularioPokemon from './Components/FormularioPokemon';

//import informacion from './db';
import './App.css';

// Hooks de Redux
import { useSelector, useDispatch } from 'react-redux';

function App() {
    //const [ pokemons, setPokemons ] = useState( JSON.parse(localStorage.getItem('pokemons')) ? JSON.parse(localStorage.getItem('pokemons')) : informacion );
    //Obtener el State de Redux
    const pokemons = useSelector( state => state.pokemons.pokemons );
    const [ pokemonSelected, setPokemonSelected ] = useState( {} );

    useEffect(() => {
        localStorage.setItem('pokemons', JSON.stringify( pokemons ));
    }, [pokemons]);

    return (
        <div className="app">
            <div className="card">
                <div className="container">
                    <ListadoPokemons
                        pokemons={pokemons}
                        //setPokemons={setPokemons}
                        setPokemonSelected={setPokemonSelected}
                    />
                    <FormularioPokemon
                        pokemons={pokemons}
                        //setPokemons={setPokemons}
                        pokemonSelected={pokemonSelected}
                        setPokemonSelected={setPokemonSelected}
                    />
                </div>
            </div>
        </div>
    )
}

export default App;