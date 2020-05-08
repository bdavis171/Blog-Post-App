import React, { Component } from 'react';


class YourPosts extends Component {
    constructor(props) {
        super(props);
        this.state = {
            yourPostsArray: []
        }
    }

    componentDidMount = () => {
        this.loadData();
    }

    // load data for the currently logged in user
    loadData = async () => {
        const response = await fetch('/api/yourposts', {
            method: "GET",
            headers: {
                "Authorization": this.props.token,
                "Accept": "application/json",
                "Content-Type": "application/json"
            }
        });

        const json = await response.json();
        if (json.error) {
            window.alert(json.error);

        } else {
            this.setState({ yourPostsArray: json });
            console.log(this.state);
        }
    }

    render() {
        return (
            <div>
                <h1>Your Posts</h1>
                {
                    this.state.yourPostsArray.map(
                        (post) => {
                            return (
                                <div key={post._id}>
                                <fieldset>
                                    <legend>{post.title}</legend>
                                    <p>Written by: {post.author}</p>      
                                    <p>{post.body}</p>                              
                                </fieldset>
                            </div>
                            )
                        }
                    )
                }
            </div>
        );
    }
}
 
export default YourPosts;