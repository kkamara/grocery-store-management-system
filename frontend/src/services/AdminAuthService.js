import HttpService from "./HttpService"

export const LoginUserService = (credentials) => {
  const http = new HttpService()
  const tokenId = "user-token"
  
  return http.postData("/admin/user", credentials)
    .then(response => {
      localStorage.setItem(tokenId, response.data.data.authToken)
      return response.data
    })
    .catch(err => { throw err })
}

export const AuthorizeUserService = () => {
  const http = new HttpService()
  const tokenId = "user-token"
  
  return http.getData("/admin/user/authorize", tokenId)
    .then(response => {
      return response.data
    })
    .catch(err => { throw err })
}

export const LogoutUserService = () => {
  const http = new HttpService()
  const tokenId = "user-token"
  return http.getData("/admin/users/logout", tokenId)
    .then((response) => {
      if (null !== localStorage.getItem(tokenId)) {
        localStorage.removeItem(tokenId)
      }
      window.location = "/user/signin"
      return response.data
    })
    .catch(err => { throw err })
}