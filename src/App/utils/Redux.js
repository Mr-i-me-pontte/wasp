import React, { useReducer } from 'react';

const withReducer = (reducer, initialState) => (WrappedComponent) => {
    return (props) => {
        const [state, dispatch] = useReducer(reducer, initialState);
        const wrappedProps = { ...props, state, dispatch };
        return <WrappedComponent {...wrappedProps} />;
    };
};

export default withReducer;
