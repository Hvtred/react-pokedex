import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

interface PokemonAbility {
    ability: {
        name: string;
    };
}

interface PokemonType {
    type: {
        name: string;
    };
}

interface PokemonStat {
    base_stat: number;
    stat: {
        name: string;
    };
}

interface Pokemon {
    name: string;
    sprites: {
        front_default: string;
    };
    height: number;
    weight: number;
    types: PokemonType[];
    base_experience: number;
    abilities: PokemonAbility[];
    stats: PokemonStat[];
}

const Detail = () => {
    document.title = "Pokédex - Détails du Pokémon";

    const [pokemon, setPokemon] = useState<Pokemon | null>(null);
    const { id } = useParams();

    useEffect(() => {
        const fetchPokemonData = async () => {
            try {
                const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}`);
    const data: Pokemon = await response.json();
setPokemon(data);
document.title = "Pokedex - " + data.name;
} catch (error) {
    console.error("Error fetching Pokemon data:", error);
}
};

fetchPokemonData();
}, [id]);

return (
    <div>
        {pokemon && (
            <div className="border p-4 mt-4">
                <h2 className="text-xl text-center font-bold mt-4">Détails du Pokémon : {pokemon.name}</h2>

                <div className="flex justify-center">
                    <img src={pokemon.sprites.front_default} alt={pokemon.name} className="w-80 h-auto"/>
                </div>

                <div className="flex items-center justify-between">
                    <div className="w-1/2 pl-4">
                        <p className="mb-2">Taille : {pokemon.height} dm</p>
                        <p className="mb-2">Poids : {pokemon.weight} hectograms</p>
                        <p className="mb-2">Type(s) : {pokemon.types.map(type => type.type.name).join(', ')}</p>
                        <p className="mb-2">Expérience de base: {pokemon.base_experience}</p>
                        <p className="mb-2">Capacités
                            : {pokemon.abilities.map(ability => ability.ability.name).join(', ')}</p>
                    </div>

                    <div className="w-1/2 pl-4">
                        <ul>
                            {pokemon.stats.map(stat => (
                                <li className="mb-2" key={stat.stat.name}>{stat.stat.name} : {stat.base_stat}</li>
                            ))}
                        </ul>
                    </div>
                </div>
            </div>
        )}
    </div>
);
};

export default Detail;