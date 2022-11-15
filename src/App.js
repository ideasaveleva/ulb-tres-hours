import { useState, useMemo } from 'react';
import './styles/App.css';
import PostList from './components/PostList';
import { PostForm } from './components/PostForm';
import { MySelect } from './components/UI/select/MySelect';
import { MyInput } from './components/UI/input/MyInput';

function App() {
  const [posts, setPosts] = useState([
    { id: 1, title: 'Ducati', body: 'Red' },
    { id: 2, title: 'Kawasaki', body: 'Green' },
    { id: 3, title: 'Honda', body: 'White' },
  ]);

  const [selectedSort, setSelectedSort] = useState('');
	const [searchQuery, setSearchQuery] = useState('');

	function getSortedPosts() {
	
	}
	
	const sortedPosts = useMemo(() => {
		console.log('ОТРАБОТАЛА СОРТИРОВКА');
		if (selectedSort) {
			return [...posts].sort((a, b) =>
				a[selectedSort].localeCompare(b[selectedSort])
			);
		}
		return posts;
	}, [selectedSort, posts]);

	const sortedAndSearchedPosts = useMemo(() => {
		return sortedPosts.filter(post=>post.title.toLowerCase().includes(searchQuery))
	},[searchQuery, sortedPosts])


  const createPost = (newPost) => {
    setPosts([...posts, newPost]);
  };

  //Получаем post из дочернего компонента
  const removePost = (post) => {
    setPosts(posts.filter((p) => p.id !== post.id));
  };

  const sortPosts = (sort) => {
    setSelectedSort(sort);
  };

  return (
    <div className="App">
      <PostForm create={createPost} />
      <hr style={{ margin: '15px 0' }} />
      <div>
        <MyInput
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Поиск..."
        />
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
