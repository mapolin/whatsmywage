import { GET_DATA, SUBMIT_DATA } from '../actions/const'

const initialState = {
  data: null
}

function reducer(state = initialState, action) {
  const nextState = Object.assign({}, state)

  switch (action.type) {
    case GET_DATA: {
      nextState.series = action.payload.map((item) => {
        return {
          key: item.key.toLowerCase(),
          value: parseInt(item.value.replace(',', ''))
        }
      })
      return nextState
    }
    case SUBMIT_DATA: {
      nextState.submission = action.payload
      return nextState
    }
    default: return nextState
  }
}

export default reducer
  