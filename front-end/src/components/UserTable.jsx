import React from 'react';
import PropTypes from 'prop-types';
import '../style/UserTable.css';
// import { deleteUser } from '../helpers/usersAPI';

export default function UserTable(props) {
  const { users, handleUserDelete } = props;

  const TEST_ID = 'admin_manage__';

  return (
    <table
      className="userTable"
    >
      <thead>
        <tr>
          <th>Item</th>
          <th>Name</th>
          <th>Email</th>
          <th>Tipo</th>
          <th>Excluir</th>
        </tr>
      </thead>
      <tbody>
        {users
          .filter((user) => user.id !== JSON.parse(localStorage.getItem('user')).id)
          .map((user, index) => (
            <tr key={ user.id }>
              <td
                className="table-number"
                data-testid={ `${TEST_ID}element-user-table-item-number-${index}` }
              >
                {index + 1}
              </td>
              <td
                className="table-name"
                data-testid={ `${TEST_ID}element-user-table-name-${index}` }
              >
                {user.name}
              </td>
              <td
                className="table-email"
                data-testid={ `${TEST_ID}element-user-table-email-${index}` }
              >
                {user.email}
              </td>
              <td
                className="table-role"
                data-testid={ `${TEST_ID}element-user-table-role-${index}` }
              >
                {user.role}
              </td>
              <td
                className="table-remove"
                data-testid={ `${TEST_ID}element-user-table-remove-${index}` }
              >
                <button
                  type="button"
                  onClick={ () => handleUserDelete(user.id) }
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
      </tbody>
    </table>
  );
}

UserTable.propTypes = {
  users: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      name: PropTypes.string.isRequired,
      email: PropTypes.string.isRequired,
      type: PropTypes.string.isRequired,
    }),
  ).isRequired,
  handleUserDelete: PropTypes.func.isRequired,
};
