import axios from 'axios';
import {Alert} from 'react-native';
import API from '../../services/APIs';
export const getToprated = () => {
  return async dispatch => {
    dispatch({type: 'GET_TOPRATED'});
    axios
      .get(API + 'movie/top_rated', {
        params: {
          api_key: '4f298a53e552283bee957836a529baec',
        },
      })
      .then(response => {
        dispatch({type: 'GET_TOPRATED_SUCCESS', data: response.data});
      })
      .catch(err => {
        Alert.alert('no internet connections');
      });
  };
};
