import { combineReducers } from 'redux'

import IncomingReducer from './IncomingReducer'
import PopularReducer from './PopularReducer'
import TopRatedReducer from './TopRatedReducer'
import GenresReducer from './GenresReducer'
import CreditsReducer from './CreditsReducer'



export default combineReducers({
   IncomingReducer: IncomingReducer,
   PopularReducer:PopularReducer,
   TopRatedReducer:TopRatedReducer,
   GenresReducer:GenresReducer,
   CreditsReducer:CreditsReducer
})