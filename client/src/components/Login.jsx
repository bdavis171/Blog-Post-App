import React, { Component } from 'react';
import {BrowserRouter as Router,Link,Route,Redirect} from 'react-router-dom';

class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {
            email: "",
            password: ""
        }
    }

    // handle changes
    handleChange = (event) => {
        this.setState({ [event.target.id]: event.target.value });
    }

    // handle submission
    handleSubmission = async (event) => {
        event.preventDefault();
        // console.log(this.state);
        let user = {
            email: this.state.email,
            password: this.state.password
        }

        let response = await fetch('/users/login', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(user)
        });

        let json = await response.json();
        if (json.error) {
            window.alert(json.error);
        } else {
            console.log(`login token: ${json.token}`);
            this.props.logInUser(json.token);
           
        }

    }

    render() {
        
        return (
            <div>
                <form action="">
                    <fieldset>
                        <legend>Login</legend>

                        <div className="form-group">
                            <label htmlFor="email">Email:</label>
                            <input type="email" name='email' id='email' onChange={this.handleChange}/>
                        </div>

                        <div className="form-group">
                            <label htmlFor="password">Password:</label>
                            <input type="password" name='password' id='password' onChange={this.handleChange}/>
                        </div>

                        <div className="form-group">
                            <button type="submit" onClick={this.handleSubmission}>Login</button>
                           
                        </div>

                    </fieldset>
                </form>
            </div>
        );
    }
}

export default Login;