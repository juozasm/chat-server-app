import React from 'react';
import {connect} from 'react-redux';

class User extends React.Component {
  state = {
  
  };


  render() {
    return (
        <div className="User">
          <h1>User</h1>
        </div>
    );
  }
}
//const mapStateToProps = (state) => ({errors:state.errors});

export default connect(null)(User)