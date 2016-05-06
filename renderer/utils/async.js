/**
 * Utilities for making async request with Redux pattern
 * Async methods will be generally call from actions
 * The Flow method will be call from reducers
 */


/**
 * Constants describing async flow
 */
const REQUEST = 'REQUEST'
const SUCCESS = 'SUCCESS'
const FAILURE = 'FAILURE'


/**
 * TODO: explaning...
 *
 *
 * @param {String} Name of the desired action
 * @param {String}
 * @return {String} A new string with proper type
 */
export function flow (action, type) {
  switch (type) {
    case REQUEST:
      return action.concat(`_${REQUEST}`)
    case SUCCESS:
      return action.concat(`_${SUCCESS}`)
    case FAILURE:
      return action.concat(`_${FAILURE}`)
    default:
      return type
  }
}


export function asyncRequest (action) {
  return {type: flow(action, REQUEST)}
}

export function asyncSuccess (action, result) {
  return {type: flow(action, SUCCESS), result}
}

export function asyncFailure (action, error) {
  return {type: flow(action, FAILURE), error}
}
