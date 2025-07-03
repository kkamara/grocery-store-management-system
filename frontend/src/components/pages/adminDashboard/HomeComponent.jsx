import React, { useEffect, } from "react"
import { useDispatch, useSelector, } from "react-redux"
import { Helmet } from "react-helmet"
import { authorize, } from "../../../redux/actions/adminAuthActions"
import Error from "../../layouts/Error"
import { adminDashboardTitle, } from "../../../constants"
import { getAdminProductsCountStat, } from "../../../redux/actions/adminProductsCountStatActions"
import { getAdminPastMonthOrdersCountStat, } from "../../../redux/actions/adminPastMonthOrdersCountStatActions"
import { getAdminOngoingShipmentsPercentageStat, } from "../../../redux/actions/adminOngoingShipmentsPercentageStatActions"
import { getAdminGuestUsersCountStat, } from "../../../redux/actions/adminGuestUsersCountStatActions"

export default function HomeComponent() {
  const dispatch = useDispatch()
  const state = useSelector((state) => ({
    adminAuth: state.adminAuth,
    adminProductsCountStat: state.adminProductsCountStat,
    adminPastMonthOrdersCountStat: state.adminPastMonthOrdersCountStat,
    adminOngoingShipmentsPercentageStat: state.adminOngoingShipmentsPercentageStat,
    adminGuestUsersCountStat: state.adminGuestUsersCountStat,
  }))

  useEffect(() => {
    dispatch(authorize())
  }, [])

  useEffect(() => {
    if (false === state.adminAuth.loading && !state.adminAuth.data) {
      window.location.href = "/admin/signin"
    }
    if (false === state.adminAuth.loading && state.adminAuth.data) {
      dispatch(getAdminProductsCountStat())
      dispatch(getAdminPastMonthOrdersCountStat())
      dispatch(getAdminOngoingShipmentsPercentageStat())
      dispatch(getAdminGuestUsersCountStat())
    }
  }, [state.adminAuth])

  if (
    state.adminAuth.loading ||
    state.adminProductsCountStat.loading ||
    state.adminPastMonthOrdersCountStat.loading ||
    state.adminOngoingShipmentsPercentageStat.loading ||
    state.adminGuestUsersCountStat.loading
  ) {
    return (
      <div className="container dashboard-home-container text-center">
        <Helmet>
          <title>Dashboard Home - {adminDashboardTitle}</title>
        </Helmet>
        <p>Loading...</p>
      </div>
    )
  }

  return (
    <div className="container-fluid">
      <div className="d-sm-flex align-items-center justify-content-between mb-4">
        <h1 className="h3 mb-0 text-gray-800">Dashboard</h1>
        <a
          href="#"
          className="d-none d-sm-inline-block btn btn-sm btn-primary shadow-sm"
        >
          <i className="fas fa-download fa-sm text-white-50"></i> Generate
          Report
        </a>
      </div>

      <div className="row">
        <div className="col-xl-3 col-md-6 mb-4">
          <div className="card border-left-primary shadow h-100 py-2">
            <div className="card-body">
              <div className="row no-gutters align-items-center">
                <div className="col mr-2">
                  <div className="text-xs font-weight-bold text-primary text-uppercase mb-1">
                    Products
                  </div>
                  <div className="h5 mb-0 font-weight-bold text-gray-800">
                    {state.adminProductsCountStat.data}
                  </div>
                </div>
                <div className="col-auto">
                  <i className="fas fa-calendar fa-2x text-gray-300"></i>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="col-xl-3 col-md-6 mb-4">
          <div className="card border-left-success shadow h-100 py-2">
            <div className="card-body">
              <div className="row no-gutters align-items-center">
                <div className="col mr-2">
                  <div className="text-xs font-weight-bold text-success text-uppercase mb-1">
                    Past Month Orders
                  </div>
                  <div className="h5 mb-0 font-weight-bold text-gray-800">
                    {state.adminPastMonthOrdersCountStat.data}
                  </div>
                </div>
                <div className="col-auto">
                  <i className="fas fa-dollar-sign fa-2x text-gray-300"></i>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="col-xl-3 col-md-6 mb-4">
          <div className="card border-left-info shadow h-100 py-2">
            <div className="card-body">
              <div className="row no-gutters align-items-center">
                <div className="col mr-2">
                  <div className="text-xs font-weight-bold text-info text-uppercase mb-1">
                    Ongoing Shipments
                  </div>
                  <div className="row no-gutters align-items-center">
                    <div className="col-auto">
                      <div className="h5 mb-0 mr-3 font-weight-bold text-gray-800">
                        {state.adminOngoingShipmentsPercentageStat.data}
                      </div>
                    </div>
                    <div className="col">
                      <div className="progress progress-sm mr-2">
                        <div
                          className="progress-bar bg-info"
                          role="progressbar"
                          style={{ width: state.adminOngoingShipmentsPercentageStat.data }}
                          aria-valuenow="50"
                          aria-valuemin="0"
                          aria-valuemax="100"
                        ></div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="col-auto">
                  <i className="fas fa-clipboard-list fa-2x text-gray-300"></i>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="col-xl-3 col-md-6 mb-4">
          <div className="card border-left-warning shadow h-100 py-2">
            <div className="card-body">
              <div className="row no-gutters align-items-center">
                <div className="col mr-2">
                  <div className="text-xs font-weight-bold text-warning text-uppercase mb-1">
                    Guest Users
                  </div>
                  <div className="h5 mb-0 font-weight-bold text-gray-800">
                    {state.adminGuestUsersCountStat.data}
                  </div>
                </div>
                <div className="col-auto">
                  <i className="fas fa-comments fa-2x text-gray-300"></i>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
