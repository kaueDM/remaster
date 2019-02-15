import { generateField, generateType } from './utils'

const generateActions = (initialState, prefix) => {
  return Object.keys(initialState).map(key => generateType(key, prefix))
}

export const generateReducer = (initialState, prefix) => {
  return (state = initialState, { type, payload }) => {
    const actions = [...generateActions(initialState, prefix), `${prefix}/RESET`]

    const currentType = actions.indexOf(type) > -1 ? actions[actions.indexOf(type)] : null

    if (currentType) {
      const isReset = currentType === `${prefix}/RESET`
      const field = !isReset ? generateField(currentType.toLowerCase()) : ''

      return !isReset ? { ...state, [field]: payload || initialState[field] } : { ...initialState }
    }

    return state
  }
}

export const reset = prefix => ({ type: `${prefix}/RESET` })
export const setField = (prefix, field, payload) => ({ type: generateType(field, prefix), payload })
