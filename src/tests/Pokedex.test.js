import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../App';
import renderWithRouter from '../renderWithRouter';

describe('Teste o componente <Pokedex.js /> - Requisito 5', () => {
  test('Teste se a página contém um heading h2 com o texto Encountered Pokémon', () => {
    renderWithRouter(<App />);
    const head = screen.getByRole('heading', {
      level: 2,
      name: /Encountered Pokémon/i,
    });
    expect(head).toBeInTheDocument();
  });

  test('Teste se é exibido o próximo Pokémon da lista quando o botão Próximo Pokémon é clicado', () => {
    renderWithRouter(<App />);
    const next = screen.getByRole('button', { name: /Próximo/i });
    userEvent.click(next);
    const nextPokemon = screen.getByRole('img', {
      name: /Charmander sprite/i,
    });
    expect(nextPokemon.src).toBe('https://archives.bulbagarden.net/media/upload/0/0a/Spr_5b_004.png');
  });

  test('Teste se é mostrado apenas um Pokémon por vez', () => {
    renderWithRouter(<App />);
    const pikachu = screen.getByRole('img', {
      name: /pikachu sprite/i,
    });
    const charmander = screen.queryByText(/Charmander/i);
    expect(pikachu).toBeInTheDocument();
    expect(charmander).not.toBeInTheDocument();
  });

  test('Teste se a Pokédex tem os botões de filtro', () => {
    renderWithRouter(<App />);
    const buttonsType = screen.getAllByTestId('pokemon-type-button');
    expect(buttonsType.length).toBe(7);
    const pokemons = ['Electric', 'Fire', 'Bug', 'Poison', 'Psychic', 'Normal', 'Dragon'];
    buttonsType.forEach((type) => {
      expect(pokemons.includes(type.innerHTML)).toBeTruthy();
    });
    const allButton = screen.getByRole('button', { name: /all/i });
    expect(allButton).toBeInTheDocument();
  });

  test('Teste se a Pokédex circula somente pelos Pokémon daquele tipo', () => {
    renderWithRouter(<App />);
    const bugButton = screen.getByRole('button', { name: /Bug/i });
    userEvent.click(bugButton);
    const types = screen.getByTestId('pokemon-type');
    expect(types.innerHTML).toBe(bugButton.innerHTML);
    const next = screen.getByRole('button', { name: /Próximo/i });
    // userEvent.click(next);
    expect(next.disabled).toBeTruthy();
  });

  test('Teste se a Pokédex contém um botão para resetar o filtro', () => {
    renderWithRouter(<App />);

    const next = screen.getByRole('button', { name: /Próximo/i });
    userEvent.click(next);

    const allButton = screen.getByRole('button', {
      name: /all/i,
    });
    userEvent.click(allButton);

    const charmander = screen.queryByText(/Charmander/i);
    expect(charmander).not.toBeInTheDocument();
  });
});
