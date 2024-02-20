import { useState, useEffect } from 'react';

export interface PokemonType {
    type: {
        name: string;
    };
}

export interface Pokemon {
    name: string;
    url: string;
    id: number;
    sprites: {
        front_default: string;
    };
    base_experience: number;
    types: PokemonType[];
}

export function useFetchPokemons(numberOfPokemons: number, currentPage: number) {
    const [pokemons, setPokemons] = useState<Pokemon[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchPokemons = async () => {
            try {
                setLoading(true);
                const response = await fetch(`https://pokeapi.co/api/v2/pokemon?limit=${numberOfPokemons}&offset=${(currentPage - 1) * numberOfPokemons}`);
                const data = await response.json();

                const detailedPokemons = await Promise.all(
                    data.results.map(async (pokemon: Pokemon) => {
                        const detailedResponse = await fetch(pokemon.url);
                        const detailedData = await detailedResponse.json();
                        return detailedData;
                    })
                );

                setPokemons(detailedPokemons);
            } catch (error) {
                console.error('Error fetching Pokémon data:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchPokemons();
    }, [numberOfPokemons, currentPage]);

    return {pokemons, loading};
}