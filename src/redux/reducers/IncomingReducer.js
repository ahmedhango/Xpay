const INITIAL_STATE = {
  data: [],
  error: null,
  loading: false,
  test: false,
};
export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case 'GET_INCOMING':
      return {
        ...state,
        loading: true,
        error: null,
        test: false,
      };

    case 'GET_INCOMING_SUCCESS':
      return {
        ...INITIAL_STATE,
        loading: false,
        data: action.data,
        test: true,
      };
    case 'GET_INCOMING_FAILURE':
      return {
        ...INITIAL_STATE,
        error: action.error,
      };
    default:
      return state;
  }
};
