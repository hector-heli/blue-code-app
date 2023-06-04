/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from "react"
import axios from "axios"

const Login = () => {
  const [userEmail, setUserEmail] = useState('');
  const [password, setPassword] = useState('');

  /* useEffect(() =>{
    updateField(e)
    
  }, [userEmail, password] )
 */
  const updateField = (e) => {
    e.preventDefault
    e.target.name === 'userMail'
    ? setUserEmail(e.target.value)
    : setPassword(e.target.value)

    console.log(e.target.value);
  }

  const setAuthToken = token => {
    if (token) {
        axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
    }
    else
        delete axios.defaults.headers.common["Authorization"];
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
/*  setUserEmail(e.target.value.userEmail);
    setPassword(e.target.value.password); */
    const res = await axios.post('http://localhost:3000/api/auth/signin', {
      email: userEmail,
      password: password,
    },{
      headers: {
        'Content-Type': 'application/json', 
        'x-access-token': 'admin',
        'Accept': '/'
      },
    })
    .then(res => {
      //console.info(res.data);
      const token = res.data.token;
      //set JWT token to local
      localStorage.setItem("token", token);
      setAuthToken(token);

      setUserEmail('');
      setPassword('');

      //redirect user to home page
      window.location.href = '/reports'
    })
    .catch(err => {
      console.log(err);
    })
  }

  const token = localStorage.getItem("token");
  if (token) {
      setAuthToken(token);
  }
  
  return (
    <div className="Auth-form-container card">
      <form className="Auth-form" onSubmit={handleSubmit}>
        <div className="Auth-form-content">
          <h3 className="Auth-form-title">Sign In</h3>
          {/* <div className="text-center">
            Not registered yet?{" "}
            <span className="link-primary" onClick={changeAuthMode}>
              Sign Up
            </span>
          </div> */}
          <div className="form-group mt-3">
            <label>Correo</label>
            <input
              className="form-control mt-1"
              type="text"
              id="userMail"
              name="userMail"
              value={userEmail}
              onChange={updateField}
              required
              placeholder="Enter email"
            />
          </div>
          <div className="form-group mt-3">
            <label>Password</label>
            <input
              className="form-control mt-1"
              type="password"
              id="password"
              name="password"
              value={password}
              onChange={updateField}
              required
              placeholder="Enter password"
            />
          </div>
          <div className="d-grid gap-2 mt-3">
            <button type="submit" className="btn btn-primary">
              Enviar
            </button>
          </div>
          <p className="text-center mt-2">
            Olvidó <a href="#">password?</a>
          </p>
        </div>
      </form>
    </div>
  )
}

export default Login