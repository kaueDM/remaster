import { decamelize } from "./utils";

const generateActions = config => {
  const { name, initialState, actions, createDefault = true } = config;
  // assign an namespace for each action
  const actionArray = Object.keys(actions).map(key => {
    return {
      action: actions[key],
      type: `${name}/${decamelize(key).toUpperCase()}`
    };
  });

  // add default actions (customActions priorized if they have the same type)
  if (createDefault) {
    Object.keys(initialState).map(key => {
      const newType = `${name}/SET_${decamelize(key).toUpperCase()}`;

      if (actionArray.findIndex(x => x.type === newType) === -1) {
        return actionArray.push({
          action: null,
          type: `${name}/SET_${decamelize(key).toUpperCase()}`
        });
      }
    });
  }
  // add reset type
  actionArray.push({
    action: null,
    type: `${name}/RESET`
  });

  return actionArray;
};

export default generateActions;
