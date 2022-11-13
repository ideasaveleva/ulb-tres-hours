import { useState, useRef } from 'react';
import ClassCounter from './components/ClassCounter';
import { Counter } from './components/Counter';
import PostList from './components/PostList';
import { MyButton } from './components/UI/button/MyButton';
import { MyInput } from './components/UI/input/MyInput';
import './styles/App.css';

function App() {
  const [posts, setPosts] = useState([
    { id: 1, title: 'JavaScript', body: 'Description' },
    { id: 2, title: 'JavaScript 2', body: 'Description' },
    { id: 3, title: 'JavaScript 3', body: 'Description' },
  ]);

  const [title, setTitle] = useState('');
  const bodyInputRef = useRef();

  const addNewPost = (e) => {
    e.preventDefault();
		console.log(title);
		console.log(bodyInputRef.current.value);
  };

  return (
    <div className="App">
      <form>
        {/*Управляемый компоненнт*/}
        <MyInput
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          type="text"
          placeholder="Название поста"
        />
        {/*НЕуправляемый/Неконтроллируемый компоненнт*/}
        <MyInput ref={bodyInputRef} type="text" placeholder="Описание поста" />
        <MyButton onClick={addNewPost}>Создать пост</MyButton>
      </form>
      <PostList posts={posts} title="Посты про JS" />
    </div>
  );
}

export default App;
