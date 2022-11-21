import { useState, useEffect } from 'react';
import './styles/App.css';
import { usePosts } from './hooks/usePosts';
import PostService from './API/PostService';
import PostList from './components/PostList';
import { PostForm } from './components/PostForm';
import { PostFilter } from './components/PostFilter';
import { MyModal } from './components/UI/MyModal/MyModal';
import { MyButton } from './components/UI/button/MyButton';
import { Loader } from './components/UI/loader/Loader';
import { useFetching } from './hooks/useFetching';
import { getPageCount, getPagesArray } from './styles/pages';

function App() {
  const [posts, setPosts] = useState([]);
  const [filter, setFilter] = useState({ sort: '', query: '' });
  const [openModal, setOpenModal] = useState(false);
  const [totalPages, setTotalPages] = useState(0);
  const [limit, setLimit] = useState(10);
  const [page, setPage] = useState(1);
  const sortedAndSearchedPosts = usePosts(posts, filter.sort, filter.query);
  const [errorCreatePost, setErrorCreatePost] = useState(false);

  let pagesArray = getPagesArray(totalPages);

  const [fetchPosts, isPostsLoading, postError] = useFetching(async () => {
    const response = await PostService.getAll(limit, page);
    setPosts(response.data);
    const totalCount = response.headers['x-total-count'];
    setTotalPages(getPageCount(totalCount, limit));
  });

  const createPost = (newPost) => {
    if (newPost.title === '' || newPost.body === '') {
      setErrorCreatePost(true);
    } else {
      setPosts([...posts, newPost]);
      setOpenModal(false);
      setErrorCreatePost(false);
    }
  };

  useEffect(() => {
    fetchPosts();
  }, [page]);

  // async function fetchPosts() {
  // 	setIsPostsLoadding(true)
  // 	setTimeout(async () => {
  //     setIsPostsLoadding(false);
  //   }, 1000);
  // }

  //Получаем post из дочернего компонента
  const removePost = (post) => {
    setPosts(posts.filter((p) => p.id !== post.id));
  };

	const changePage = (page) => {
		setPage(page)
	}

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
      {postError && <h1>Произошла ошибка ${postError}</h1>}
      {isPostsLoading ? (
        <div
          style={{ display: 'flex', justifyContent: 'center', marginTop: 50 }}
        >
          <Loader />
        </div>
      ) : (
        <PostList
          remove={removePost}
          posts={sortedAndSearchedPosts}
          title="Список постов"
        />
      )}
      <div className="page__wrapper">
        {pagesArray.map((p) => (
          <span
            onClick={() => changePage(p)}
            key={p}
            className={page === p ? 'page page__current' : 'page'}
          >
            {p}
          </span>
        ))}
      </div>
    </div>
  );
}

export default App;
