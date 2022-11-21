import React from 'react';
import { useState } from 'react';
import { MyButton } from './UI/button/MyButton';
import { MyInput } from './UI/input/MyInput';

export const PostForm = ({ create, errorCreatePost }) => {
  const [post, setPost] = useState({ title: '', body: '' });

  const addNewPost = (e) => {
    e.preventDefault();
    const newPost = {
      ...post,
      id: Date.now(),
    };
    create(newPost);
    setPost({ title: '', body: '' });
  };
console.log(errorCreatePost);
  return (
    <form>
      {/*Управляемый компоненнт*/}
      <MyInput
        value={post.title}
        onChange={(e) => setPost({ ...post, title: e.target.value })}
        type="text"
        placeholder="Название поста"
      />
      <MyInput
        value={post.body}
        onChange={(e) => setPost({ ...post, body: e.target.value })}
        type="text"
        placeholder="Описание поста"
      />
      {errorCreatePost && <h4 style={{ color: 'red' }}>Заполните все поля!</h4>}
      <MyButton style={{ marginTop: '10px' }} onClick={addNewPost}>
        Создать пост
      </MyButton>
    </form>
  );
};
