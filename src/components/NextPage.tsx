import React from 'react';
import {type Button} from '../Pokedex';

type Prop = {
	click: (button: Button) => void;
};

function NextPage({click}: Prop) {
	return (
		<div className='next-page-box'>
			<span>
				<button onClick={() => {
					click('prev');
				}}>Previus</button>
			</span>
			<span>
				<button onClick={() => {
					click('next');
				}}>Next</button>
			</span>
		</div>
	);
}

export default NextPage;
