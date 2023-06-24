/* eslint-disable no-case-declarations */
/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React, { useEffect, useContext } from "react"

import { UsersContext, ScheduleContext, initialCurrentShiftState } from "../ContextProvider"
import { createNewShift, updateShift } from '../helpers/CrudSchedule'
import { getUsers } from "../helpers/CrudUsers"

const ShiftManager = ({users, setUsers, creatingShift, setCreatingShift, closeModal}) => {
  const  { currentShift, setCurrentShift }  = useContext(ScheduleContext);

  useEffect(() =>{
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
  
    const dataUsers = await getUsers();
    //console.log(dataUsers);
    setUsers(dataUsers);
    //console.log(users);

  };


  //console.log(users);

   //setCreatingShift(false);
   let epochStartTime;
   let epochEndTime;

  const updateField = async(e) => {
    e.preventDefault();  
   
    switch (e.target.name){
      case 'startDate':
        const startTime = new Date(e.target.value); 
        epochStartTime = startTime.getTime();
        setCurrentShift(prevShift => ({...prevShift, startDate: epochStartTime}));
        console.log(epochStartTime);
        break;
      case 'endDate':
        const endTime = new Date(e.target.value);
        epochEndTime = endTime.getTime();
        setCurrentShift(prevShift => ({...prevShift, endDate: epochEndTime}));
        console.log(epochEndTime);
        break;
        
      case 'chief':
        setCurrentShift(prevShift => ({...prevShift, chief: e.target.value}));
        console.log(e.target.value);
        break;
        
      case 'doctor':
        setCurrentShift(prevShift => ({...prevShift, doctor: e.target.value}));
        console.log(e.target.value);
        break;
      }
      console.log(currentShift);
    }

    const handleClick = (e) => {
      e.preventDefault();
      creatingShift? handleSubmit(): handleUpdate();
    }

    const handleSubmit = () => {
      createNewShift(currentShift);
      setCurrentShift(initialCurrentShiftState);
      setCreatingShift(false);
      closeModal()  ;
    }

    const handleUpdate = () => {
      updateShift(currentShift);
      setCurrentShift(initialCurrentShiftState);
      closeModal()  ;
    }

  return (
      <ScheduleContext.Provider value={currentShift}>
        <div className="Auth-form-container card max-widht-100">
          <form className="Auth-form" onSubmit={handleClick} >
            <div className="Auth-form-content">
              <h3 className="Auth-form-title">{"Creación de Turnos"}</h3>
              <div className="form-group mt-3">
                <label>Inicio de turno</label>
                <input
                  type="datetime-local"
                  name="startDate"
                  className="form-control mt-1"
                  defaultValue={ currentShift.startDate }
                  onChange={updateField}
                />
              </div>
              <div className="form-group mt-3">
                <label>Fin de turno</label>
                <input
                  type="datetime-local"
                  name="endDate"
                  className="form-control mt-1"
                  placeholder="Fin"
                  defaultValue={ currentShift.endDate }
                  onChange={updateField}
                />
              </div>
              <div className={`form-group mt-3`}>
                <label>Jefe de turno ....</label>
                <select 
                  name="chief" 
                  defaultValue={''}
                  onChange={updateField}  
                  //value={currentShift.chief}
                >
                  <option> </option>
                  {users.map(user=>(
                    <option key={user._id}>{user.username}</option>
                  ))}
                  {/* <option>Banana</option>
                  <option >Cherry</option>
                  <option>Lemon</option> */}
                </select>
              </div>
              <div className={`form-group mt-3`}>
                <label>Médico ...............</label>
                <select 
                  name="doctor" 
                  defaultValue={''}
                  onChange={updateField} 
                  //value={currentShift.doctor} 
                >
                  <option> </option>  
                  {users.map(user=>(
                    <option key={user._id}>{user.username}</option>
                  ))}
                </select>
              </div>
              
            </div>
            <div className="d-grid gap-2 mt-3">
            <button 
              type="submit" 
              className="btn btn-primary" 
            > Enviar </button>
          </div>
        </form>
        </div>
      </ScheduleContext.Provider>
  )
}

export default ShiftManager;