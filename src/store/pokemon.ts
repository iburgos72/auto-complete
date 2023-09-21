import { Pokemon } from "../api"

const MAX_NUMBER_OF_OPTIONS = 5;

enum ActionType {
  POKEDEX = "POKEDEX",
  SEARCH = "SEARCH",
}

interface Pokedex {
  type: ActionType.POKEDEX;
  payload: Pokemon[];
}

interface Search {
  type: ActionType.SEARCH;
  payload: string;
}

type StateAction = Pokedex | Search;

type State = {
  pokedex: Pokemon[] | null,
  search: string,
  options: string[],
  filteredPokedex: Pokemon[],
}

export const initialState: State = {
  pokedex: null,
  search: "",
  options: [],
  filteredPokedex: [],
};

export const pokemonState = (state: State = initialState, action: StateAction) => {
  switch (action.type) {
    case ActionType.POKEDEX:
      return { ...state, pokedex: action.payload };
    case ActionType.SEARCH:
      return {
        ...state,
        search: action.payload,
        options: getOptions(state.pokedex!, action.payload),
      };
    default:
      return state;
  }
};

export const pokedex = (pokedex: Pokemon[]): Pokedex => ({ type: ActionType.POKEDEX, payload: pokedex });
export const search = (search: string): Search => ({ type: ActionType.SEARCH, payload: search });

const getOptions = (pokedex: Pokemon[], search: string): string[] => {
  const options: string[] = [];
  for(let i = 0; i < pokedex.length; i++) {
    if(pokedex[i].name.indexOf(search) !== -1) {
      options.push(pokedex[i].name);
    }

    if(options.length === MAX_NUMBER_OF_OPTIONS) {
      break;
    }
  }

  return options;
}

