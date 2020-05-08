import React, { Component } from 'react';
import Login from './Login';
import Register from './Register';
import AllPosts from './AllPosts';
import AddPost from './AddPost';
import UpdatePost from './UpdatePost';
import YourPosts from './YourPosts';
import { BrowserRouter as Router, Link, Route } from 'react-router-dom';


class AppContainer extends Component {
    constructor(props) {
        super(props);
        this.state = {
            token: "",
            tokenUser: {
                name: "",
                email: ""
            },
            isLoggedIn: false,
            hasRegistered: false,
            hasAddedPost: false,
            hasUpdatedPost: false
        }
    }

    // lift login token to parent
    logInUser = async (token) => {
        this.setState({ token: token });
        // collect the user's name and email from the token
        const response = await fetch('/users/verify', {
            method: "POST",
            headers: {
                "Authorization": this.state.token
            }
        });

        const json = await response.json();
        if (json.error) {
            window.alert(json.error);
        } else {
            const results = json.message;
            console.log(results);
            this.setState({
                tokenUser: {
                    name: results.name,
                    email: results.email
                }
            });
            console.log(this.state.tokenUser);
            this.setState({ loginSubmitted: true })
        }

        console.log(`home token: ${this.state.token}`);
    }

    render() {
        return (
            <div>
                <Router>

                    <div className="nav">
                        <Link to="/"><h1>Dusty's Gaming Blog</h1></Link>
                        <Link to="/listAll">All Posts</Link>
                        <Link to="/listYours">Your Posts</Link>
                        <Link to="/addPost">Add Post</Link>
                        <Link to="/login">Login</Link>
                        <Link to="/register">Register</Link>
                        <Link to="/">Logout</Link>
                    </div>

                    <div className="page-display">
                        <Route path='/listAll' component={() => <AllPosts />} />
                        <Route path='/listYours' component={() => <YourPosts token={this.state.token} />} />
                        <Route path='/addPost' component={() => <AddPost token={this.state.token} tokenUser={this.state.tokenUser}/>} />
                        <Route path='/login' component={() => <Login logInUser={this.logInUser} />} />
                        <Route path='/register' component={() => <Register />} />
                    </div>

                </Router>


            </div>
        );
    }
}

export default AppContainer;