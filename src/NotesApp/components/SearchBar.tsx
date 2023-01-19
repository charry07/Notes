import SearchIcon from '@mui/icons-material/Search';
import { IconButton, InputAdornment, TextField } from '@mui/material';
import { useState } from 'react';

export const SearchBar = ({ inputSearch }: any) => {
  const [onChange, setOnChange] = useState('');

  return (
    <>
      <TextField
        // label='Buscar...'
        fullWidth
        size="small"
        sx={{ mx: { md: 5 }}}
        placeholder='Buscar...'
        // variant='filled'
        onChange={({ target }) => setOnChange(target.value)}
        onKeyPress={({ key }) => key === 'Enter' && inputSearch(onChange)}
        InputProps={{
          startAdornment: (
            <InputAdornment position='start'>
              <IconButton onClick={() => inputSearch(onChange)}>
                <SearchIcon />
              </IconButton>
            </InputAdornment>
          ),
        }}
      />
    </>
  );
};
