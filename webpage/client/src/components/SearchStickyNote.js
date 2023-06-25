import React from 'react';
import SearchIcon from '@mui/icons-material/Search';
import {IconButton} from "@mui/material";

const Search = ({ handleSearchNote }) => {
	return (
		<div className='SearchStickyNote'>
			<IconButton className='search-icons' size='1.3em' >
			  <SearchIcon />
			  </IconButton>
			<input
				onChange={(event) =>
					handleSearchNote(event.target.value)
				}
				type='text'
				placeholder='Type to search...'
			/>
		</div>
	);
};

export default Search;