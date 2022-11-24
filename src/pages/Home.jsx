import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

export const Home = () => {
  const navigate = useNavigate();

  //Пример реализации навигации через useEffect от Max
  useEffect(() => {
    navigate('/posts');
  }, []);

  return <div>Home</div>;
}
