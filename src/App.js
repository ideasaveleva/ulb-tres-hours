import { useState } from 'react';
import ClassCounter from './components/ClassCounter';
import { Counter } from './components/Counter';
import PostList from './components/PostList';
import './styles/App.css';

function App() {
  const [posts, setPosts] = useState([
    { id: 1, title: 'JavaScript', body: 'Description' },
    { id: 2, title: 'JavaScript 2', body: 'Description' },
    { id: 3, title: 'JavaScript 3', body: 'Description' },
	]);
	const [posts2, setPosts2] = useState([
    { id: 1, title: 'Python', body: 'Description' },
    { id: 2, title: 'Python 2', body: 'Description' },
    { id: 3, title: 'Python 3', body: 'Description' },
  ]);

  return (
    <div className="App">
      <PostList posts={posts} title="Посты про JS" />
      <PostList posts={posts2} title="Посты про Python" />
    </div>
  );
}

export default App;
