import React from 'react';

class Register extends React.Component {

    constructor(props){
        super(props);
        this.state={
            password:'',
            email:'',
            name: ''
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

    onNameChange = (event) => {
        const name = event.target.value;
        this.setState({name: name})
    }

    onSubmitRegistration = () => {
        fetch('https://server-face-api.herokuapp.com/register',{
        method: 'post',
        headers: {'Content-type': 'application/json'},
        body: JSON.stringify({
            name: this.state.name,
            email: this.state.email,
            password: this.state.password
        })
        })
        .then(response => response.json())
        .then(users => {
            if(users){
                this.props.loadUser(users);
                this.props.onRouteChange('home');
            }
        })
        .catch(err => console.log(err));
    }

    render(){
        return (
            <article className="br3 ba b--black-10 mv4 w-100 w-50-m w-25-l mw6 shadow-5 center">
                <main className="pa4 black-80">
                    <div className="measure">
                        <fieldset id="sign_up" className="ba b--transparent ph0 mh0">
                            <legend className="f4 fw6 ph0 mh0">Registration</legend>
                            <div className="mt3">
                                <label className="db fw6 lh-copy f6" htmlFor="name">Name</label>
                                <input className="pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100" 
                                        type="text" 
                                        name="name" id="name" 
                                        placeholder='John Doe'
                                        onChange={this.onNameChange} />
                            </div>
                            <div className="mt3">
                                <label className="db fw6 lh-copy f6" htmlFor="email-address">Email</label>
                                <input className="pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100" 
                                        type="email" 
                                        name="email-address" 
                                        id="email-address" 
                                        placeholder='egov@egov.com' 
                                        onChange={this.onEmailChange}/>
                            </div>
                            <div className="mv3">
                                <label className="db fw6 lh-copy f6" htmlFor="password">Password</label>
                                <input className="b pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100" 
                                        type="password" 
                                        name="password" 
                                        id="password" 
                                        onChange={this.onPassWordChange}/>
                            </div>
                        </fieldset>
                        <div className="">
                            <input onClick ={this.onSubmitRegistration} className="b ph3 pv2 input-reset ba b--black bg-transparent grow pointer f6 dib" type="submit" value="Register" />
                        </div>
                    </div>
                </main>
            </article>
        );

    }
}
export default Register;