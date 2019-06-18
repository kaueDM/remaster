import generateActions from "./generateActions";
import { generateField, generateType, decamelize } from "./utils";

const remaster = config => {
  const { name, initialState } = config;

  const actions = generateActions(config);

  const types = {};

  actions.forEach(({ type }) => {
    return (types[type.split("/")[1]] = type);
  });

  const reducer = (state = initialState, { type, payload }) => {
    const typeIndex = actions.findIndex(x => x.type === type);
    const currentType = typeIndex > -1 ? actions[typeIndex] : null;

    if (currentType) {
      const { type, action } = currentType;

      if (action) {
        return action(state, payload);
      } else {
        const isReset = type === `${name}/RESET`;
        const field = !isReset ? generateField(type.toLowerCase()) : "";

        return !isReset
          ? { ...state, [field]: payload || initialState[field] }
          : { ...initialState };
      }
    }

    return state;
  };

  return {
    REDUCER: reducer,
    TYPES: types
  };
};

export const reset = name => ({ type: `${name}/RESET` });

export const setField = (name, field, payload) => ({
  type: generateType(field, name),
  payload
});

export default remaster;
