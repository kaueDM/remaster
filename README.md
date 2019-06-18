## Remaster - Redux generator

### API

**`remaster({ name, initialState, actions, createDefault })`:**

`name`: Name of your reducer.

`initialState`: Initial state.

`actions`: Custom actions. By default, `remaster` will create an type/action for each field inside `initialState`. If you have a field called `rimColor` inside your `car` reducer, you will get `car/SET_RIM_COLOR` type.

`createDefault`: Flag for creating the generic type/action described in `actions`. The default value is `true`.

**`setField(reducerName, fieldName, newValue)`:**
Update a single value inside one reducer. Useful for updates where you only modify one prop

`reducerName`: The name you defined in `remaster()`

`fieldName`: Some field from your reducer's initial state, defined in `remaster()`

`newValue`: field's new value. If this value is not declared, `field` will return to it's initial value

**`reset(reducerName)`:**
Reset the selected reducer.

`reducerName`: The name you defined in `remaster()`

### Usage

**Example with ReactJS**

Install it:

```
  yarn add remaster
  // or
  npm install --save remaster
```

Write your reducer's initial state

```
// ./redux/reducers/user.js

import remaster from "remaster";

const config = {
  name: "user",
  initialState: {
    age: 50,
    name: "John",
    favoriteFruit: "Mango"
  },
  actions: {
    setNameAndAge: (state, { name }) => ({ ...state, name, age: 123 })
  }
};

const user = remaster(config);

// using this, you can see what are your reducer action types
export const UserTypes = user.TYPES;

export default user.REDUCER;
```

Combine them

```
// ./redux/reducers/index.js

import { combineReducers } from "redux";
import userReducer from "./userReducer";

export default combineReducers({
  user: userReducer
});
```

Create your store

```
// ./redux/store.js

import reducers from './reducers'
import { createStore } from 'redux'
import { composeWithDevTools } from 'redux-devtools-extension/developmentOnly'

const store = createStore(reducers, composeWithDevTools())

export default store
```

Wrap your app, just like regular redux

```
import App from './App'
import React from 'react'
import ReactDOM from 'react-dom'
import Store from '../src/redux/store'
import { Provider } from 'react-redux'

ReactDOM.render(
  <Provider store={Store}>
    <App />
  </Provider>
  , document.getElementById('root'))
```

Connect your component

```
import React from 'react';
import { connect } from 'react-redux';

class MyComponent extends React.Component {
  render () {
    const { user } = this.props

    return (
      <div>
        <h3>User</h3>
        <p>Name: {user.name}</p>
      </div>
    )
  }
}

const mapStateToProps = ({ user }) => ({ user })

export default connect(mapStateToProps, null)(MyComponent)
```

To create a new action, use `mapDispatchToProps`

```
import { UserTypes } from "./userReducer";

const mapDispatchToProps = dispatch => {
  return {
    setNameAndAge: payload =>
      dispatch({ type: UserTypes.SET_NAME_AND_AGE, payload })
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(MyComponent);
```

To update a single field or reset a reducer, import the methods from `remaster`

```
import { setField, reset } from "remaster";

export default connect(mapStateToProps, { setField, reset })(MyComponent);
```
