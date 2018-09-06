import * as React from 'react';

export const storyWithState = (getState, Component) =>
  class extends React.Component {
    constructor(props) {
      super(props);
      this.state = getState({});
    }

    componentWillUpdate(nextProps, nextState) {
      const knobState = getState(nextState);
      const stateToUpdate = Object.keys(knobState).reduce((acc, key) => {
        if (nextState[key] !== knobState[key]) {
          acc[key] = knobState[key];
        }
        return acc;
      }, {});

      Object.keys(stateToUpdate).length && this.setState(stateToUpdate);
    }

    render() {
      return Component.call(this);
    }
  };
