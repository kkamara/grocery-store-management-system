import { editAdminProductPhotos, } from "../types"

const initState = {
  data: null,
  error: null,
  loading: false,
}

export default function editAdminProductPhotosReducer (state = initState, action) {
  switch (action.type) {
    
    case editAdminProductPhotos.UPDATE_ADMIN_PRODUCT_PHOTOS_ERROR:
      return {
        ...state,
        error: action.payload,
        loading: false,
      }
    
    case editAdminProductPhotos.UPDATE_ADMIN_PRODUCT_PHOTOS_PENDING:
      return {
        ...state,
        loading: true,
      }
    
    case editAdminProductPhotos.UPDATE_ADMIN_PRODUCT_PHOTOS_SUCCESS:
      return {
        ...state,
        data: action.payload,
        loading: false,
        error: null,
      }

    default:
      return state
  }
}
