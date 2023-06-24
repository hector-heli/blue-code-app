/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React, { useState, useEffect, useContext } from "react";
import { DataTable, Box, CheckBoxGroup, Text, Button } from "grommet";
import { Update, Trash, UserAdd } from "grommet-icons"

import { getUsers, deleteUser } from '../helpers/CrudUsers';
import SignUp from "./SignUp";
import Modal from "./Modal";

import { UsersContext, initialCurrentUserState } from "../ContextProvider";

const UsersTable = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [currentUser, setCurrentUser] = useState(initialCurrentUserState);
  const [creatingUser, setCreatingUser] = useState(true);
  const [users, setUsers] = useState([]);
  
  const columns = [
  {
    property: "Id",
    header: <Text> Id </Text>,
    primary: true
  },
  {
    property: "userName",
    header: <Text> Usuario </Text>,
  },
  {
    property: "email",
    header: "e-mail"
  },
  {
    property: "password",
    render: password => (<Text> ****** </Text>),
    header: "password"
  },
  {
    property: "telegramCallId",
    header: "user_id"
  },
  {
    property: "role",
    header: "Roles",
    render: user => (
      <Box pad="small">
        <CheckBoxGroup 
          options={["usuario", "moderador", "admin"]} 
          value={ user.roles.map(role=>role.name) }
          gap="small"
          size="small"
        />
      </Box>
    ),
  },
  {
    property: "action",
    header: "Acciones",
    render: user => (
      <Box
        gap="xsmall"
        hoverIndicator={"background"}
      >
        <Button 
          label="modificar" 
          icon={<Update size="medium" color="black"/>}
          onClick={()=>updateUser(user)} 
          defaultValue={false}     
        />  

        <Button 
          label="eliminar" 
          icon={<Trash size="medium" color="black"/>}
          onClick={() => deleteOneUser(user._id)}
          defaultValue={false} 
        />
      </Box>
    ),
  },
  
];

  useEffect(() => {
      fetchUsers();
  }, [isOpen]);

  const fetchUsers = async () => {
    const data = await getUsers();
    setUsers(data);
  };

  const newData = users.map((user) => {
    const newUser = {
      _id: user._id,
      Id: users.indexOf(user) + 1,
      userName: user.username,
      email: user.email,
      password: user.password,
      telegramCallId: user.telegramCallId,
      roles: user.roles,
    };
    return newUser;
  }); 

  const updateUser = async(user) => {
    //console.log(currentUser);

    setCreatingUser(false);
    console.log(user);
    setCurrentUser({
      userId: user._id,
      username: user.userName,
      password: user.password,  
      email: user.email,
      telegramCallId: user.telegramCallId,
      roles: user.roles
    });
    setIsOpen(true);
    //(console.log(currentUser));

  }

  const createUser = (e) => {
    e.preventDefault();
    setCurrentUser(initialCurrentUserState);
    setCreatingUser(true);
    setIsOpen(true);
  }

  const deleteOneUser = (userId) => {
    deleteUser(userId);
    fetchUsers();
  }

  const closeModal = () => {
    setIsOpen(false);
  }

  return ( 
    <UsersContext.Provider value={{currentUser, setCurrentUser}}>
      <Modal 
        isOpen={isOpen}
        closeModal={closeModal}
      > 
        <SignUp 
          closeModal={closeModal}
          creatingUser={creatingUser}
          setCreatingUser={setCreatingUser}
        />
      </Modal>
        
      <Box align = "center" >
        <Button 
          primary 
          alignSelf="end"
          label="Nuevo" 
          icon={<UserAdd size="medium" color="black"/>}
          onClick={createUser}
        />
        <DataTable 
          resizeable = { true }
          paginate={true}
          sortable = { true }
          columns = { columns }
          data = { newData }
          background={{ 
            header: "dark-2",
            body: ["white", "light-2"],
            footer: { 
              dark: "light-2", 
              light: "dark-3" 
            }
          }}
        /> 
      </Box>
    </UsersContext.Provider>  
  );
}

export default UsersTable
