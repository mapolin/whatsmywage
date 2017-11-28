import config from '../config'
import { SUBMIT_DATA } from './const'

function action (data) {
  return dispatch => {
    return fetch(`${config.API}/data/add`, {
        mode: 'cors',
        method: 'POST',
        body: JSON.stringify(data),
        headers: {
          'content-type': 'application/json'
        }
      })
      .then(result => result.json())
      .then(data => {
        dispatch({
          type: SUBMIT_DATA,
          payload: data
        })
      })
    }
}

export default action
