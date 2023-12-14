import { useAuth } from '@/context/auth-context'
import React from 'react'
import { Navigate } from 'react-router-dom'

export default function RoleGuard ({ redirect = false, role = null, children }) {
  const { isAuth, user } = useAuth()

  if (!role) {
    return <>{ children }</>
  }

  // if not auth then redirect to sign in
  if (!isAuth) {
    if (redirect) {
      return <Navigate to="/sign-in" />
    }
    return <></>;
  }

  // if not admin then redirect to dashboard
  if (Array.isArray(role)) {
    if (!role.includes(user.role)) {
      if (redirect) {
        return <Navigate to="/home" />
      }
      return <></>;
    }
  } else {
    if (user.role !== role) {
      if (redirect) {
        return <Navigate to="/home" />
      }
      return <></>;
    }
  }
  
  return <>{children}</>
} 