import { useAuth } from '@/context/auth-context'
import React from 'react'
import { Redirect } from 'react-router-dom'

export default function RoleGuard ({ redirect = false, role = null, children }) {
  const role = props.role;
  const { isAuth, user } = useAuth()

  if (!role) {
    return <>{ children }</>
  }

  // if not auth then redirect to sign in
  if (!isAuth) {
    if (redirect) {
      return <Redirect to="/sign-in" />
    }
    return <></>;
  }

  // if not admin then redirect to dashboard
  if (user.role !== role) {
    if (redirect) {
      return <Redirect to="/home" />
    }
    return <></>;
  }

  return <>{children}</>
} 