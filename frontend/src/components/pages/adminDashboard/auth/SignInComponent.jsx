import React, { useEffect, useState, } from "react"
import { useNavigate, } from "react-router-dom"
import { useDispatch, useSelector, } from "react-redux"
import { Helmet, } from "react-helmet"
import { login, authorize, } from "../../../../redux/actions/adminAuthActions"
import Error from "../../../layouts/Error"
import { adminDashboardTitle, } from "../../../../constants"

import AdminDashboardLogo from "../../../../assets/adminDashboard/images/admin-dashboard-logo.webp"

import "./SignInComponent.scss"

export default function LoginComponent() {
  const navigate = useNavigate()

  const [email, setEmail] = useState("admin@example.com")
  const [password, setPassword] = useState("secret")

  const dispatch = useDispatch()
  const state = useSelector(state => ({
    adminAuth: state.adminAuth,
  }))

  useEffect(() => {
    dispatch(authorize())
  }, [])

  useEffect(() => {
    if (state.adminAuth.data) {
      window.location.href = "/admin"
    }
  }, [state.adminAuth])

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

  if (state.adminAuth.loading) {
    return <div className="container dashboard-signin-container text-center">
      <Helmet>
        <title>Sign In - {adminDashboardTitle}</title>
      </Helmet>
      <p>Loading...</p>
    </div>
  }

  return <div className="container dashboard-signin-container">
    <Helmet>
      <title>Sign In - {adminDashboardTitle}</title>
    </Helmet>
    <div className="col-md-4 offset-md-4">
      <img
        alt="Admin Dashboard Logo"
        src={AdminDashboardLogo}
        className="dashboard-signin-logo"
      />
      <h1 className="login-lead fw-bold">Sign In</h1>
      <form method="post" onSubmit={onFormSubmit}>
        <Error error={state.adminAuth.error} />
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
          <input 
            type="submit" 
            className="btn btn-success login-submit-button ms-4" 
          />
        </div>
      </form>
    </div>
  </div>
}
