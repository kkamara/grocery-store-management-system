import React, { useEffect, useState, } from "react"
import { useNavigate, } from "react-router-dom"
import { useDispatch, useSelector, } from "react-redux"
import { Helmet, } from "react-helmet"
import { login, authorize, } from "../../../redux/actions/authActions"
import Error from "../../layouts/Error"

import "./SignInComponent.scss"

export default function SignInComponent() {
  const navigate = useNavigate()

  const [email, setEmail] = useState("guest@example.com")
  const [password, setPassword] = useState("secret")

  const dispatch = useDispatch()
  const state = useSelector(state => ({
    auth: state.auth,
  }))

  useEffect(() => {
    dispatch(authorize())
  }, [])

  useEffect(() => {
    if (state.auth.data) {
      window.location.href = "/"
    }
  }, [state.auth])

  const onFormSubmit = (e) => {
    e.preventDefault()

    dispatch(login({ email, password, }))

    setEmail("")
    setPassword("")
  }

  const onEmailChange = (e) => {
    setEmail(e.target.value)
  }

  const onPasswordChange = (e) => {
    setPassword(e.target.value)
  }

  if (state.auth.loading) {
    return <div className="container signin-container text-center">
      <Helmet>
        <title>Sign In - {process.env.REACT_APP_NAME}</title>
      </Helmet>
      <p>Loading...</p>
    </div>
  }

  return <div className="container signin-container">
    <Helmet>
      <title>Sign In - {process.env.REACT_APP_NAME}</title>
    </Helmet>
    <div className="col-md-4 offset-md-4">
      <h1 className="login-lead fw-bold">Sign In</h1>
      <form method="post" onSubmit={onFormSubmit}>
        <Error error={state.auth.error} />
        <div className="form-group">
          <label htmlFor="email">Email</label>
          <input 
            name="email" 
            className="form-control"
            value={email}
            onChange={onEmailChange}
          />
        </div>
        <div className="form-group">
          <label htmlFor="password">Password</label>
          <input 
            type="password"
            name="password" 
            className="form-control"
            value={password}
            onChange={onPasswordChange}
          />
        </div>
        <div className="login-buttons-container mt-3 text-end">
          <a 
            href="/user/register" 
            className="btn btn-primary"
          >
            Register
          </a>
          <input 
            type="submit" 
            className="btn btn-success login-submit-button ms-4" 
          />
        </div>
      </form>
    </div>
  </div>
}
