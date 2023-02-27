/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable no-await-in-loop */
import React from 'react';
import Pokemon from './components/Pokemon';
import PokemonModal from './components/PokemonModal';
import Search from './components/Search';
import NextPage from './components/NextPage';
import {useState, useEffect} from 'react';

export type Ability = {
	ability: {
		name: string;
		url: string;
	};
};

export type Type = {
	type: {
		name: string;
		utl: string;
	};
};

export type PokemonApiResponse = {
	sprites: {
		front_default: string;
		front_shiny: string;
	};
	name: string;
	weight: number;
	abilities: Ability[];
	types: Type[];
};

export type Button = 'next' | 'prev';

export type Modal = 'active' | '';

function Pokedex(): JSX.Element {
	const [arrayPokemons, setArrayPokemons] = useState<PokemonApiResponse[]>([]);
	const [pokemonDisplayed, setPokemonDisplayed] = useState<number>(0);
	const [modal, setModal] = useState<{active: Modal; data?: PokemonApiResponse}>({active: ''});

	async function fetchPokemon(index = 1): Promise<void> {
		const pokemonData: PokemonApiResponse[] = [];
		const pokemonsToSearch = index + 100;
		for (index; index < pokemonsToSearch; index++) {
			const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${index}`);
			const data: PokemonApiResponse = await response.json();
			pokemonData.push(data);
		}

		setPokemonDisplayed(pokemonsToSearch);
		setArrayPokemons([...pokemonData]);
	}

	useEffect(() => {
		fetchPokemon()
			.catch(error => {
				console.log(error);
			});
	}, []);

	function openModal(index: number): void {
		setModal({active: 'active', data: arrayPokemons[index]});
	}

	function closeModal(): void {
		setModal({active: ''});
	}

	async function searchPokemon(event: React.FormEvent<HTMLFormElement>): Promise<void> {
		event.preventDefault();
		const form = event.target as HTMLFormElement;
		const formData = new FormData(form);
		const pokemonName = formData.get('pokemon');

		if (pokemonName === '') {
			await fetchPokemon();
			return;
		}

		fetch(`https://pokeapi.co/api/v2/pokemon/${typeof pokemonName === 'string' ? pokemonName.toLowerCase() : ''}`)
			.then(async response => response.json())
			.then(response => {
				setArrayPokemons([response]);
			})
			.catch(error => {
				console.log(error);
			});
	}

	async function nexPage(button: Button): Promise<void> {
		if (button === 'next') {
			try {
				await fetchPokemon(pokemonDisplayed);
				return;
			} catch {
				throw new Error('Error to fetch a data');
			}
		}

		await fetchPokemon(pokemonDisplayed - 200);
	}

	return (
		<div className='pokedex'>
			<Search search={searchPokemon} />
			{arrayPokemons.map((_, i) => <Pokemon
				click={openModal}
				index={i}
				key={arrayPokemons[i].name}
				data={arrayPokemons[i]} />)}
			<NextPage click={(button: Button) => {
				nexPage(button)
					.catch(error => {
						console.log(error);
					});
			}} />
			<PokemonModal modal={modal} click={() => {
				closeModal();
			}} />
		</div>
	);
}

export default Pokedex;
