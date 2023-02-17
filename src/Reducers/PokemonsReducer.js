import {
    AGREGAR_POKEMON,
    EDITAR_POKEMON,
    ELIMINAR_POKEMON,
} from '../Types/types';

import informacion from '../db';

//Cada reducer tiene su propio State
const initialState = {
    pokemons: JSON.parse(localStorage.getItem('pokemons')) ? JSON.parse(localStorage.getItem('pokemons')) : informacion,
    error: null,
};

export default function( state = initialState, action ) {
    switch( action.type ) {
        case AGREGAR_POKEMON: 
            return {
                ...state,
                pokemons: [ ...state.pokemons, action.payload ]
            }
        case EDITAR_POKEMON: 
        console.log( action );
            return {
                ...state,
                pokemons: state.pokemons.map( pokemon => pokemon._id === action.payload._id ? pokemon = action.payload : pokemon )
            }
        default:
            return state;
    }
};