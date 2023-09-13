import React from 'react';
import { Navigate } from 'react-router-dom';
import { useQuery } from 'react-query';
import { useAuthUser } from 'react-auth-kit';

const RoleBasedRoute = ({ path, element, requiredRoles }) => {
  const authUser = useAuthUser(); // This should be an object, not a function
  const name = authUser().name; // Access the user name directly

  // Fetch user data using React Query
  const { data: userData, isLoading, isError } = useQuery('userData', async () => {
    try {
      // Fetch user data from the API using the user's name
      const response = await fetch(`http://localhost:5000/users/${name}`); // Replace with your API endpoint

      if (!response.ok) {
        throw new Error('Failed to fetch user data');
      }

      const userData = await response.json();

      if (!userData || !userData.roles) {
        throw new Error('User data or roles not available');
      }

      return userData;
    } catch (error) {
      console.error('Error fetching user data:', error);
      throw error;
    }
  });

  if (isLoading) {
    // Loading state, you can render a loading indicator here
    return <div className='flex justify-center items-center h-screen'>
      <span className="loading loading-bars loading-lg"></span>
    </div>;
  }

  if (isError || !userData || !Array.isArray(userData.roles)) {
    // Handle errors or unauthenticated users here
    return <Navigate to="/signin" replace={true} />;
  }

  // Check if the user has one of the required roles
  const hasRequiredRole = requiredRoles.some((role) =>
    userData.roles.includes(role)
  );

  return hasRequiredRole ? element : <Navigate to="/unauthorized" replace={true} />;
};

export default RoleBasedRoute;
