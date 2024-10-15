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
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const limit = 3;

  useEffect(() => {
    const fetchTags = async () => {
      try {
        const fetchedTags = await getTags();
        setTags(fetchedTags);
      } catch (err) {
        console.error(err);
        setError('Failed to load tags');
      }
    };
    fetchTags();
  }, []);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        setLoading(true);
        const { data, hasNextPage } = await getAllPosts(page, limit, visibleTag === 'all' ? '' : visibleTag);

        setPosts((prevPosts) => [...prevPosts, ...data.posts]);
        setHasNextPage(hasNextPage); 
      } catch (err) {
        console.error(err);
        setError('Failed to load posts');
      } finally {
        setLoading(false);
      }
    };
    fetchPosts();
  }, [page, visibleTag]);

  const handleTagClick = (tag) => {
    if (tag !== visibleTag) {  
      setVisibleTag(tag);
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
      
      {loading && <Loader />} 

      {!loading && (
        <div className={css.entries}>
          <TagsCloud tags={tags} visibleTag={visibleTag} onTagClick={handleTagClick} />

          <div className={css.entriesList}>
            <ul>{blogItems}</ul>
            
            {hasNextPage && !loading && <Button onClick={showMoreEntries}>Show more</Button>}
          </div>
        </div>
      )}
    </main>
  );
};

export default BlogPage;
