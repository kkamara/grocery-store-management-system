import React, { useEffect, } from "react"
import { useDispatch, useSelector, } from "react-redux"
import { Helmet, } from "react-helmet"
import { searchAdminProducts, } from "../../../../redux/actions/adminSearchProductsActions"
import { adminDashboardTitle, } from "../../../../constants"

export default function ViewProductsComponent() {
  const dispatch = useDispatch()
  const state = useSelector(state => ({
    adminAuth: state.adminAuth,
    adminSearchProducts: state.adminSearchProducts,
  }))

  useEffect(() => {
    if (false === state.adminAuth.loading && state.adminAuth.data) {
      dispatch(searchAdminProducts())
    }
  }, [state.adminAuth])

  if (state.adminAuth.loading || state.adminSearchProducts.loading) {
    return (
      <div className="container dashboard-products-container text-center">
        <Helmet>
          <title>View Products - {adminDashboardTitle}</title>
        </Helmet>
        <p>Loading...</p>
      </div>
    )
  }

  return (
    <div className="container-fluid dashboard-products-container">
      <Helmet>
        <title>View Products - {adminDashboardTitle}</title>
      </Helmet>
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
