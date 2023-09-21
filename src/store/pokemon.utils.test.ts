import { Pokemon } from "../api/models";
import { getOptions } from './pokemon.utils';

// Sample data for testing
const pokedex: Pokemon[] = [
    { name: 'Pikachu', url: 'https://example.com/pikachu' },
    { name: 'Charmander', url: 'https://example.com/charmander' },
    { name: 'Bulbasaur', url: 'https://example.com/bulbasaur' },
    { name: 'Squirtle', url: 'https://example.com/squirtle' },
];

describe('getOptions', () => {
    it('should return an empty array when no matches are found', () => {
        const result = getOptions(pokedex, 'MissingPokemon');
        expect(result).toEqual([]);
    });

    it('should return options matching the search string', () => {
        const result = getOptions(pokedex, 'Char');
        expect(result).toEqual([{ name: 'Charmander', url: 'https://example.com/charmander' }]);
    });

    it('should be case-insensitive', () => {
        const result = getOptions(pokedex, 'squirtle');
        expect(result).toEqual([{ name: 'Squirtle', url: 'https://example.com/squirtle' }]);
    });

    it('should limit the number of options', () => {
        const result = getOptions(pokedex, 'a', 2);
        expect(result).toEqual([
            { name: 'Pikachu', url: 'https://example.com/pikachu' },
            { name: 'Charmander', url: 'https://example.com/charmander' },
        ]);
    });

    it('should return all options when limit is 0', () => {
        const result = getOptions(pokedex, '', 0);
        expect(result).toEqual(pokedex);
    });
});