import axios from 'axios';
import {Alert} from 'react-native';
import API from '../../services/APIs';
var oldData = [];
export const getincoming = () => {
  return async dispatch => {
    dispatch({type: 'GET_INCOMING'});
    axios
      .get(API + 'movie/upcoming', {
        params: {
          api_key: '4f298a53e552283bee957836a529baec',
        },
      })
      .then(response => {
        dispatch({type: 'GET_INCOMING_SUCCESS', data: response.data});
      })
      .catch(err => {
        Alert.alert('no internet connections');
      });
  };
};
