import FormLogin from '../../components/login/FormLogin'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

export default function Login() {
  return (
    <div className = 'body1'>
    <div className='center'>
      <div className='image'>
        <img src='/imgs/backgroundLogin.jpg' alt='udea' />
      </div>
      <FormLogin />
      <ToastContainer position="top-left" autoClose={4000} />
    </div>
    </div>

    
  )
}
