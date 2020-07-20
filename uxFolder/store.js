import {createStore} from 'redux'

import reducer from './reducer.js'
import {addWaypoint} from './actions.js'

const store = createStore(reducer)



export default store
