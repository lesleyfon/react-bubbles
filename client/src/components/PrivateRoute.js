import React from 'react';
import { Redirect, Route } from 'react-router-dom';

function PrivateRoute(props) {
    const {component : Component, ...rest} = props
    return <Route 
            {...rest}
            render = { props => (

                localStorage.getItem('token') 
                    ?
                <Component {...props}/>
                     :
                <Redirect 
                    to='/'
                />
                )}
        />
    
}

export default PrivateRoute
