import { Pagination } from '@mui/material';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { pokemonApi } from '../../api/Pokemon';
import { setPokemons, startLoadingPokemons } from '../../store/slices/pokemonSlice';
import { Loader } from '../components';
import { NotesLayout } from '../layout/NotesLayout';

export const PokemonPage = () => {
  const { page, isLoading, pokemons = [] } = useSelector((state: any) => state.pokemon);
  const dispatch = useDispatch();
  const [count, setCount] = useState(0);

  useEffect(() => {
    dispatch(startLoadingPokemons());
    pokemonApi.get(`/pokemon?limit=20&offset=${page * 10}`).then(({ data }) => {
      dispatch(setPokemons({ pokemons: data.results, page: page }));
      setCount(data.count);
    });
  }, [page]);


  return (
    <NotesLayout>
      {isLoading && <Loader />}
      {pokemons?.map((pokemon: any, i: number) => {
        return <div key={i}>{pokemon.name}</div>;
      })}
      <Pagination
        style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '5%' }}
        count={Math.round(count / 20)}
        variant='outlined'
        shape='rounded'
        color='primary'
        page={page}
        onChange={(_e, page) => dispatch(setPokemons({ pokemons: pokemons, page: page }))}
      />
    </NotesLayout>
  );
};
