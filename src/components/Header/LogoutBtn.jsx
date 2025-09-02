import React from 'react'
import { useDispatch } from 'react-redux'
import authService from '../../appwrite/auth'
import { logout } from '../../store/authSlice'

function LogoutBtn() {
    const dispatch = useDispatch()
    const logoutHandler = () => {
        authService.logout().then(() => {
            dispatch(logout())
        })
    }
  return (
    <button
    className='py-2 px-4 bg-red-500 text-white rounded-full hover:bg-red-600 transition-colors duration-300'
    onClick={logoutHandler}
    >
        Logout
    </button>
  )
}

export default LogoutBtn