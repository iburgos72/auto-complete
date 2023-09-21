import {
    POKEDEX_API,
    PaginatedResponse,
    Pokemon,
    fetchData,
} from "../";

export const getPokedex = () =>
    fetchData<PaginatedResponse<Pokemon>>(POKEDEX_API);