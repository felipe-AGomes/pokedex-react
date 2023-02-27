import React from 'react';
import {type PokemonApiResponse} from '../Pokedex';

type Prop = {
	data: PokemonApiResponse;
	index: number;
	click: (index: number) => void;
};

function Pokemon({data, index, click}: Prop) {
	return (
		<div className='pokemon' onClick={() => {
			click(index);
		}}>
			<img
				src={data.sprites.front_shiny}
				alt={data.name}
			/>
			<h1>{data.name.charAt(0).toUpperCase() + data.name.slice(1)}</h1>
		</div>
	);
}

export default Pokemon;
