import React from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
import { Error } from '../pages/Error';
import { routes } from '../router/routes';

export const AppRouter = () => {
  return (
    <>
      <Routes>
        <Route path="/" element={<Navigate to="/posts" replace />} />
				{/* <Route path="/" element={<Home />} /> */}
				
        {routes.map((route) => (
          <Route
            key={route.path}
            element={route.component}
            path={route.path}
            exact={route.exact}
					/>
        ))}
        
        <Route path="*" element={<Error />} />
      </Routes>
    </>
  );
};
