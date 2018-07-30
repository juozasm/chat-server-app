import React from 'react';
import * as actions from '../actions/authActions';
import {connect} from 'react-redux';
import {Link} from 'react-router-dom';
class Login extends React.Component {
  state = {
    name: '',
    password: ''
  };
  onInputChange = (e) => {
    this.setState({[e.target.name]: e.target.value})
  };
  onFormSubmit=(e)=>{
    e.preventDefault();
    console.log(this.state);
    // uzklausa i backend /api/login
    this.props.login(this.state, this.props.history)
  };

  render() {
    return (
        <div className="Login">
          <h1>Login</h1>
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
            <button>Login</button>
            {this.props.errors.message &&
            <span>{this.props.errors.message}</span>
            }
          </form>
          <Link to='/register'>Go register</Link>
        </div>
    );
  }
}
const mapStateToProps = (state) => ({errors:state.errors});

export default connect(mapStateToProps, actions)(Login)