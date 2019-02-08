import { generateField, generateType } from './utils'

const generateActions = (initialState, prefix) => {
  return Object.keys(initialState).map(key => generateType(key, prefix))
}

export const generateReducer = (initialState, prefix) => {
  return (state = initialState, { type, payload }) => {
    const actions = generateActions(initialState, prefix)

    const currentType = actions.indexOf(type) > -1 ? actions[actions.indexOf(type)] : null

    const field = currentType ? generateField(currentType.toLowerCase()) : ''

    return currentType ? { ...state, [field]: payload || initialState[field] } : state
  }
}

export const setField = (prefix, field, payload) => ({ type: generateType(field, prefix), payload })
