 /**
  * We're getting back the serialized object from the local storage
  * to rehydrate the store
  *
  * @return {Object || Undefined} Last state used
  */
export const getInitialState = () => {
  return JSON.parse(localStorage.getItem('store')) || undefined
}

/**
 * Serializer
 * Save the current state in the local storage for futher uses.
 *
 * @param {Object} Current state to save
 */
export const setInitialState = (currentState) => {
  localStorage.setItem('store', JSON.stringify(currentState))
}
