import React from 'react';
import {type PokemonApiResponse, type Modal} from '../Pokedex';

type Prop = {
	modal: {active: Modal; data?: PokemonApiResponse};
	click: (event: React.MouseEvent<HTMLButtonElement>) => void;
};

function PokemonModal({modal, click}: Prop) {
	const {active, data} = modal;

	return (
		<div className={`modal${active === 'active' ? ' active' : ''}`}>
			<div className='header'>Status</div>
			<div className='boxStatus'>
				<div className='image'>
					<img
						src={data?.sprites.front_default}
						alt={data?.name}
					/>
					<h1>{data?.name}</h1>
				</div>
				<div className='description'>
					<p>Name: {data?.name}</p>
					<p>Weight: {data?.weight} Kg</p>
					<div className='list'>
						<p className='title'>Abilities: </p>
						<ul>
							{data?.abilities.map(e => <li key={e.ability.name}>{e.ability.name}</li>)}
						</ul>
					</div>
					<div className='list'>
						<p className='title'>Type:</p>
						<ul>
							{data?.types.map(e => <li key={e.type.name}>{e.type.name}</li>)}
						</ul>
					</div>
				</div>
				<button className='button' onClick={event => {
					click(event);
				}}>
					<span></span>
					<span></span>
					<span></span>
				</button>
			</div>
		</div>
	);
}

export default PokemonModal;
