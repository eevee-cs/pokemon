import { createStore } from 'redux';
import pokemonReducer from './reducers/pokemonReducer';

const store = createStore(pokemonReducer);

export default store;
