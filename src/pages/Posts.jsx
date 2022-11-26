import { useEffect, useState, useRef } from 'react';
import PostService from '../API/PostService';
import { PostFilter } from '../components/PostFilter';
import { PostForm } from '../components/PostForm';
import PostList from '../components/PostList';
import { MyButton } from '../components/UI/button/MyButton';
import { Loader } from '../components/UI/loader/Loader';
import { MyModal } from '../components/UI/MyModal/MyModal';
import { Pagination } from '../components/UI/pagination/Pagination.jsx';
import { useFetching } from '../hooks/useFetching';
import { useObserver } from '../hooks/useObserver';
import { usePosts } from '../hooks/usePosts';
import { getPageCount } from '../styles/pages';

export const Posts = () => {
  const [posts, setPosts] = useState([]);
  const [filter, setFilter] = useState({ sort: '', query: '' });
  const [openModal, setOpenModal] = useState(false);
  const [totalPages, setTotalPages] = useState(0);
  const [limit, setLimit] = useState(10);
  const [page, setPage] = useState(1);
  const sortedAndSearchedPosts = usePosts(posts, filter.sort, filter.query);
  const [errorCreatePost, setErrorCreatePost] = useState(false);
  const lastElement = useRef();
  console.log(lastElement);

  const [fetchPosts, isPostsLoading, postError] = useFetching(
    async (limit, page) => {
      const response = await PostService.getAll(limit, page);
      setPosts([...posts, ...response.data]);
      const totalCount = response.headers['x-total-count'];
      setTotalPages(getPageCount(totalCount, limit));
    }
  );

  useObserver(lastElement, page < totalPages, isPostsLoading, () => {
    setPage(page + 1);
  });

	useEffect(() => {
    fetchPosts(limit, page);
  }, [page]);

  const createPost = (newPost) => {
    if (newPost.title === '' || newPost.body === '') {
      setErrorCreatePost(true);
    } else {
      setPosts([...posts, newPost]);
      setOpenModal(false);
      setErrorCreatePost(false);
    }
  };

  

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
    setPage(page);
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
      {postError && <h1>Произошла ошибка ${postError}</h1>}
      <PostList
        remove={removePost}
        posts={sortedAndSearchedPosts}
        title="Список постов"
      />
      <div ref={lastElement} style={{ height: 20, background: 'red' }}></div>
      {isPostsLoading && (
        <div
          style={{ display: 'flex', justifyContent: 'center', marginTop: 50 }}
        >
          <Loader />
        </div>
      )}
      <Pagination page={page} changePage={changePage} totalPages={totalPages} />
    </div>
  );
};
