import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useContext } from 'react';
import { AuthContext } from '@/hooks/UseAuth';
export default function Protected({ children, authentication = false,redirectPath = '/' }) {
  const navigate = useNavigate();
 
  // const { authStatus } = useAuth();
  const {authStatus} = useContext(AuthContext)

  useEffect(() => {
    // For protected routes (authentication = true)
    if (authentication && !authStatus) {
      navigate('/login', { replace: true });
      return;
    }

    // For public only routes (authentication = false)
    if (!authentication && authStatus) {
      navigate(redirectPath, { replace: true });
      return;
    }


  }, [authStatus, navigate, authentication, redirectPath]);
  

  return <>{children}</>;
}
