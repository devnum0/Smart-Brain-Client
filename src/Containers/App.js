import React, { Component } from 'react';
import FaceRec from '../Components/FaceRecognition/FaceRec.js';
import ImageLinkForm from '../Components/ImageLinkForm/ImageLinkForm.js';
import Logo from '../Components/Logo/Logo.js';
import Navigation from '../Components/Navigation/Navigation.js';
import Rank from '../Components/Rank/Rank.js';
import Particles from 'react-particles-js';
import './App.css';
import Signin from '../Components/SignForm/Signin.js';
import Register from '../Components/Register/Register.js';

const particleOptions = {
    particles: {
        number: {
            value: 150,
            density: {
                enabled: true,
                value_area: 800
            }
        }
    }
}

class App extends Component {
    constructor() {
        super();
        this.state = {
            input: '',
            imageUrl: '',
            box: {},
            route: 'signin',
            isSignedIn: false,

            user:{
                id:'',
                name:'',
                email:'',
                entries: 0,
                joined: ''
            }
        }
    }

    clearLinkAndphoto() {
        this.setState({imageUrl: ''})
    }

    loadUser = (data) => { 
        this.setState({user:{
            id:data.id,
            name: data.name,
            email:data.email,
            entries: data.entries,
            joined: data.joined
        }})
        console.log(this.state.user);
    }

    calculateFaceLocation = (data) => {
        const clariFace = data.outputs[0].data.regions[0].region_info.bounding_box;
        const image = document.getElementById('inputImage');
        const width = Number(image.width);
        const height = Number(image.height);
        return {
            leftCol: clariFace.left_col * width,
            topRow: clariFace.top_row * height,
            rightCol: width - (clariFace.right_col * width),
            bottomRow: height - (clariFace.bottom_row * height)
        };
    }

    displayFaceBox = (box) => {
        this.setState({ box: box });
    }

    onInputChange = (event) => {
        this.setState({ input: event.target.value });
    }

    onButtonSubmit = () => {
                this.setState({imageUrl: this.state.input});
                  fetch('https://server-face-api.herokuapp.com/imageUrl', {
                    method: 'post',
                    headers: {'Content-Type': 'application/json'},
                    body: JSON.stringify({
                      input: this.state.input
                    })
                  })
                  .then(response => response.json())
                  .then(response => {
                    if (response) {
                      fetch('https://server-face-api.herokuapp.com/image', {
                        method: 'put',
                        headers: {'Content-Type': 'application/json'},
                        body: JSON.stringify({
                          id: this.state.user.id
                        })
                      })
                        .then(response => response.json())
                        .then(entries => {
                          this.setState(Object.assign(this.state.user, { entries: entries}))
                        })
                        .catch(console.log)
            
                    }
                    this.displayFaceBox(this.calculateFaceLocation(response))
                  })
                  .catch(err => console.log(err));
              }
      
    
    onRouteChange = (route) => {
        if (route === 'signout') {
            this.setState({isSignedIn: false})

          } else if (route === 'home') {
            this.setState({isSignedIn: true})
          }
          this.setState({route: route});
          console.log(this.state.route)
    }

    render() {
        
        return (
            <div className="App ">
                <Particles className='particles' params={particleOptions} />
                
                <Navigation onRouteChange ={this.onRouteChange} isSignedIn ={this.state.isSignedIn} state={this.state.route}/>
                {this.state.route === 'home' ? 
                    <div>
                        <Logo />
                        <Rank name={this.state.user.name} entries={this.state.user.entries}/>
                        <ImageLinkForm onInputChange={this.onInputChange} onButtonSubmit={this.onButtonSubmit} clear={this.clearLinkAndphoto} />
                        <FaceRec imageUrl={this.state.imageUrl} box={this.state.box} />
                     </div>
                    :(
                        this.state.route === 'signin' ? <Signin onRouteChange ={this.onRouteChange} loadUser={this.loadUser} />
                        : <Register onRouteChange ={this.onRouteChange} loadUser={this.loadUser} />
                    )
                }
            </div>
        );
    }
}
export default App;   