import { useState } from 'react';
import { usePosts } from './hooks/usePosts';
import './styles/App.css';
import PostList from './components/PostList';
import { PostForm } from './components/PostForm';
import { PostFilter } from './components/PostFilter';
import { MyModal } from './components/UI/MyModal/MyModal';
import { MyButton } from './components/UI/button/MyButton';


function App() {
  const [posts, setPosts] = useState([]);

	const [filter, setFilter] = useState({ sort: '', query: '' });
	const [openModal, setOpenModal] = useState(false)
  const sortedAndSearchedPosts = usePosts(posts, filter.sort, filter.query);
	const [errorCreatePost, setErrorCreatePost] = useState(false)

	

	const createPost = (newPost) => {
		console.log(newPost);
		if (newPost.title === '' || newPost.body === '') {
			setErrorCreatePost(true);
		} else {
			setPosts([...posts, newPost]);
      setOpenModal(false);
			setErrorCreatePost(false)
		}
  };

  //Получаем post из дочернего компонента
  const removePost = (post) => {
    setPosts(posts.filter((p) => p.id !== post.id));
  };
	
  return (
    <div className="App">
      <MyButton
        style={{ marginTop: '30px' }}
        onClick={() => setOpenModal(true)}
      >
        Создать пост
      </MyButton>
      <MyModal visible={openModal} setVisible={setOpenModal}>
        <PostForm errorCreatePost={errorCreatePost} create={createPost} />
      </MyModal>
      <hr style={{ margin: '15px 0' }} />
      <PostFilter filter={filter} setFilter={setFilter} />
      <PostList
        remove={removePost}
        posts={sortedAndSearchedPosts}
        title="Посты про мотоциклы"
      />
    </div>
  );
}

export default App;
