import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

interface Generation {
    id: number;
    name: string;
}

const GenList = () => {
    document.title = "Pokédex - Générations";

    const [generations, setGenerations] = useState<Generation[]>([]);

    useEffect(() => {
        fetch('https://pokeapi.co/api/v2/generation/')
            .then(response => response.json())
            .then(data => {
                const generationList: Generation[] = data.results.map((generation: { name: string }, index: number) => ({
                    id: index + 1,
                    name: generation.name,
                }));

                setGenerations(generationList);
            })
            .catch(error => console.error('Erreur lors de la récupération des générations', error));
    }, []);

    return (
        <>
            <div className="flex flex-col items-center justify-center">
                <h1 className="text-2xl font-bold mb-6">Liste des générations</h1>

                {generations.map(generation => (
                    <div key={generation.id} className="mb-4">
                        <Link to={`/generation/${generation.id}`}>
                            <button className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded w-64">
                                {generation.name}
                            </button>
                        </Link>
                    </div>
                ))}
            </div>
        </>
    );
}

export default GenList;