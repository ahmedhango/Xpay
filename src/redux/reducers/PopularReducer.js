const INITIAL_STATE = {
  data: [],
  error: null,
  loading: false,
  test: false,
};
export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case 'GET_POPULAR':
      return {
        ...state,
        loading: true,
        error: null,
        test: false,
      };

    case 'GET_POPULAR_SUCCESS':
      return {
        ...INITIAL_STATE,
        loading: false,
        data: action.data,
        test: true,
      };
    case 'GET_POPULAR_FAILURE':
      return {
        ...INITIAL_STATE,
        error: action.error,
      };
    default:
      return state;
  }
};
