/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React, { useContext } from "react"

import { UsersContext, ScheduleContext, initialCurrentShiftState } from "../ContextProvider"
import { createNewShift, updateShift } from '../helpers/CrudSchedule'

const ShiftManager = ({users, creatingShift, setCreatingShift, closeModal}) => {
  const  { currentShift, setCurrentShift }  = useContext(ScheduleContext);

  const updateField = async(e) => {
    e.preventDefault  
    //setCreatingShift(false);

    switch (e.target.name){
      case 'startDate':
        setCurrentShift(prevShift => ({...prevShift, startDate: e.target.value}));
        break;
      case 'endDate':
        setCurrentShift(prevShift => ({...prevShift, endDate: e.target.value}));
        break;
      case 'chief':
        setCurrentShift(prevShift => ({...prevShift, password: e.target.value}));
        break;
      case 'doctor':
        setCurrentShift(prevShift => ({...prevShift, telegramCallId: e.target.value}));
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
                  name="initDate"
                  className="form-control mt-1"
                  placeholder="Inicio"
                  value={ currentShift }
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
                  value={ currentShift }
                  onChange={updateField}
                />
              </div>
              <div className={`form-group mt-3`}>
                <label>Jefe de turno</label>
                <select 
                  name="chief" 
                  value={'Banana'}
                  onChange={updateField}  
                >
                  <option>Banana</option>
                  <option >Cherry</option>
                  <option>Lemon</option>
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