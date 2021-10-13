import axios from 'axios';
import {Alert} from 'react-native';
import API from '../../services/APIs';
export const getcredits = movie_id => {
  try {
    return async dispatch => {
      dispatch({type: 'GET_CREDITS'});
      axios
        .get(API + 'movie/' + movie_id + '/credits', {
          params: {
            api_key: '4f298a53e552283bee957836a529baec',
          },
        })
        .then(response => {
          dispatch({type: 'GET_CREDITS_SUCCESS', data: response.data});
        })
        .catch(err => {
          Alert.alert('no internet connections');
        });
    };
  } catch (e) {}
};
