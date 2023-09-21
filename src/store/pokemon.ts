import { Pokemon } from "../api/models"
import { getOptions } from "./pokemon.utils";

const MAX_NUMBER_OF_OPTIONS = 5;

// ACTIONS
enum ActionType {
  POKEDEX = "POKEDEX",
  SEARCH = "SEARCH",
  FILTER = "FILTER",
  OPTIONS = "OPTIONS",
}

// INTERFACES
interface Pokedex {
  type: ActionType.POKEDEX;
  payload: Pokemon[];
}

interface Search {
  type: ActionType.SEARCH;
  payload: string;
}

interface Options {
  type: ActionType.OPTIONS;
  payload: Pokemon[];
}

interface Filter {
    type: ActionType.FILTER;
}

type StateAction = Pokedex | Search | Filter | Options;

// STATE
type State = {
  pokedex: Pokemon[] | null,
  search: string,
  options: Pokemon[],
  filteredPokedex: Pokemon[] | null,
}

export const initialState: State = {
  pokedex: null,
  search: "",
  options: [],
  filteredPokedex: null,
};

export const pokemonState = (state: State = initialState, action: StateAction) => {
  switch (action.type) {
    case ActionType.POKEDEX:
      return {
        ...state,
        pokedex: action.payload,
        filteredPokedex: action.payload,
      };
    case ActionType.SEARCH:
      return {
        ...state,
        search: action.payload,
        options: getOptions(state.pokedex!, action.payload, MAX_NUMBER_OF_OPTIONS),
      };
    case ActionType.OPTIONS:
      return {
        ...state,
        options: action.payload,
      }
    case ActionType.FILTER:
      return {
        ...state,
        filteredPokedex: getOptions(state.pokedex!, state.search)
      };
    default:
      return state;
  }
};

// ACTION CREATORS
export const pokedex = (pokedex: Pokemon[]): Pokedex => ({ type: ActionType.POKEDEX, payload: pokedex });
export const search = (search: string): Search => ({ type: ActionType.SEARCH, payload: search });
export const options = (options: Pokemon[]): Options => ({ type: ActionType.OPTIONS, payload: options });
export const filter = (): Promise<Filter> => new Promise((resolve) => {
  setTimeout(() => {
    resolve({ type: ActionType.FILTER });
  }, 300);
});

