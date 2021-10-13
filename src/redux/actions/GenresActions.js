import axios from 'axios';
import {Alert} from 'react-native';
import API from '../../services/APIs';
export const getgenres = () => {
  return async dispatch => {
    dispatch({type: 'GET_GENRES'});
    axios
      .get(API + '/genre/movie/list', {
        params: {
          api_key: '4f298a53e552283bee957836a529baec',
          language: 'en-US',
        },
      })
      .then(response => {
        dispatch({type: 'GET_GENRES_SUCCESS', data: response.data});
      })
      .catch(err => {
        Alert.alert('no internet connections');
      });
  };
};
