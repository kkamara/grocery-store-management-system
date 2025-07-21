import React, { useEffect, useState, } from "react"
import { Helmet, } from "react-helmet"
import { useNavigate, } from "react-router"
import { useDispatch, useSelector, } from "react-redux"
import { FaWindowClose, } from "react-icons/fa"
import { adminDashboardTitle, } from "../../../../constants"
import Error from "../../../layouts/Error"
import { getAdminCategories, } from "../../../../redux/actions/adminCategoriesActions"
import { getAdminManufacturers, } from "../../../../redux/actions/adminManufacturersActions"
import { newProduct, } from "../../../../redux/actions/createAdminProductActions"

import "./NewProductComponent.scss"

const defaultImageState = ""
const defaultNameState = "A Unique Product Name"
const defaultUnitsState = 1
const defaultWeightState = "0.01"
const defaultPriceState = "0.01"
const defaultDescriptionState = ""
const defaultCategoryState = "0"
const defaultManufacturerState = "0"

export default function NewProductComponent() {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const state = useSelector(state => ({
    adminAuth: state.adminAuth,
    adminCategories: state.adminCategories,
    adminManufacturers: state.adminManufacturers,
    createAdminProduct: state.createAdminProduct,
  }))
  // At least one image is required.
  const [image, setImage] = useState(defaultImageState)
  const [image1, setImage1] = useState(defaultImageState)
  const [image2, setImage2] = useState(defaultImageState)
  const [image3, setImage3] = useState(defaultImageState)
  const [image4, setImage4] = useState(defaultImageState)
  const [image5, setImage5] = useState(defaultImageState)
  const [image6, setImage6] = useState(defaultImageState)
  // Required fields.
  const [name, setName] = useState(defaultNameState)
  const [units, setUnits] = useState(defaultUnitsState)
  const [weight, setWeight] = useState(defaultWeightState)
  const [price, setPrice] = useState(defaultPriceState)
  // Non-required fields.
  const [description, setDescription] = useState(defaultDescriptionState)
  const [category, setCategory] = useState(defaultCategoryState)
  const [manufacturer, setManufacturer] = useState(defaultManufacturerState)

  const [error, setError] = useState("")

  useEffect(() => {
    if (
      false === state.adminAuth.loading &&
      null !== state.adminAuth.data
    ) {
      dispatch(getAdminCategories())
      dispatch(getAdminManufacturers())
    }
  }, [state.adminAuth])

  useEffect(() => {
    if (
      false === state.createAdminProduct.loading &&
      null !== state.createAdminProduct.data
    ) {
      setImage(defaultImageState)
      setImage1(defaultImageState)
      setImage2(defaultImageState)
      setImage3(defaultImageState)
      setImage4(defaultImageState)
      setImage5(defaultImageState)
      setImage6(defaultImageState)
      setName(defaultNameState)
      setUnits(defaultUnitsState)
      setWeight(defaultWeightState)
      setPrice(defaultPriceState)
      setDescription(defaultDescriptionState)
      setCategory(defaultCategoryState)
      setManufacturer(defaultManufacturerState)
      navigate("/admin/products")
    }
  }, [state.createAdminProduct])

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
    return false
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

  const handleNameChange = e => {
    setName(e.target.value)
  }

  const handleUnitsChange = e => {
    setUnits(e.target.value)
  }

  const handleWeightChange = e => {
    setWeight(e.target.value)
  }

  const handlePriceChange = e => {
    setPrice(e.target.value)
  }

  const handleDescriptionChange = e => {
    setDescription(e.target.value)
  }

  const handleCategoryChange = e => {
    setCategory(e.target.value)
  }

  const handleManufacturerChange = e => {
    setManufacturer(e.target.value)
  }

  const formHasError = () => {
    if (
      !image &&
      !image1 &&
      !image2 &&
      !image3 &&
      !image4 &&
      !image5 &&
      !image6
    ) {
      return "At least one image is required."
    }
    if (!name) {
      return "The name field is required."
    }
    if (!units) {
      return "The units field is required."
    }
    if (!weight) {
      return "The weight field is required."
    }
    return false
  }

  const getImages = () => {
    const results = []
    if (image) {
      results.push(image)
    }
    if (image1) {
      results.push(image1)
    }
    if (image2) {
      results.push(image2)
    }
    if (image3) {
      results.push(image3)
    }
    if (image4) {
      results.push(image4)
    }
    if (image5) {
      results.push(image5)
    }
    if (image6) {
      results.push(image6)
    }
    return results
  }

  const handleFormSubmit = e => {
    e.preventDefault()
    setError("")
    const err = formHasError()
    if (false !== err) {
      return setError(err)
    }
    const payload = new FormData()
    const images = getImages()
    for (const image of images) {
      payload.append("images", image)
    }
    // console.log("payload", [...payload])
    dispatch(newProduct(payload))
  }

  if (
    state.adminAuth.loading ||
    state.adminCategories.loading ||
    state.adminManufacturers.loading ||
    state.createAdminProduct.loading
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
                  value={name}
                  onChange={handleNameChange}
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
                  value={units}
                  onChange={handleUnitsChange}
                />
              </div>
              <div className="form-group">
                <label htmlFor="weight">Weight (kg)*:</label>
                <input
                  type="number"
                  name="weight"
                  id="weight"
                  className="form-control"
                  step="0.01"
                  value={weight}
                  onChange={handleWeightChange}
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
                  value={description}
                  onChange={handleDescriptionChange}
                ></textarea>
              </div>
              <div className="form-group">
                <label htmlFor="category">Category:</label>
                <select
                  type="number"
                  name="category"
                  id="category"
                  className="form-control"
                  value={category}
                  onChange={handleCategoryChange}
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
                  value={manufacturer}
                  onChange={handleManufacturerChange}
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
