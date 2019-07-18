import React from 'react';


const Navigation = ({onRouteChange, isSignedIn})=>
{
    const signOutRoute = <p onClick={() => onRouteChange('signout')} className='f3 link dim black underline pa3 pointer'>Sign Out</p>;
    const signinOrRegisterRoute = [
        <p key='signin' onClick={() => onRouteChange('signin')} className='f3 link dim black underline pa3 pointer'>Sign In</p>,
        <p key ='register' onClick={() => onRouteChange('register')} className='f3 link dim black underline pa3 pointer'>Register</p>
    ]
    const routeOptions = isSignedIn === true ? signOutRoute : signinOrRegisterRoute;
    return(
        <nav style={{display: 'flex', justifyContent: 'flex-end'}}>
        {routeOptions}
       </nav>
    );
}
export default Navigation;