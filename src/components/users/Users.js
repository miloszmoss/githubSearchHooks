import React from 'react';
import UserItem from './UserItem';
import PropTypes from 'prop-types';

const Users = ({ users, loading }) => {
  return (
    <div style={userStyle}>
      {loading && <div>loading</div>}
      {users.map(user => (
        <UserItem key={user.id} user={user} />
      ))}
    </div>
  );
};

Users.propTypes = {
  users: PropTypes.array.isRequired,
  loading: PropTypes.bool.isRequired,
};

const userStyle = {
  display: 'grid',
  gridTemplateColumns: 'repeat(3,1fr)',
  gridGap: '1rem',
};

export default Users;
