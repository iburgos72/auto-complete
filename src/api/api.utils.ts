export const fetchData = <T>(url: string, options: RequestInit = {}): Promise<T> => {
    return fetch(url, options)
        .then(response => {
            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }
            return response.json();
        })
        .catch(error => {
            console.error('Fetch error:', error);
        });
}

export const POKEDEX_API: string = "https://pokeapi.co/api/v2/pokemon?limit=1000";