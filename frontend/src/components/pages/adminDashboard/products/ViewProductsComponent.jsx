import React, { useEffect, } from "react"
import { useDispatch, useSelector, } from "react-redux"
import { authorize, } from "../../../../redux/actions/adminAuthActions"

export default function ViewProductsComponent() {
  const dispatch = useDispatch()
  const state = useSelector(state => ({
    adminAuth: state.adminAuth,
  }))

  

  return (
    <div className="container-fluid">
      <div className="d-sm-flex align-items-center justify-content-between mb-4">
        <h1 className="h3 mb-0 text-gray-800">ViewProductsComponent</h1>
      </div>
    </div>
  )
}
