/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React, { useState, useEffect, useContext } from "react";
import { DataTable, Box, CheckBoxGroup, Text } from "grommet";

import { epochTimeToDate } from "../epochTimeToDate";
import { getUsers } from '../helpers/CrudUsers';

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
    property: "telegram",
    header: "USER_ID"
  },
  {
    property: "role",
    header: "Roles",
    render: user => (
      <Box pad="small">
        <CheckBoxGroup 
          options={["usuario", "moderador", "admin"]} 
          value={user.roles}
          gap="small"
        />
      </Box>
    ),
  }
];


const Table = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
      fetchUsers();
  }, []);

  const fetchUsers = async () => {
    const data = await getUsers();
    setUsers(data);
  };

  const newData = users.map((user) => {
    const newUser = {
      Id: user._id,
      userName: user.username,
      email: user.email,
      roles: user.roles,
      
    };
    return newUser;
  }); 

  
  return ( 
    <Box align = "center" >
      <DataTable resizeable = { true }
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
  );
}

export default Table
