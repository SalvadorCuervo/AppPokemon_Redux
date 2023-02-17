import { combineReducers } from 'redux';
import PokemonsReducer from './PokemonsReducer';

export default combineReducers({
    pokemons: PokemonsReducer,
});