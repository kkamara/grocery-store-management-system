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
        <h1 className="h3 mb-0 text-gray-800">View Products</h1>
      </div>
      
      <div className="row">

        <div className="col-xl-12 col-lg-12">
          <div className="card shadow mb-4">
            <div className="card-body">
              <p>Show Products Table</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
