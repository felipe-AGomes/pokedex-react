import React from 'react';

type Prop = {
	search: (event: React.FormEvent<HTMLFormElement>) => void;
};

function Search({search}: Prop) {
	return (
		<div className='search-box'>
			<form onSubmit={event => {
				search(event);
			}} >
				<input name='pokemon' type='text' placeholder='Pokemon Name' />
			</form>
		</div>
	);
}

export default Search;
