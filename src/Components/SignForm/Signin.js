import React, {Component} from 'react';
import Field from '../Field/Field';

class Signin extends Component 
{
    constructor(props){
        super(props);
        this.state={
            password:'',
            email:''
        }

    }

    onEmailChange = (event) => {
        const email = event.target.value;
        this.setState({email: email})
    }
    onPassWordChange = (event) => {
        const password = event.target.value;
        this.setState({password: password})
    }

    onSubmitSignin = () => {
        console.log(this.state.email);
        console.log(this.state.password);

        fetch('https://server-face-api.herokuapp.com/signin',{
        method: 'post',
        headers: {'Content-type': 'application/json'},
        body: JSON.stringify({
            email: this.state.email,
            password: this.state.password
        })
        })
        .then(response => response.json())
        .then(user => {
            console.log(user);
            if(user.id){
                this.props.loadUser(user);
                this.props.onRouteChange('home');
            }
        })
        .catch(err => console.log(err));
    }


render()
{
    const {onRouteChange} = this.props;
    return(
        <article className="br3 ba b--black-10 mv4 w-100 w-50-m w-25-l mw6 shadow-5 center">
        <main className="pa4 black-80">
            <div className="measure">
                <fieldset id="sign_up" className="ba b--transparent ph0 mh0">
                    <legend className="f1 fw6 ph0 mh0">Sign In</legend>              
                    <Field type={"email"} name={"email-address"} />
                    <Field type={"password"} name={"password"} containerClass={'mv3'} />          
                </fieldset>
                <div className="">
                    <input onClick ={this.onSubmitSignin} className="b ph3 pv2 input-reset ba b--black bg-transparent grow pointer f6 dib" type="submit" value="Sign in" />
                </div>
                <div className="lh-copy mt3">
                    <p onClick={onRouteChange} className="f6 link dim black db pointer">Register</p>
                </div>
            </div>
        </main>
    </article>
    );
}
}

export default Signin;