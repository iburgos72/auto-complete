import React, {useEffect, useReducer} from 'react';

import { getPokedex } from "./api/requests/pokemon";
import { pokemonState, initialState, pokedex, search } from './store'

import './App.css';
import { AutoComplete } from "./components";

const App = () => {
    const [state, dispatch]= useReducer(pokemonState, initialState)

    useEffect(() => {
        (async () => {
            const response = await getPokedex();
            dispatch(pokedex(response.results));
        })();
    }, []);

    if(state.pokedex === null) {
        return <div>Loading...</div>
    }

    return (
        <div className="App">
            <AutoComplete
                onChange={(event: React.ChangeEvent<HTMLInputElement>) => dispatch(search(event.target.value))}
                value={state.search}
                options={state.options}
            />
            <table>
                <thead>
                <tr>
                    {["name"].map((column, index) => (
                        <th key={index}>{column}</th>
                    ))}
                </tr>
                </thead>
                <tbody>
                {state.pokedex.map((row, rowIndex) => (
                    <tr key={rowIndex}>
                        <td>{row.name}</td>
                    </tr>
                ))}
                </tbody>
            </table>
        </div>
    );
}

export default App;
