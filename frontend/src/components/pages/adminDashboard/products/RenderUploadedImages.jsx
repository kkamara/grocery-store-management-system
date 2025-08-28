import React from "react"
import { FaWindowClose, } from "react-icons/fa"

import "./RenderUploadedImages.scss"

export default function RenderUploadedImages({ photos, resetUploadedPhoto, }) {
  return <div className="row render-uploaded-images-container">
    {photos.map((photo, index) => (
      <div key={index} className="col-md-4">
        <div className="card">
          <div className="card-body">
            <img
              className={`img-fluid product-image ${photo.reset ? "reset-photo" : null}`}
              src={photo.path}
              alt={photo.name}
            />
            <FaWindowClose
              className="reset-uploaded-file-input-icon"
              onClick={() => resetUploadedPhoto(photo.id)}
            />
          </div>
        </div>
      </div>
    ))}
  </div>
}
