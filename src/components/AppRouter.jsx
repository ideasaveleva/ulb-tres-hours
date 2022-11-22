import React from 'react';
import { Route, Routes, Navigate } from 'react-router-dom';
import { About } from '../pages/About'
import  Posts  from '../pages/Posts';
import { Error } from '../pages/Error';


export const AppRouter = () => {
  return (
    <>
      <Routes>
        <Route path="/about" element={<About />} />
        <Route path="/posts" element={<Posts />} />
        {/* <Route component={Error} /> */}
        <Route path="*" element={<Error/>} />
      </Routes>
    </>
  );
};
