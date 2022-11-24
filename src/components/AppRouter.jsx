import React from 'react';
import { Route, Routes, Navigate } from 'react-router-dom';
import { About } from '../pages/About';
import Posts from '../pages/Posts';
import { Error } from '../pages/Error';
import { PostIdPage } from '../pages/PostIdPage';
import {Home} from'../pages/Home'

export const AppRouter = () => {
  return (
    <>
      <Routes>
				<Route path="/" element={<Navigate to="/posts" replace />} />
        {/* <Route path="/" element={<Home />} /> */}
        <Route path="/about" element={<About />} />
        <Route exact path="/posts" element={<Posts />} />
        <Route exact path="/posts/:id" element={<PostIdPage />} />
        <Route path="*" element={<Error />} />
      </Routes>
    </>
  );
};
