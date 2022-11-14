import { useState } from 'react';
import PostList from './components/PostList';
import { PostForm } from './components/PostForm';
import { MySelect } from './components/UI/select/MySelect';
import './styles/App.css';

function App() {
  const [posts, setPosts] = useState([
    { id: 1, title: 'Ducati', body: 'Red' },
    { id: 2, title: 'Kawasaki', body: 'Green' },
    { id: 3, title: 'Honda', body: 'White' },
  ]);

	const [selectedSort, setSelectedSort] = useState('')

  const createPost = (newPost) => {
    setPosts([...posts, newPost]);
  };

  //Получаем post из дочернего компонента
  const removePost = (post) => {
    setPosts(posts.filter((p) => p.id !== post.id));
  };

	const sortPosts = (sort) => {
		setSelectedSort(sort)
		setPosts([...posts].sort((a,b)=> a[sort].localeCompare(b[sort])))
	}

  return (
    <div className="App">
      <PostForm create={createPost} />
      <hr style={{ margin: '15px 0' }} />
      <div>
        <MySelect
          value={selectedSort}
          onChange={sortPosts}
          defaultValue="Сортироавка"
          options={[
            { value: 'title', name: 'По названию' },
            { value: 'body', name: 'По описанию' },
          ]}
        />
      </div>
      {posts.length ? (
        <PostList remove={removePost} posts={posts} title="Посты про мотоциклы" />
      ) : (
        <h1 style={{ textAlign: 'center' }}>Посты не найдены!</h1>
      )}
    </div>
  );
}

export default App;
