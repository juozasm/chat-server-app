import React from 'react';
import {connect} from 'react-redux';
import axios from 'axios';
import socket from '../utils/socket';
import * as authActions from '../actions/authActions';
import * as chatActions from '../actions/chatActions';
import jwt from 'jsonwebtoken';
import Dropzone from 'react-dropzone'
import _ from 'lodash';


class Chat extends React.Component {
  state = {
    message:'',
    file: '',
    errors: {}
  };
  onDrop = (files) => {
    console.log(files);
    this.setState({
      file: files[0]
    });
  };

  
  createMenuItem = () => {
    // validate input data
    const errors = {};
    const {message, file} = this.state;
    if (!message) errors.message = 'message is required';
   // if (!file) errors.file = 'file is required';
    // jei errors objektas yra ne tuscias setinam stato errors i errors
    if (!_.isEmpty(errors)) return this.setState({errors});
    this.setState({errors});

    const formData = new FormData();		//sukuriam formData objekta
    formData.append('name', this.props.auth.user.name);	//jam pridedam form values
    formData.append('message', message);
    formData.append('image', file);	//failo pridejimas

    this.props.addChatItem(formData);
    this.setState({ message: '', file: ''})
  };
 
  logout=()=>{
    this.props.logout()
    this.props.history.push('/login')   
  }

  componentWillMount() {
    // darom uzklausa i localstorage
    let token = localStorage.getItem('jwt-token')
    if (!token) return this.props.history.push('/login');

    // irasom token i axios headers
    axios.defaults.headers.common['Authorization']= token;

    token = token.split(' ')[1];
    console.log(token);

    // is tokeno istraukiam user info
    const user = jwt.decode(token);
    if(!user ) return this.props.history.push('/login');

    // iskvieciam action (set user) kuris uzpildo state.auth
    this.props.setUser(user)
  }

  componentDidMount() {
    this.props.fetchChat();
    this.props.allUsers();
    socket.on('newitem',(item)=>{
      console.log(item);
      this.props.newItem(item)
  } );
  socket.on('badsocket', (data)=>{
      this.setState({errors:[...this.state.errors, data]})
  })
  }
  render() {
    const chatItems=this.props.chat.map((item,i)=>{
      return <li key={i}><div className="wrapper">
        <p>User:</p>
        <span className='name'>{item.name}</span>
        <p>Message:</p>
        <span className='msg'>{item.message}</span>
      </div>
       {item.img?
      <div style={{
          width: '100px',
          height: '100px',
          border: '1px solid grey',
          backgroundImage: `url(${item.img})`,
          backgroundPosition: 'center',
          backgroundSize: 'cover'
      }}></div>:<div
      style={{
          width: '100px',
          height: '100px',
      }}
      ></div>}</li>
    })
    const users=this.props.users.map((item,i)=>{
      return <li className={item.name===this.props.auth.user.name?'name bold':'name'} key={i}>{item.name}</li>
    })
    return (
        <div className="Chat">
          <h1>Chat app! Hey, <span style={{  
            textTransform: 'capitalize',
            color:'black'
}}>{this.props.auth.user.name}</span>!</h1>
<button className='logout' onClick={this.logout}>Logout</button>
          <div className="container">
            <div className="window">
            <ul className="messages">
            <h2>Messages:</h2>
              {chatItems}
            </ul>
            </div>
            <div className="sidebar">
            <ul className="user-list">
              <h3>User list:</h3>
              {users}
            </ul>
            </div>          
          </div> 
            <div className="send-message">
            <Dropzone
                style={{
                  width: '100px',
                  height: '100px',
                  border: '1px solid grey',
                  backgroundImage: `url(${this.state.file.preview})`,
                  backgroundPosition: 'center',
                  backgroundSize: 'cover'
                }}
                onDrop={this.onDrop}>
            </Dropzone>

            <input value={this.state.message} 
            onChange={(e)=>this.setState({message:e.target.value})}
             type="text" placeholder="message goes here..."/>
            {this.state.errors.message&&
            <span style={{color:'red'}}>{this.state.errors.message}</span>}
            <button onClick={this.createMenuItem}>Send message</button>
          </div>
       
        </div>
    );
  }
}
const mapStateToProps = (state) => (
  {
    errors:state.errors,
    chat:state.chat,
    auth:state.auth,
    users:state.users
  });

export default connect(mapStateToProps,{...authActions, ...chatActions})(Chat)