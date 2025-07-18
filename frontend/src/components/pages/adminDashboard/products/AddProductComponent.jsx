import React, { useEffect, } from "react"
import { Helmet, } from "react-helmet"
import { Navigate, } from "react-router"
import { useDispatch, useSelector, } from "react-redux"
import { FaWindowClose, } from "react-icons/fa"
import { adminDashboardTitle, } from "../../../../constants"

import "./AddProductComponent.scss"

export default function ProductComponent() {
  const dispatch = useDispatch()
  const state = useSelector(state => ({
    adminAuth: state.adminAuth,
  }))

  useEffect(() => {
    if (
      false === state.adminAuth.loading &&
      false !== state.adminAuth.data
    ) {
      // dispatch(getAdminProduct(productSlug))
    }
  }, [state.adminAuth])

  const resetFileInput = () => {}

  if (
    state.adminAuth.loading
  ) {
    return (
      <div className="container dashboard-new-product-container text-center">
        <Helmet>
          <title>Add a New Product - {adminDashboardTitle}</title>
        </Helmet>
        <p>Loading...</p>
      </div>
    )
  }

  return (
    <form className="container-fluid dashboard-new-product-container">
      <Helmet>
        <title>
          Add a New Product - {adminDashboardTitle}
        </title>
      </Helmet>
      <div className="d-sm-flex align-items-center justify-content-between mb-4">
        <h1 className="h3 mb-0 text-gray-800">
          Add a New Product
        </h1>
      </div>

      <div className="row">

        <div className="col-xl-6 col-lg-6">
          <div className="card shadow mb-4">
            <div className="card-body">
              <div className="form-group">
                <input
                  type="file"
                  name="image[0]"
                  className="form-control image-file-input"
                />
                <FaWindowClose
                  className="reset-file-input-icon"
                  onClick={resetFileInput}
                />
              </div>
              <div className="form-group">
                <input
                  type="file"
                  name="image[1]"
                  className="form-control image-file-input"
                />
                <FaWindowClose
                  className="reset-file-input-icon"
                  onClick={resetFileInput}
                />
              </div>
              <div className="form-group">
                <input
                  type="file"
                  name="image[2]"
                  className="form-control image-file-input"
                />
                <FaWindowClose
                  className="reset-file-input-icon"
                  onClick={resetFileInput}
                />
              </div>
              <div className="form-group">
                <input
                  type="file"
                  name="image[3]"
                  className="form-control image-file-input"
                />
                <FaWindowClose
                  className="reset-file-input-icon"
                  onClick={resetFileInput}
                />
              </div>
              <div className="form-group">
                <input
                  type="file"
                  name="image[4]"
                  className="form-control image-file-input"
                />
                <FaWindowClose
                  className="reset-file-input-icon"
                  onClick={resetFileInput}
                />
              </div>
              <div className="form-group">
                <input
                  type="file"
                  name="image[5]"
                  className="form-control image-file-input"
                />
                <FaWindowClose
                  className="reset-file-input-icon"
                  onClick={resetFileInput}
                />
              </div>
              <div className="form-group">
                <input
                  type="file"
                  name="image[6]"
                  className="form-control image-file-input"
                />
                <FaWindowClose
                  className="reset-file-input-icon"
                  onClick={resetFileInput}
                />
              </div>
            </div>
          </div>
        </div>
        
        <div className="col-xl-6 col-lg-6">
          <div className="card shadow mb-4">
            <div className="card-body">
              <div className="form-group">
                <label htmlFor="name">Name:</label>
                <input
                  type="text"
                  name="name"
                  id="name"
                  className="form-control"
                />
              </div>
              <div className="form-group">
                <label htmlFor="units">Units:</label>
                <input
                  type="number"
                  name="units"
                  id="units"
                  className="form-control"
                  step="1"
                />
              </div>
              <div className="form-group">
                <label htmlFor="weight">Weight:</label>
                <input
                  type="number"
                  name="weight"
                  id="weight"
                  className="form-control"
                  step="1"
                />
              </div>
              <div className="form-group">
                <label htmlFor="price">Price (GBP):</label>
                <input
                  type="number"
                  name="price"
                  id="price"
                  className="form-control"
                />
              </div>
              <div className="form-group">
                <label htmlFor="description">Description:</label>
                <textarea
                  type="number"
                  name="description"
                  id="description"
                  className="form-control"
                ></textarea>
              </div>
              <div className="form-group">
                <label htmlFor="category">Category:</label>
                <select
                  type="number"
                  name="category"
                  id="category"
                  className="form-control"
                >
                  <option value="1">Example Category</option>
                </select>
              </div>
              <div className="form-group">
                <label htmlFor="manufacturer">Manufacturer:</label>
                <select
                  type="number"
                  name="manufacturer"
                  id="manufacturer"
                  className="form-control"
                >
                  <option value="1">Example Manufacturer</option>
                </select>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="row">
        <div className="col-xl-12 col-lg-12">
          <div className="card">
            <div className="card-body">
              <div className="float-end">
                <input
                  type="submit"
                  className="btn btn-success"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </form>
  )
}
