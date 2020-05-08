import React, { Component } from 'react';


class AddPost extends Component {
    constructor(props) {
        super(props);
        this.state = {
            title: '',
            body: ''
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
        let newPost = {
            title: this.state.title,
            body: this.state.body,
            author: this.props.tokenUser.email
        }

        let response = await fetch('/api', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization':this.props.token
            },
            body: JSON.stringify(newPost)
        });

        let json = await response.json();
        if (json.error) {
            window.alert(json.error);
        } else {
            console.log(json);
            
        }

    }

    render() {

        return (
            <div>
                <form action="">
                    <fieldset>
                        <legend>Add A Post</legend>

                        <div className="form-group">
                            <label htmlFor="title">Title:</label>
                            <input type="text" name='title' id='title' onChange={this.handleChange}/>
                        </div>

                        <div className="form-group">
                            <label htmlFor="body">Body:</label>
                            <textarea name="body" id="body" onChange={this.handleChange} cols="30" rows="10"></textarea>
                        </div>

                        

                        <div className="form-group">
                            <button type="submit" onClick={this.handleSubmission}>Submit Post</button>
                        </div>

                    </fieldset>
                </form>
            </div>
        );
    }
}
 
export default AddPost;