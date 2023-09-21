import { Pokemon } from "../api/models";

export const getOptions = (pokedex: Pokemon[], search: string, limit: number = 0): Pokemon[] => {
    const options: Pokemon[] = [];
    for(let i = 0; i < pokedex.length; i++) {
        if(pokedex[i].name.toLowerCase().indexOf(search.toLowerCase()) !== -1) {
            options.push(pokedex[i]);
        }

        if(options.length === limit && limit !== 0) {
            break;
        }
    }

    return options;
}

