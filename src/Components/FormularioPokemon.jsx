import React, { useState, useEffect } from 'react';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFloppyDisk, faXmark } from '@fortawesome/free-solid-svg-icons';
import Error from './Error';

//Actions de Redux
import { useDispatch, useSelector } from 'react-redux';
import { crearNuevoPokemonAction, editarPokemonAction } from '../Actions/PokemonsActions';

function FormularioPokemon({ pokemons, setPokemons, pokemonSelected, setPokemonSelected }) {
    const [ nombre, setNombre ] = useState( '' );
    const [ imageUrl, setImageUrl ] = useState( '' );
    const [ ataque, setAtaque ] = useState( 0 );
    const [ defensa, setDefensa ] = useState( 0 );
    const [ error, setError ] = useState( false );

    //Importacion de dispatch
    const dispatch = useDispatch();
    const agregarPokemonRedux = (pokemon) => dispatch( crearNuevoPokemonAction(pokemon) );
    const editarPokemonRedux = (pokemon) => dispatch( editarPokemonAction(pokemon) );

    useEffect(() => {
        if( Object.keys(pokemonSelected).length > 0 ) {
            setNombre(pokemonSelected.nombre);
            setImageUrl(pokemonSelected.imageUrl);
            setAtaque(pokemonSelected.ataque);
            setDefensa(pokemonSelected.defensa);
        }
    }, [pokemonSelected]);

    const generarId = () => {
        const random = Math.random().toString(36).substr(2);
        const fecha = Date.now().toString(36);
        return random + fecha;
    }

    const enviar = () => {
        if([ nombre, imageUrl ].includes('') || [ ataque, defensa ].includes(0) ) {
            setError('Completa todos los campos');
            return;
        }else{
            setError(false);
            const objetoPokemon = { nombre, imageUrl, ataque, defensa };
            if(pokemonSelected._id) { //Editando registro
                objetoPokemon._id = pokemonSelected._id;
                //const pokemonsActualizados = pokemons.map( pokemon => pokemon._id === pokemonSelected._id ? objetoPokemon : pokemon );
                //setPokemons(pokemonsActualizados);
                editarPokemonRedux( objetoPokemon );
                setPokemonSelected({});
            } else { //Nuevo registro
                objetoPokemon._id = generarId();
                //setPokemons([ ...pokemons, objetoPokemon ]);
                agregarPokemonRedux( objetoPokemon );
            }

            reiniciarFormulario();
        }
    }

    const reiniciarFormulario = () => {
        setNombre('')
        setImageUrl('');
        setAtaque(0);
        setDefensa(0);
    }

    return (
        <div className="border p-4">
            <p className='text-center'> Nuevo Pokemon </p>

            <form>
                <div className="row">
                    <div className="col-md-6 col-sm-12">
                        Nombre: <input type="text" className="form-control" value={nombre} onChange={evt => setNombre(evt.target.value)}/>
                        Imagen: <input type="text" className="form-control" value={imageUrl} onChange={evt => setImageUrl(evt.target.value)}/>
                    </div>
                    <div className="col-md-6 col-sm-12">
                        Ataque: <input type="range" className="form-range" min="0" max="100" step="1" value={ataque} onChange={evt => setAtaque(evt.target.value)}/>
                        Defensa: <input type="range" className="form-range" min="0" max="100" step="1" value={defensa} onChange={evt => setDefensa(evt.target.value)}/>
                    </div>
                </div>
                <div className="mt-3 text-center">
                    { error && <Error mensaje={error}/> }
                    <button type="button" className="btn btn-primary mr-2" onClick={() => enviar()}> <FontAwesomeIcon icon={faFloppyDisk}/> Guardar </button>
                    <button type="button" className="btn btn-primary mr-2"> <FontAwesomeIcon icon={faXmark}/> Cancelar </button>
                </div>
            </form>
        </div>
    )
}

export default FormularioPokemon;