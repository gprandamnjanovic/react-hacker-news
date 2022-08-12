import React, { useContext, useEffect, useReducer } from 'react';

import {
  SET_LOADING,
  SET_STORIES,
  REMOVE_STORY,
  HANDLE_PAGE,
  HANDLE_SEARCH,
} from './actions';
import reducer from './reducer';

const API_ENDPOINT = 'https://hn.algolia.com/api/v1/search?';

const initialState = {
  loading: true,
  hits: [],
  query: 'react',
  page: 0,
  nbPages: 0,
};

const AppContext = React.createContext();

const AppProvider = ({ children }) => {
  const [state, dispach] = useReducer(reducer, initialState);
  //fetchStories
  const fetchStories = async (url) => {
    dispach({ type: SET_LOADING });
    try {
      const response = await fetch(url);
      const data = await response.json();
      // console.log(data);
      dispach({
        type: SET_STORIES,
        payload: { hits: data.hits, nbPages: data.nbPages },
      });
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    fetchStories(`${API_ENDPOINT}query=${state.query}&page=${state.page}`);
  }, [state.query, state.page]);
  //remove story
  const removeStory = (id) => {
    // console.log(id);
    dispach({ type: REMOVE_STORY, payload: id });
  };
  //search form
  const handleSearch = (query) => {
    dispach({ type: HANDLE_SEARCH, payload: query });
  };
  //change Page
  const handlePage = (value) => {
    console.log(value);
    //dispach
    dispach({ type: HANDLE_PAGE, payload: value });
  };
  return (
    <AppContext.Provider
      value={{ ...state, handleSearch, removeStory, handlePage }}
    >
      {children}
    </AppContext.Provider>
  );
};
// make sure use
export const useGlobalContext = () => {
  return useContext(AppContext);
};

export { AppContext, AppProvider };
