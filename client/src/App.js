import './App.css';

import React from 'react';
import axios from "axios"



class App extends React.Component {

  state ={
    title : "",
    body : "",
    posts: []
  };

  componentDidMount = () => {
    this.getWebPost();
  }

 getWebPost = () => {
   axios.get('/users')
     .then((response) => {
       const data = response.data;
       this.setState({ posts: data });
       console.log('Date has been received!!');
     })
     .catch(() => {
       alert('Error of retrieving Data !!!');
     });
 }

//  handleChange = (event) => {
//     const target = event.target
//     const name = target.name
//     const value = target.value

//     this.setState({
//       [name]: value
//     });

//   };  //Refactored to
 handleChange = ({target}) => { 
    const {name, value } = target;
    this.setState({[name]: value});
  };

  submit = (event) => {
    event.preventDefault();

    const payload = {
      title: this.state.title,
      body: this.state.body
    };


      //Used to send data to the backend server database
    axios({
      // url: "/./save",
      url: "/users/save",
      method: 'POST',
      data: payload
    })
    .then (()=>{
        console.log("Data has been sent to the server");
        this.resetUserInputs();
        this.getWebPost();
    })
    .catch (()=> {
        console.log("there was an error detected sent to the server");  
    }
    );;
  };
  
  resetUserInputs = ()=>{
      this.setState({
        title: '',
        body: " "
      })
  }

  displayBlogPost = (posts) => {

    if (!posts.length) return null;

    return posts.map((post,index) => (
      <div key={index} className="web-post">
         <h3>{post.title}</h3>
         <p>{post.body}</p>
      </div>
    ));
  };
  // const handleClick = ()=>{
    //   console.log ("Event clicked:", {title})
    // }
    
  render () {
     console.log('States : ', this.state);
    //  console.log(this.getWebPost());
     return(

        <div className="app">
          hello World
          <h2>Welcome to my App</h2>
            <form onSubmit={this.submit}>
              <div className="form-input">
                      <input             
                          type='text'
                          name="title"
                          placeholder="enter a title"
                          value={this.state.title}
                          onChange={this.handleChange}
                      />
                </div>
                <div className="form-input">
                      <textarea 
                          name="body" 
                          placeholder="body" 
                          cols="30" rows="10" 
                          value={this.state.body}
                          onChange={this.handleChange}
                      >
                      </textarea>
                </div>
                
                <button>Submit</button>
            </form>
            
            <div className="posts">
              {this.displayBlogPost(this.state.posts)}
            </div>
        </div>

    )}
}

export default App;




