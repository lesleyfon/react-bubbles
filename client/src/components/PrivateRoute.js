import React from 'react';
import { Link, Route } from 'react-router-dom';

function PrivateRoute(props) {
    const {component : Component, ...rest} = props
    return <Route 
            {...rest}
            render = { props => (

                localStorage.getItem('token') 
                ?
                <Component {...props}/> :
                <p>Sorry Nothing to return</p>
                )}
        />
    
}

export default PrivateRoute
