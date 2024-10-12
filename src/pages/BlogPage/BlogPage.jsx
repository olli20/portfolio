import { useState, useEffect, useCallback } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Button } from '../../components/Button/Button';
import { Loader } from '../../components/Loader/Loader'
import { getAllPosts, getTags } from '../../api/api';
import css from './BlogPage.module.css';

const BlogPage = () => {
  const location = useLocation();

  //state
  const [posts, setPosts] = useState([]);
  const [visibleEntries, setVisibleEntries] = useState(5);
  const [visibleTag, setVisibleTag] = useState('all');
  const [tags, setTags] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [fetchedPosts, fetchedTags] = await Promise.all([getAllPosts(), getTags()]);
        setPosts(fetchedPosts);
        setTags(fetchedTags);
      } catch (error) {
        console.log(error);
        setError('Failed to load blog posts or tags');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const filteredEntries = visibleTag === 'all'
    ? posts : posts.filter(entry => entry.tags.includes(visibleTag));

  const currentEntries = filteredEntries.slice(0, visibleEntries);

  const handleTagClick = useCallback((tag) => {
    setVisibleTag(tag);
    setVisibleEntries(5);
  }, []);

  const showMoreEntries = useCallback(() => {
    setVisibleEntries((prevVisible) => prevVisible + 5);
  }, []);

  const renderTagItem = (tagName) => (
    <li
      key={tagName}
      className={`${css.tagItem} ${visibleTag === tagName ? css.activeTag : ''}`}
      onClick={() => handleTagClick(tagName)}
    >
      {tagName}
    </li>
  );

  const blogItems = currentEntries.map(({ _id, title, date, tags }) => (
    <li key={_id}>
      <article>
        <Link state={{ from: location }} to={`/blog/${_id}`}>
          <h2>{title}</h2>
        </Link>
        <p>{date}</p>
        <p>{tags.join(', ')}</p>
      </article>
    </li>
  ));

  const tagsCloud = ['all', ...tags].map((tag) => renderTagItem(tag));

  if (loading) return <div><Loader /></div>;
  if (error) return <p>{error}</p>;

  return (
    <main className={css.container}>
      <h1>Blog</h1>
      <div className={css.entries}>
        <ul className={css.tagsCloud}>
          {tagsCloud}
        </ul>
        <section className={css.entriesList}>
          <ul>{blogItems}</ul>
          {visibleEntries < filteredEntries.length && (
            <Button onClick={showMoreEntries}>Show more</Button>
          )}
        </section>
      </div>
    </main>
  );
};

export default BlogPage;
