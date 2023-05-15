import axios from 'axios'

export const login = (email, password) => {
  return axios.post('http://localhost:3000/login', {
    email,
    password
  })
}
