import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { BsChevronLeft, BsChevronRight } from 'react-icons/bs';

interface Pokemon {
    name: string;
    sprites: {
        front_default: string;
    };
}

const Search = () => {
    document.title = "Pokédex - Recherche";

    const location = useLocation();
    const searchParams = new URLSearchParams(location.search);
    const searchQuery = searchParams.get('q');
    const [searchResults, setSearchResults] = useState<Pokemon[]>([]);
    const [loading, setLoading] = useState(true);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);

    const fetchPokemonDetails = async (url: string) => {
        try {
            const response = await fetch(url);
            const data: Pokemon = await response.json();
            return data;
        } catch (error) {
            console.error('Error fetching Pokémon details:', error);
            return null;
        }
    };

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch(`https://pokeapi.co/api/v2/pokemon?limit=1308`);
                const data = await response.json();

                const promises = data.results.map(async (pokemon: { name: string, url: string }) => {
                    const details = await fetchPokemonDetails(pokemon.url);
                    if (details) {
                        return {
                            name: pokemon.name,
                            sprites: details.sprites,
                        };
                    }
                    return null;
                });

                const results = await Promise.all(promises);

                const filteredResults = results.filter((pokemon) =>
                    pokemon.name.toLowerCase().includes(searchQuery?.toLowerCase() || '')
                );

                const itemsPerPage = 20;
                const totalPages = Math.ceil(filteredResults.length / itemsPerPage);

                setTotalPages(totalPages);

                const startIndex = (currentPage - 1) * itemsPerPage;
                const endIndex = startIndex + itemsPerPage;

                setSearchResults(filteredResults.slice(startIndex, endIndex));
                setLoading(false);
            } catch (error) {
                console.error('Error fetching data:', error);
                setLoading(false);
            }
        };

        if (searchQuery) {
            fetchData();
        } else {
            setSearchResults([]);
            setLoading(false);
        }
    }, [searchQuery, currentPage]);

    return (
        <div className="container mx-auto p-8 text-center">
            <h1 className="text-2xl text-center font-bold mb-4">Résultats de la recherche pour : "{searchQuery}"</h1>

            {loading ? (
                <p>Recherche en cours...</p>
            ) : (
                <div>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                        {searchResults.map((pokemon) => (
                            <Link to={`/pokemon/${pokemon.name}`} key={pokemon.name} className="text-black">
                                <div className="bg-white rounded-lg p-4 shadow-md transform transition duration-500 hover:scale-90">
                                    {pokemon.sprites && pokemon.sprites.front_default && (
                                        <img src={pokemon.sprites.front_default} alt={pokemon.name} className="mx-auto w-32 mb-4" />
                                    )}
                                    <p className="text-xl font-bold">{pokemon.name}</p>
                                </div>
                            </Link>
                        ))}
                    </div>

                    <div className="flex justify-center items-center mb-2 mt-10">
                        <button className={`px-3 py-1 border rounded-lg ${currentPage === 1 ? 'bg-gray-300 cursor-not-allowed' : 'bg-red-500 hover:bg-red-700 text-white'} mr-2`} onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))} disabled={currentPage === 1}>
                            <BsChevronLeft />
                        </button>
                        <p className="text-sm font-bold mx-4">Page {currentPage} sur {totalPages}</p>
                        <button className={`px-3 py-1 border rounded-lg ${currentPage === totalPages ? 'bg-gray-300 cursor-not-allowed' : 'bg-red-500 hover:bg-red-700 text-white'}`} onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))} disabled={currentPage === totalPages}>
                            <BsChevronRight />
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Search;