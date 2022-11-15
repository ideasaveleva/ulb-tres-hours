import { useState, useMemo } from 'react';
import './styles/App.css';
import PostList from './components/PostList';
import { PostForm } from './components/PostForm';
import { PostFilter } from './components/PostFilter';

function App() {
  const [posts, setPosts] = useState([
    { id: 1, title: 'Ducati', body: 'Red' },
    { id: 2, title: 'Kawasaki', body: 'Green' },
    { id: 3, title: 'Honda', body: 'White' },
  ]);

  const [filter, setFilter] = useState({ sort: '', query: '' });

  const sortedPosts = useMemo(() => {
    console.log('ОТРАБОТАЛА СОРТИРОВКА');
    if (filter.sort) {
      return [...posts].sort((a, b) =>
        a[filter.sort].localeCompare(b[filter.sort])
      );
    }
    return posts;
  }, [filter.sort, posts]);

  const sortedAndSearchedPosts = useMemo(() => {
    return sortedPosts.filter((post) =>
      post.title.toLowerCase().includes(filter.query)
    );
  }, [filter.query, sortedPosts]);

  const createPost = (newPost) => {
    setPosts([...posts, newPost]);
  };

  //Получаем post из дочернего компонента
  const removePost = (post) => {
    setPosts(posts.filter((p) => p.id !== post.id));
  };

  return (
    <div className="App">
      <PostForm create={createPost} />
      <hr style={{ margin: '15px 0' }} />
			<PostFilter
				filter={filter}
				setFilter={setFilter}
			/>
      {sortedAndSearchedPosts.length ? (
        <PostList
          remove={removePost}
          posts={sortedAndSearchedPosts}
          title="Посты про мотоциклы"
        />
      ) : (
        <h1 style={{ textAlign: 'center' }}>Посты не найдены!</h1>
      )}
    </div>
  );
}

export default App;
