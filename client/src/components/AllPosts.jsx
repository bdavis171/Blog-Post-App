import React, { Component } from 'react';

class AllPosts extends Component {
    constructor(props) {
        super(props);
        this.state = { 
            postArray:[]
         }
    }

    componentDidMount = () => {
        this.loadData();
    }

    // load data for all posts
    loadData = async() => {
        const response = await fetch('/api');
        const json = await response.json();
        console.log(json);
        this.setState({postArray: json});
    }

    render() { 
        return ( 
            <div>
                <h1>All Posts</h1>
                {this.state.postArray.map(
                    (post)=> {
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
                )}
            </div>
         );
    }
}
 
export default AllPosts;