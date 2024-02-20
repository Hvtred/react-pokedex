import React from 'react';

const Error = () => {
    document.title = "Pokedex - 404";

    return (
        <div className="text-center mt-8">
            <h1 className="text-4xl font-bold">404 - Page non trouvée</h1>
            <p className="text-lg mt-4">La page demandée n'existe pas.</p>
        </div>
    );
};

export default Error;