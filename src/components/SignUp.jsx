/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React, { useContext } from "react"

import { UsersContext, initialCurrentUserState } from "../ContextProvider"
import { createNewUser, updateUser } from '../helpers/CrudUsers'

const SignUp = ({creatingUser, setCreatingUser, closeModal}) => {
  const  {currentUser, setCurrentUser}  = useContext(UsersContext);
    const updateField = async(e) => {
    e.preventDefault  
    //setCreatingUser(false);
    const updatedRoles = [...currentUser.roles]; // Crear una nueva copia del array roles

    switch (e.target.name){
      case 'name':
        setCurrentUser(prevUser => ({...prevUser, username: e.target.value}));
        break;
      case 'email':
        setCurrentUser(prevUser => ({...prevUser, email: e.target.value}));
        break;
      case 'password':
        setCurrentUser(prevUser => ({...prevUser, password: e.target.value}));
        break;
      case 'callId':
        setCurrentUser(prevUser => ({...prevUser, telegramCallId: e.target.value}));
        break;
      case 'user':
        (e.target.checked)
        ? updatedRoles[0] = "usuario" // Actualizar la primera posición del array
        : updatedRoles[0] = ""; // Vaciar la primera posición del array
        setCurrentUser(prevUser => ({ ...prevUser, roles: updatedRoles }));
        break;
      case 'moderator':
        (e.target.checked)
        ? updatedRoles[1] = "moderador" // Actualizar la primera posición del array
        : updatedRoles[1] = ""; // Vaciar la primera posición del array
        await setCurrentUser(prevUser => ({ ...prevUser, roles: updatedRoles }));
        break;
        case 'admin':
        (e.target.checked)
        ? updatedRoles[2] = "admin" // Actualizar la primera posición del array
        : updatedRoles[2] = ""; // Vaciar la primera posición del array
        await setCurrentUser(prevUser => ({ ...prevUser, roles: updatedRoles }));
        break;
      }
      console.log(currentUser);
    }

    const handleClick = (e) => {
      e.preventDefault();
      creatingUser? handleSubmit(): handleUpdate();
    }

    const handleSubmit = () => {
      createNewUser(currentUser);
      setCurrentUser(initialCurrentUserState);
      setCreatingUser(false);
      closeModal()  ;
    }

    const handleUpdate = () => {
      updateUser(currentUser);
      setCurrentUser(initialCurrentUserState);
      closeModal()  ;
    }

  return (
    <UsersContext.Provider value={currentUser}>
      <div className="Auth-form-container card max-widht-100">
        <form className="Auth-form" onSubmit={handleClick} >
          <div className="Auth-form-content">
            <h3 className="Auth-form-title">{"Gestión de Usuario"}</h3>
            <div className="form-group mt-3">
              <label>Nombre de Usuario</label>
              <input
                type="text"
                name="name"
                className="form-control mt-1"
                placeholder="Nombre"
                value={ currentUser.username }
                onChange={updateField}
              />
            </div>
            <div className="form-group mt-3">
              <label>Email</label>
              <input
                type="email"
                name="email"
                className="form-control mt-1"
                placeholder="Email Address"
                value={ currentUser.email}
                onChange={updateField}
              />
            </div>
            <div className={`form-group mt-3`}>
              <label>Password</label>
              <input
                type="password"
                name="password"
                className="form-control mt-1"
                placeholder="Password"
                value={currentUser.password}
                onChange={updateField}

              />
            </div>
            <div className="form-group mt-3">
              <label>Id de Telegram</label>
              <input
                type="text"
                name="callId"
                className="form-control mt-1"
                placeholder="CALL_ID"
                value={ currentUser.telegramCallId }
                onChange={updateField}

              />
            </div>
            <div className="form-group mt-3 flex">           
              <h5>Asigne los roles del usuario</h5>
              <ul className="grid">
                <li>
                  <label htmlFor="user">Usuario</label>
                  <input
                    type="checkbox"
                    id="user"
                    name="user"
                    value="usuario"
                    checked = { currentUser.roles===undefined? false : currentUser.roles.find(role=>role.name ==='usuario') }
                    onChange={updateField}
                    
                    />
                </li>
                <li>
                  <label htmlFor="moderator">Moderador</label>
                  <input 
                    type="checkbox" 
                    id="moderator" 
                    name="moderator" 
                    value="moderador" 
                    checked = { currentUser.roles===undefined? false : currentUser.roles.find(role=>role.name ==='moderador') }
                    onChange={updateField}
                  />
                    
                </li>
                <li>
                  <label htmlFor="admin">Administrador</label>  
                  <input 
                    type="checkbox" 
                    id="admin" 
                    name="admin" 
                    value="admin"
                    checked = { currentUser.roles===undefined? false : currentUser.roles.find(role=>role.name ==='admin') }
                    onChange={updateField}
                  />
                </li>
              </ul>
            </div>
            <div className="d-grid gap-2 mt-3">
              <button 
                type="submit" 
                className="btn btn-primary" 
              >
                
                Enviar
              </button>
            </div>
          </div>
        </form>
      </div>
    </UsersContext.Provider>
    )
}

export default SignUp