import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchUsers } from '../actions';

class UsersList extends Component {
  componentDidMount() {
    // Note: this might not be necessary. This is done server-side
    // This is still necessary, if the user wanted to navigate first to another page
    this.props.fetchUsers();
  }

  renderUsers() {
    return this.props.users.map(user => {
      return(<li key={user.id}>{user.name}</ li>);
    })
  }

  render() {
    return(
      <div>
        List of users
        <ul>{this.renderUsers()}</ul>
      </ div>
    );
  }
}

const mapStateToProps = ({ users }) => {
  return { users };
}

const loadData = store => {
  // Note: we are not using the connect helper, since loadData is called before
  // app is rendered, therefore we will not have access to connect

  // dispatch is used because we cannot use connect helper. We have to Dispatch
  // manually to pipe info through middlewares to reducers

  // Dispatch to return a PROMISE that represents network req to api
  return store.dispatch(fetchUsers())
};

export default {
  loadData,
  component: connect(mapStateToProps, { fetchUsers })(UsersList)
};
