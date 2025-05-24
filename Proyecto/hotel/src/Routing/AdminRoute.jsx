import { Navigate } from 'react-router-dom';
import { useAuth } from '@Contexts/Auth/AuthContext.jsx'; // Adjust the import path as necessary

export default function AdminRoute({ children }) {
  const { user } = useAuth();
  return user ? children : <Navigate to="/login" replace />;
}