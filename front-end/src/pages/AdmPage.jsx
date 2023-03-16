import React, { useEffect, useState } from 'react';
import UserForm from '../components/UserForm';
import UserTable from '../components/UserTable';
import Navbar from '../components/navBar';
import { deleteUser, getAllUsers, createUserAdm } from '../helpers/usersAPI';

export default function AdmPage() {
  const [users, setUsers] = useState([]);

  const handleUserDelete = async (id) => {
    await deleteUser(id);
    const updatedUsers = await getAllUsers();
    setUsers(updatedUsers);
  };

  const handleUserCreate = async (userInfo) => {
    await createUserAdm(
      JSON.stringify(userInfo),
      JSON.parse(localStorage.getItem('user')).token,
    );
    const updatedUsers = await getAllUsers();
    setUsers(updatedUsers);
  };

  useEffect(() => {
    const fetchUsers = async () => {
      const userList = await getAllUsers();
      setUsers(userList);
    };
    fetchUsers();
  }, []);

  return (
    <div>
      <Navbar />
      <div
        className="admPage"
      >
        <UserForm handleUserCreate={ handleUserCreate } />
        <UserTable users={ users } handleUserDelete={ handleUserDelete } />
      </div>
    </div>
  );
}
