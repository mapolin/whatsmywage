import config from '../config'
import { GET_DATA } from './const'

function action () {
  return dispatch => {
    return fetch(`${config.API}/data/wages/base`, {
        mode: 'cors'
      })
      .then(result => result.json())
      .then(data => {
        dispatch({
          type: GET_DATA,
          payload: data
        })
      })
    }
}

export default action
