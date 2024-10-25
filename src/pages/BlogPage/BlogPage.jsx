import { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { Button } from '../../components/Button/Button';
import { Loader } from '../../components/Loader/Loader';
import { BlogItem } from './BlogItem'; 
import { getAllPosts, getTags } from '../../api/api';
import { TagsCloud } from '../../components/TagsCloud/TagsCloud';
import css from './BlogPage.module.css';

const BlogPage = () => {
  const location = useLocation();

  const [postsState, setPostsState] = useState({
    posts: [],
    page: 1,
    visibleTag: 'all',
    loading: false,
    error: null,
    hasNextPage: true,
  });

  const [tagsState, setTagsState] = useState({
    tags: [],
    loading: false,
    error: null,
  });

  const limit = 3;

  useEffect(() => {
    const fetchTags = async () => {
      setTagsState((prevState) => ({ ...prevState, loading: true, error: null }));
      try {
        const tagsResponse = await getTags();
        setTagsState((prevState) => ({
          ...prevState,
          tags: tagsResponse,
          loading: false,
        }));
      } catch (error) {
        console.error('Failed to load tags:', error);
        setTagsState((prevState) => ({
          ...prevState,
          error: 'Failed to load tags',
          loading: false,
        }));
      }
    };
    fetchTags();
  }, []);

  useEffect(() => {
    const fetchPosts = async () => {
      setPostsState((prevState) => ({ ...prevState, loading: true, error: null }));
      try {
        const tagId = postsState.visibleTag === 'all' ? null : postsState.visibleTag;
        const postsResponse = await getAllPosts(postsState.page, limit, tagId);

        setPostsState((prevState) => ({
          ...prevState,
          posts: postsState.page === 1 ? postsResponse.data.posts : [...prevState.posts, ...postsResponse.data.posts],
          hasNextPage: postsResponse.hasNextPage,
          loading: false,
        }));
      } catch (error) {
        console.error('Failed to load posts:', error);
        setPostsState((prevState) => ({
          ...prevState,
          error: 'Failed to load posts',
          loading: false,
        }));
      }
    };
    fetchPosts();
  }, [postsState.page, postsState.visibleTag]);

  const handleTagClick = (tagId) => {
    if (tagId !== postsState.visibleTag) {
      setPostsState((prevState) => ({
        ...prevState,
        visibleTag: tagId,
        page: 1,
        posts: [],
      }));
    }
  };

  const showMoreEntries = () => {
    setPostsState((prevState) => ({ ...prevState, page: prevState.page + 1 }));
  };

  const { posts, loading: loadingPosts, error: errorPosts, hasNextPage, visibleTag } = postsState;
  const { tags, loading: loadingTags, error: errorTags } = tagsState;

  return (
    <main className={css.container}>
      <h1>Blog</h1>

      {loadingTags && <Loader />}
      {errorTags && <p className={css.error}>{errorTags}</p>}

      {!loadingTags && !errorTags && (
        <TagsCloud tags={tags} visibleTag={visibleTag} onTagClick={handleTagClick} />
      )}

      <div className={css.entries}>
        <ul>
          {posts.map(({ _id, title, content, date, tags }) => (
            <BlogItem
              key={_id}
              _id={_id}
              title={title}
              content={content}
              date={date}
              tags={tags}
              location={location}
            />
          ))}
        </ul>

        {loadingPosts && <Loader />}
        {!loadingPosts && posts.length >= limit && hasNextPage && (
          <Button onClick={showMoreEntries}>Show more</Button>
        )}

        {errorPosts && <p className={css.error}>{errorPosts}</p>}
      </div>
    </main>
  );
};

export default BlogPage;
