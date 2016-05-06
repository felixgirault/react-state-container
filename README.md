# React state container

A simple container for local state, heavily inspired by redux's connect function. 
It makes it easy to decouple state from components, without all the boilerplate needed with redux, thus making this component suitable to handle little bits of state that dont need to exist in a global store.

## Installation

```
npm install --save react-state-container
```

## Usage

Given a `<Togglable />` component that shows detailed info when clicking on a button:

```jsx
import React, {PropTypes} from 'react';

export default function Togglable({open, onToggle}) {
  return (
    <div>
      <button onClick={onToggle}>
        Toggle detail
      </button>

      {open 
        ? <TogglableDetail /> 
        : undefined
      }
    </div>
  );
}

Togglable.propTypes = {
  open: PropTypes.bool,
  onToggle: PropTypes.func
};
```

We could wrap it with a state container to keep track of the toggling state:

```jsx
import connect from 'react-state-container';
import Togglable from './Togglable';

// makes state available as props to the wrapped component
const mapStateToProps = (state) => ({
  open: state.open
});

// makes functions to update state available as props to
// the wrapped component
const mapSetStateToProps = (setState) => ({
  onToggle() {
    setState(({open}) => ({
      open: !open
    }));
  }
});

// initial state of the container
const initialState = {
  open: false
};

export default connect(
  mapStateToProps,
  mapSetStateToProps,
  initialState
)(Togglable);
```

See the [documented source code](./index.js) to understand how everything works.
