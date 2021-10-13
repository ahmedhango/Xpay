const INITIAL_STATE = {
  data: [],
  error: null,
  loading: false,
};
export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case 'GET_GENRES':
      return {
        ...state,
        loading: true,
        error: null,
        test: false,
      };

    case 'GET_GENRES_SUCCESS':
      return {
        ...INITIAL_STATE,
        loading: false,
        data: action.data,
        test: true,
      };
    case 'GET_GENRES_FAILURE':
      return {
        ...INITIAL_STATE,
        error: action.error,
      };
    default:
      return state;
  }
};
