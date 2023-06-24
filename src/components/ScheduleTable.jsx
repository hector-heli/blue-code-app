/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React, { useState, useEffect, useContext } from "react";
import { DataTable, Box, CheckBoxGroup, Text, Button } from "grommet";
import { Update, Trash, Add } from "grommet-icons"

import { getUsers, deleteUser } from '../helpers/CrudUsers';
import { getSchedule, updateShift, deleteShift } from '../helpers/CrudSchedule';
import ShiftManager from "./ShiftManager";
import Modal from "./Modal";
import { UsersContext, initialCurrentShiftState, ScheduleContext } from "../ContextProvider";
import { epochTimeToDate } from "../server/libs/epochTimeToDate";

const ScheduleTable = () => {
  const [users, setUsers] = useState([]);
  const [schedule, setSchedule] = useState([]);
  const [isOpen, setIsOpen] = useState(false);
  const [currentShift, setCurrentShift] = useState(initialCurrentShiftState);
  const [creatingShift, setCreatingShift] = useState(true);

  useEffect(() => {
    fetchUsers();
    fetchSchedule();
  }, [isOpen]);

  const fetchUsers = async () => {
    //console.log(users);
  
    const dataUsers = await getUsers();
    //console.log(dataUsers);
    setUsers(dataUsers);
  };
  
  const fetchSchedule = async () => {
    const dataSchedule = await getSchedule();
    console.log(dataSchedule);
    setSchedule(dataSchedule);
  };

  //console.log(users);

  const columns = [
  {
    property: "Id",
    header: <Text> Id </Text>,
    primary: true
  },
  {
    property: "startDate",
    header: <Text> Inicio de turno </Text>,
  },
  {
    property: "endDate",
    header: <Text> Fin de turno </Text>,
  },
  {
    property: "chief",
    header: "Jefe de turno"
  },
  {
    property: "doctor",
    header: "médico"
  },
  {
    property: "action",
    header: "Acciones",
    render: shift => (
      <Box
        gap="xsmall"
        hoverIndicator={"background"}
      >
        <Button 
          label="modificar" 
          icon={<Update size="medium" color="black"/>}
          onClick={()=>updateShift(shift)} 
          defaultValue={false}     
        />  

        <Button 
          label="eliminar" 
          icon={<Trash size="medium" color="black"/>}
          onClick={() => deleteShift(shift._id)}
          defaultValue={false} 
        />
      </Box>
    ),
  }, 
  
];
  //console.log(schedule);
  const newSchedule = schedule.map((shift) => {
    const newShift = {
      _id: shift._id,
      Id: schedule.indexOf(shift) + 1,
      startDate: epochTimeToDate(shift.startDate),
      endDate: epochTimeToDate(shift.endDate),
      chief: shift.chief,
      doctor: shift.doctor,
    };
    return newShift;
  }); 

  const updateShift = async(shift) => {
    //e.preventDefault();
    //console.log(currentUser);
    setCreatingShift(false);
    //console.log(shift);
    setCurrentShift({
      startDate: epochTimeToDate(shift.startDate),
      endDate: epochTimeToDate(shift.endDate),
      chief: shift.chief,
      doctor: shift.doctor,
    });
    setIsOpen(true);
    //(console.log(currentUser));
  }

  const createShift = (e) => {
    e.preventDefault();
    setCurrentShift(initialCurrentShiftState);
    setCreatingShift(true);
    setIsOpen(true);
  }

  const deleteOneShift = (shiftId) => {
    deleteUser(shiftId);
    fetchSchedule();
  }

  const closeModal = () => {
    setIsOpen(false);
  }

  return ( 
    <ScheduleContext.Provider value={{currentShift, setCurrentShift}}>
      <Modal 
        isOpen={isOpen}
        closeModal={closeModal}
      > 
        <ShiftManager 
          users={users}
          setUsers={setUsers}
          closeModal={closeModal}
          creatingShift={creatingShift}
          setCreatingShift={setCreatingShift}
        />
      </Modal>
        
      <Box align = "center" >
        <Button 
          primary 
          alignSelf="end"
          label="" 
          icon={<Add size="medium" color="black"/>}
          onClick={createShift}
        />
        <DataTable 
          resizeable = { true }
          paginate={true}
          sortable = { true }
          columns = { columns }
          data = { newSchedule }
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
    </ScheduleContext.Provider>  
  );
}

export default ScheduleTable
