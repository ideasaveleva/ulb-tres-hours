import { useState } from 'react';
import ClassCounter from './components/ClassCounter';
import { Counter } from './components/Counter';
import PostItem from './components/PostItem';
import './styles/App.css';

function App() {
  const [posts, setPosts] = useState([
    { id: 1, title: 'JavaScript', body: 'Description' },
    { id: 2, title: 'JavaScript 2', body: 'Description' },
    { id: 3, title: 'JavaScript 3', body: 'Description' },
  ]);

  return (
		<div className="App">
			<h1 style={{textAlign: 'center'}}>Список постов</h1>
      {posts.map((post) => (
				<PostItem post={post} key={post.id} />
      ))}
    </div>
  );
}

export default App;
