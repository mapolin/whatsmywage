import config from '../config'

function action () {
  return dispatch => {
    return fetch(`${config.API}/data/wages/base`, {
        mode: 'cors'
      })
      .then(result => result.json)
      .then(json => {
        dispatch({
          type: 'GET_DATA',
          payload: json
        })
      })
    }
}

export default action
