// import React, { useEffect, useState } from 'react';
// import { Route, useNavigate } from 'react-router-dom';

// const ProtectedRoute = ({ isAuthenticated, ...props }) => {
//     const navigate = useNavigate();
//     const [redirected, setRedirected] = useState(false);

//     useEffect(() => {
//         if (!isAuthenticated && !redirected) {
//             // Redirect the user to the login page or any other appropriate route
//             navigate('/singin');
//             setRedirected(true);
//         }
//     }, [isAuthenticated, navigate, redirected]);

//     if (!isAuthenticated) {
//         return null; // You can return null or render a loading/spinner component
//     }

//     return <Route {...props} />;
// };

// export default ProtectedRoute;
