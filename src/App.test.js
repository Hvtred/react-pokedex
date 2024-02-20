import { render, screen, within } from '@testing-library/react';
import App from './App';
import {act} from "react-dom/test-utils";

test("render pokemon details", async () => {
    render(<App />);
    const $link = screen.getByRole("link", { name: /Tous les Pokémons/i });
    act(() => {
        $link.click();
    });
    const $card = await screen.findByRole("link", { name: /bulbasaur bulbasaur Puissance: 64 Type: grass, poison/i });
    $card.click();

    expect(await screen.findByRole("heading", { level: 2, name: /Détails du Pokémon : bulbasaur/ })).toBeInTheDocument();
});