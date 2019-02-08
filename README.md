## Remaster - Redux generator prototype

**[DISCLAIMER]** This is just an idea. I don't know if this is worst (probably is) than regular Redux structures. Pull requests are more than welcome.


### API

**`generateReducer(initialState, prefix)`:**
Create a new reducer and its actions

`initialState`: your reducer initial state (see Usage).

`prefix`: Your reducer's name. Used to send actions (see API - `setField`).



**`setField(prefix, field, payload)`:**
Dispatch an action to Redux. Right now, this thing dispatch one action for each reducer, so, if you have an idea how to fix it, send your PR.

`prefix`: The name you defined in `generateReducer`

`field`: Some field from your reducer's initial state, defined in `generateReducer`

`payload`: Your action payload. If this value is not declared, `field` will return to it's initial value


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

const user = {
  age: 50,
  name: 'John',
  favoriteFruit: 'Mango'
}

export default user
```

Combine them
```
// ./redux/reducers/index.js

import { combineReducers } from 'redux'
import { generateReducer } from 'remaster'

import user from './user'

export default combineReducers({
  user: generateReducer(user, 'user')
})
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

Connect your component and import `setField` from `remaster`
```
import React from 'react'
import { setField } from 'remaster' // <~ do not forget this!
import { connect } from 'react-redux'

class MyComponent extends React.Component {
  render () {
    const { user, setField } = this.props

    return (
      <div>
        <h3>User</h3>
        <p>Name: {user.name}</p>

        <button onClick={_ => setField('user', 'name', 'Martin')}>
          Change name
        </button>

        <button onClick={_ => setField('user', 'name')}>
          Reset name
        </button>
      </div>
    )
  }
}

const mapStateToProps = state => ({ user: state.user })

export default connect(mapStateToProps, { setField })(App)
```


