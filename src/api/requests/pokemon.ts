import { POKEDEX_API, fetchData } from "../";
import { PaginatedResponse, Pokemon } from "../models";

export const getPokedex = () =>
    fetchData<PaginatedResponse<Pokemon>>(POKEDEX_API);