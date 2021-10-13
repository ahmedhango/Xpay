import axios from 'axios';
import {Alert} from 'react-native';
import API from '../../services/APIs';
export const getpopular = () => {
  return async dispatch => {
    dispatch({type: 'GET_POPULAR'});
    axios
      .get(API + 'movie/popular', {
        params: {
          api_key: '4f298a53e552283bee957836a529baec',
        },
      })
      .then(response => {
        dispatch({type: 'GET_POPULAR_SUCCESS', data: response.data});
      })
      .catch(err => {
        Alert.alert('no internet connections');
      });
  };
};
