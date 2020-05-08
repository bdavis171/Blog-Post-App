import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';

class Register extends Component {
    constructor(props) {
        super(props);
        this.state = { 
            email: "",
            password: "",
            name:""
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
        let newUser = {
            name: this.state.name,
            email: this.state.email,
            password: this.state.password
        }

        let response = await fetch('/users/register', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(newUser)
        });

        let json = await response.json();
        if (json.error) {
            window.alert(json.error);
        } else {
            console.log(this.state);
            
        }

    }

    render() { 
        return ( 
            <div>
                <form action="">
                    <fieldset>
                        <legend>Register</legend>

                        <div className="form-group">
                            <label htmlFor="name">Name:</label>
                            <input type="text" name='name' id='name' onChange={this.handleChange}/>
                        </div>

                        <div className="form-group">
                            <label htmlFor="email">Email:</label>
                            <input type="email" name='email' id='email' onChange={this.handleChange}/>
                        </div>

                        <div className="form-group">
                            <label htmlFor="password">Password:</label>
                            <input type="password" name='password' id='password' onChange={this.handleChange}/>
                        </div>

                        <div className="form-group">
                            <button type="submit" onClick={this.handleSubmission}>Register</button>
                        </div>

                    </fieldset>
                </form>
            </div>
         );
    }
}
 
export default Register;