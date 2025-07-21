import React, { useEffect, useState, } from "react"
import { Helmet, } from "react-helmet"
import { Navigate, } from "react-router"
import { useDispatch, useSelector, } from "react-redux"
import { FaWindowClose, } from "react-icons/fa"
import { adminDashboardTitle, } from "../../../../constants"
import Error from "../../../layouts/Error"
import { getAdminCategories, } from "../../../../redux/actions/adminCategoriesActions"
import { getAdminManufacturers, } from "../../../../redux/actions/adminManufacturersActions"

import "./NewProductComponent.scss"

export default function NewProductComponent() {
  const dispatch = useDispatch()
  const state = useSelector(state => ({
    adminAuth: state.adminAuth,
    adminCategories: state.adminCategories,
    adminManufacturers: state.adminManufacturers,
  }))
  const [image, setImage] = useState("")
  const [image1, setImage1] = useState("")
  const [image2, setImage2] = useState("")
  const [image3, setImage3] = useState("")
  const [image4, setImage4] = useState("")
  const [image5, setImage5] = useState("")
  const [image6, setImage6] = useState("")

  const [price, setPrice] = useState("0.01")

  const [error, setError] = useState("")

  useEffect(() => {
    if (
      false === state.adminAuth.loading &&
      false !== state.adminAuth.data
    ) {
      dispatch(getAdminCategories())
      dispatch(getAdminManufacturers())
    }
  }, [state.adminAuth])

  const handleSetImage = e => {
    if (false !== imageError(e.target.files[0].type)) {
      return null
    }
    setImage(e.target.files[0])
  }

  const handleSetImage1 = e => {
    if (false !== imageError(e.target.files[0].type)) {
      return null
    }
    setImage1(e.target.files[0])
  }

  const handleSetImage2 = e => {
    if (false !== imageError(e.target.files[0].type)) {
      return null
    }
    setImage2(e.target.files[0])
  }

  const handleSetImage3 = e => {
    if (false !== imageError(e.target.files[0].type)) {
      return null
    }
    setImage3(e.target.files[0])
  }

  const handleSetImage4 = e => {
    if (false !== imageError(e.target.files[0].type)) {
      return null
    }
    setImage4(e.target.files[0])
  }

  const handleSetImage5 = e => {
    if (false !== imageError(e.target.files[0].type)) {
      return null
    }
    setImage5(e.target.files[0])
  }

  const handleSetImage6 = e => {
    if (false !== imageError(e.target.files[0].type)) {
      return null
    }
    setImage6(e.target.files[0])
  }

  const imageError = type => {
    if (null === type.match(/(jpg|jpeg|png|webp)$/i)) {
      return setError(
        "Invalid file extension. We take JPG, JPEG, PNG and WEBP."
      )
    }
    return null
  }

  const resetFileInput = imageIdToReset => {
    switch(imageIdToReset) {
      case 0:
        document.getElementById("image-0").value = ""
        setImage("")
        break;
      case 1:
        document.getElementById("image-1").value = ""
        setImage1("")
        break;
      case 2:
        document.getElementById("image-2").value = ""
        setImage2("")
        break;
      case 3:
        document.getElementById("image-3").value = ""
        setImage3("")
        break;
      case 4:
        document.getElementById("image-4").value = ""
        setImage4("")
        break;
      case 5:
        document.getElementById("image-5").value = ""
        setImage5("")
        break;
      case 6:
        document.getElementById("image-6").value = ""
        setImage6("")
        break;
    }
  }
  const handlePriceChange = e => {
    setPrice(e.target.value)
  }

  const handleFormSubmit = e => {
    e.preventDefault()
  }

  if (
    state.adminAuth.loading ||
    state.adminCategories.loading ||
    state.adminManufacturers.loading
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
    <form
      className="container-fluid dashboard-new-product-container"
      onSubmit={handleFormSubmit}
    >
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

      <Error error={error} />

      <div className="row">

        <div className="col-xl-6 col-lg-6">
          <div className="card shadow mb-4">
            <div className="card-body">
              <div className="form-group">
                <input
                  type="file"
                  name="image[0]"
                  id="image-0"
                  className="form-control image-file-input"
                  onChange={handleSetImage}
                />
                <FaWindowClose
                  className="reset-file-input-icon"
                  onClick={() => resetFileInput(0)}
                />
              </div>
              <div className="form-group">
                <input
                  type="file"
                  name="image[1]"
                  id="image-1"
                  className="form-control image-file-input"
                  onChange={handleSetImage1}
                />
                <FaWindowClose
                  className="reset-file-input-icon"
                  onClick={() => resetFileInput(1)}
                />
              </div>
              <div className="form-group">
                <input
                  type="file"
                  name="image[2]"
                  id="image-2"
                  className="form-control image-file-input"
                  onChange={handleSetImage2}
                />
                <FaWindowClose
                  className="reset-file-input-icon"
                  onClick={() => resetFileInput(2)}
                />
              </div>
              <div className="form-group">
                <input
                  type="file"
                  name="image[3]"
                  id="image-3"
                  className="form-control image-file-input"
                  onChange={handleSetImage3}
                />
                <FaWindowClose
                  className="reset-file-input-icon"
                  onClick={() => resetFileInput(3)}
                />
              </div>
              <div className="form-group">
                <input
                  type="file"
                  name="image[4]"
                  id="image-4"
                  className="form-control image-file-input"
                  onChange={handleSetImage4}
                />
                <FaWindowClose
                  className="reset-file-input-icon"
                  onClick={() => resetFileInput(4)}
                />
              </div>
              <div className="form-group">
                <input
                  type="file"
                  name="image[5]"
                  id="image-5"
                  className="form-control image-file-input"
                  onChange={handleSetImage5}
                />
                <FaWindowClose
                  className="reset-file-input-icon"
                  onClick={() => resetFileInput(5)}
                />
              </div>
              <div className="form-group">
                <input
                  type="file"
                  name="image[6]"
                  id="image-6"
                  className="form-control image-file-input"
                  onChange={handleSetImage6}
                />
                <FaWindowClose
                  className="reset-file-input-icon"
                  onClick={() => resetFileInput(6)}
                />
              </div>
            </div>
          </div>
        </div>
        
        <div className="col-xl-6 col-lg-6">
          <div className="card shadow mb-4">
            <div className="card-body">
              <div className="form-group">
                <label htmlFor="name">Name*:</label>
                <input
                  type="text"
                  name="name"
                  id="name"
                  className="form-control"
                />
              </div>
              <div className="form-group">
                <label htmlFor="units">Units*:</label>
                <input
                  type="number"
                  name="units"
                  id="units"
                  className="form-control"
                  step="1"
                />
              </div>
              <div className="form-group">
                <label htmlFor="weight">Weight*:</label>
                <input
                  type="number"
                  name="weight"
                  id="weight"
                  className="form-control"
                  step="1"
                />
              </div>
              <div className="form-group">
                <label htmlFor="price">Price (GBP)*:</label>
                <input
                  type="number"
                  name="price"
                  id="price"
                  className="form-control"
                  value={price}
                  onChange={handlePriceChange}
                  step="0.01"
                  min="0.01"
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
                  <option value="0">Please select a category</option>
                  {state.adminCategories.data.map(({ id, name }) => (
                    <option key={id} value={id}>{name}</option>
                  ))}
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
                  <option value="0">Please select a manufacturer</option>
                  {state.adminManufacturers.data.map(({ id, name }) => (
                    <option key={id} value={id}>{name}</option>
                  ))}
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
