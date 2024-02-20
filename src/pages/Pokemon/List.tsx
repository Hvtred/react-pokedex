import React, {useState} from 'react';
import { BsChevronLeft, BsChevronRight } from 'react-icons/bs';
import { Link } from 'react-router-dom';
import { useFetchPokemons, Pokemon, PokemonType } from '../../services/Hook';

const List = () => {
    document.title = "Pokédex - Liste des Pokémons";
    const [numberOfPokemons, setNumberOfPokemons] = useState(20);
    const [currentPage, setCurrentPage] = useState(1);

    const { pokemons, loading } = useFetchPokemons(numberOfPokemons, currentPage);

    const totalPages = Math.ceil(1302 / numberOfPokemons);

    return (
        <div className="container mx-auto p-8 text-center">
            <div className="flex justify-between items-center">
                <label className="block mb-4 text-sm font-bold">
                    Nombre de Pokémons à afficher par page :
                    <select className="border bg-red-500 text-white p-2 ml-2" value={numberOfPokemons} onChange={(e) => {setNumberOfPokemons(Number(e.target.value)); setCurrentPage(1);}}>
                        <option value={10}>10</option>
                        <option value={20}>20</option>
                        <option value={50}>50</option>
                        <option value={100}>100</option>
                    </select>
                </label>

                <div className="flex justify-center items-center mb-2">
                    <button className={`px-3 py-1 rounded-lg ${currentPage === 1 ? 'bg-gray-300 cursor-not-allowed' : 'bg-red-500 hover:bg-red-700 text-white'} mr-2`} onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))} disabled={currentPage === 1}>
                        <BsChevronLeft />
                    </button>
                    <p className="text-sm font-bold mx-4">Page {currentPage} sur {totalPages}</p>
                    <button className={`px-3 py-1 rounded-lg ${currentPage === totalPages ? 'bg-gray-300 cursor-not-allowed' : 'bg-red-500 hover:bg-red-700 text-white'}`} onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))} disabled={currentPage === totalPages}>
                        <BsChevronRight />
                    </button>
                </div>
            </div>

            {loading ? (
                <p className="text-center text-xl font-bold">Chargement en cours...</p>
            ) : (
                <div className=" grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                    {pokemons.map((pokemon: Pokemon) => (
                        <Link to={`/pokemon/${pokemon.id}`} key={pokemon.name}>
                            <div className="pokemon-thumbnail border rounded-lg p-4 shadow-md transform transition duration-500 hover:scale-90">
                                <img src={pokemon.sprites.front_default} alt={pokemon.name} className="mx-auto w-32 mb-4"/>
                                <h3 className="text-xl font-bold">{pokemon.name}</h3>
                                <p className="mb-2">Puissance: {pokemon.base_experience}</p>
                                <p>Type: {pokemon.types.map((type: PokemonType) => type.type.name).join(', ')}</p>
                            </div>
                        </Link>
                    ))}
                </div>
            )}
        </div>
    );
};

export default List;