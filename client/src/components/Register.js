import React from 'react';
import {Link} from 'react-router-dom';
import * as actions from '../actions/authActions';
import {connect} from 'react-redux';

class Register extends React.Component {
  state = {
    name: '',
    password: ''
  };
  
  onInputChange = (e) => {
    this.setState({[e.target.name]: e.target.value})
  };
  
  onFormSubmit= async (e)=>{
    e.preventDefault()
    await this.props.register(this.state);
    this.props.login(this.state, this.props.history);
    console.log(this.state);
   
  };

  render() {
    return (
        <div className="Register">
          <h1>Register</h1>
          <form  onSubmit={this.onFormSubmit}>
            <input
                onChange={this.onInputChange}
                value={this.state.name}
                name="name"
                placeholder="username"
                type="text"/>
            <input
                onChange={this.onInputChange}
                value={this.state.password}
                name="password"
                placeholder="password"
                type="password"/>
            
            <button>Register</button>
            <Link to='/login'>Go login</Link>
          </form>
        </div>

    );
  }
}
const mapStateToProps = (state) => ({errors:state.errors});

export default connect(mapStateToProps,actions)(Register)