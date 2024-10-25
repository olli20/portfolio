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

  const [posts, setPosts] = useState([]);
  const [page, setPage] = useState(1);
  const [hasNextPage, setHasNextPage] = useState(true);
  const [visibleTag, setVisibleTag] = useState('all');
  const [tags, setTags] = useState([]);
  const [tagsLoading, setTagsLoading] = useState(false);
  const [postsLoading, setPostsLoading] = useState(false);
  const [error, setError] = useState(null);

  const limit = 4;

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        setPostsLoading(true);
  
        const tagId = visibleTag === 'all' ? null : visibleTag;
  
        const response = await getAllPosts(page, limit, tagId);
    
        setPosts((prevPosts) => page === 1 ? response.data.posts : [...prevPosts, ...response.data.posts]);
        setHasNextPage(response.hasNextPage);
      } catch (err) {
        console.error('Failed to load posts:', err);
        setError('Failed to load posts');
      } finally {
        setPostsLoading(false);
      }
    };
  
    if (!tagsLoading) {
      fetchPosts();
    }
  }, [page, visibleTag, tagsLoading]);
  
  useEffect(() => {
    const fetchTags = async () => {
      try {
        setTagsLoading(true);
        const fetchedTags = await getTags();
  
        setTags(fetchedTags);
      } catch (err) {
        console.error('Failed to load tags:', err);
        setError('Failed to load tags');
      } finally {
        setTagsLoading(false);
      }
    };
    fetchTags();
  }, []);

const handleTagClick = (tagId) => {
  if (tagId !== visibleTag) {
    setVisibleTag(tagId);
    setPage(1);  
    setPosts([]);  
  }
};

  const showMoreEntries = () => {
    setPage((prevPage) => prevPage + 1);
  };

  const blogItems = posts.map(({ _id, title, content, date, tags }) => (
    <BlogItem
      key={_id}
      _id={_id}
      title={title}
      content={content}
      date={date}
      tags={tags}
      location={location}
    />
  ));

  if (error) return <p>{error}</p>;

  return (
    <main className={css.container}>
      <h1>Blog</h1>

      {tagsLoading && <Loader />}
      
      {!tagsLoading && (
        <>
          <TagsCloud tags={tags} visibleTag={visibleTag} onTagClick={handleTagClick} />

          <div className={css.entries}>
            {postsLoading ? <Loader />
            : (
              <>
                <ul>{blogItems}</ul>
                {hasNextPage && !postsLoading && <Button onClick={showMoreEntries}>Show more</Button>}

              </>
            )}
          </div>
        </>
      )}
    </main>
  );
};

export default BlogPage;
