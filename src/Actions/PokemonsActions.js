import {
    AGREGAR_POKEMON,
    EDITAR_POKEMON,
    ELIMINAR_POKEMON,
} from '../Types/types';

export function crearNuevoPokemonAction(pokemon) {
    return (dispatch) => {
        dispatch( agregarPokemon(pokemon) );
    }
}

const agregarPokemon = (pokemon) => ({
    type: AGREGAR_POKEMON,
    payload: pokemon
});

export function editarPokemonAction(pokemon) {
    return (dispatch) => {
        dispatch( editarPokemon(pokemon) );
    }
}

const editarPokemon = (pokemon) => ({
    type: EDITAR_POKEMON,
    payload: pokemon
});