import React, { useContext } from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
import { Error } from '../pages/Error';
import { privateRoutes, publicRoutes } from '../router/routes';
import { Login } from '../pages/Login';
import { AuthContext } from '../context';

export const AppRouter = () => {
	const { isAuth } = useContext(AuthContext);
	console.log(isAuth);

  return isAuth ? (
    <>
      <Routes>
        {privateRoutes.map((route) => (
          <Route
            key={route.path}
            element={route.component}
            path={route.path}
            exact={route.exact}
          />
        ))}
        <Route path="/login" element={<Navigate to="/posts" replace />} />
        <Route path="*" element={<Error />} />
      </Routes>
    </>
  ) : (
    <>
      <Routes>
        {publicRoutes.map((route) => (
          <Route
            key={route.path}
            element={route.component}
            path={route.path}
            exact={route.exact}
          />
        ))}
        <Route path="*" element={<Login />} />
      </Routes>
    </>
  );

  //   <>
  //   <Routes>
  //     {/* <Route path="/" element={<Navigate to="/posts" replace />} /> */}
  //     {/* <Route path="/" element={<Home />} /> */}
  //
  //     {routes.map((route) => (
  //       <Route
  //         key={route.path}
  //         element={route.component}
  //         path={route.path}
  //         exact={route.exact}
  //       />
  // 		))}
  //
  //     {/* <Route path="*" element={<Error />} /> */}
  //   </Routes>
  // </>
};
