import { useAuth } from '@/context/auth-context'
import React from 'react'
import { Navigate } from 'react-router-dom'

export default function GuestGuard({ redirect = true, children }) {
  const { isAuth } = useAuth();

  // if auth then redirect to dashboard
  if (isAuth) {
    if (redirect) {
      return <Navigate to="/home" />;
    }
    return <></>;
  }

  return <>{children}</>;
}
