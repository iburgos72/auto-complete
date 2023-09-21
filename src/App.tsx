import React, { ReactNode, useEffect, useReducer } from 'react';

import { getPokedex } from "./api/requests";
import {
    AutoComplete,
    HighlightedText,
    TBody,
    THead,
} from "./components";
import {
    pokemonState,
    initialState,
    pokedex,
    search,
    filter,
    options,
} from './store'

import './App.css';

const App = () => {
    const [state, dispatch]= useReducer(pokemonState, initialState)
    const [showHighlight, setShowHighlight] = React.useState(false);
    const [isLoading, setIsLoading] = React.useState(false);

    useEffect(() => {
        (async () => {
            const response = await getPokedex();
            dispatch(pokedex(response.results));
        })();
    }, []);

    if(state.pokedex === null) {
        return <div>Loading...</div>
    }

    const onSelectedSuggestion = async(value: string) => {
        alert(`Redirect to /${value}`);
        setIsLoading(true);
        setShowHighlight(false);
        setIsLoading(false);
    }

    const onEnterKeyPress = async () => {
        setIsLoading(true);
        dispatch(options([]))
        const data = await filter()
        dispatch(data);
        setShowHighlight(true);
        setIsLoading(false);
    }

    const onChangeInput = (event: React.ChangeEvent<HTMLInputElement>) => {
        dispatch(search(event.target.value));
        setShowHighlight(false);
    }

    const buildTableData = () => {
        const data: ReactNode[][] = [];
        for(let i = 0; state.filteredPokedex && i < state.filteredPokedex.length; i++) {
            const { name } = state.filteredPokedex[i];
            data.push([
                <button onClick={() => onSelectedSuggestion(name)} className="button-pokemon">
                    {showHighlight
                        ? <HighlightedText str={name} highlightStr={state.search} />
                        : <span className="capitalize">{name}</span>
                    }
                </button>
            ]);
        }
        return data;
    }

    return (
        <div>
            <AutoComplete
                onChangeInput={onChangeInput}
                valueInput={state.search}
                options={state.options.map((option) => option.name)}
                onSelectSuggestion={onSelectedSuggestion}
                onEnterKeyPress={onEnterKeyPress}
            />
            {isLoading
                ? <div>Loading...</div>
                : (
                    <table>
                        <THead headers={["Pokemon"]} />
                        <TBody data={buildTableData()} />
                    </table>
                )
            }
        </div>
    );
}

export default App;
