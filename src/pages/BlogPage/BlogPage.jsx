import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { format } from 'date-fns'; 
import { Button } from '../../components/Button/Button';
import { Loader } from '../../components/Loader/Loader';
import { BlogItem } from './BlogItem'; 
import { getAllPosts, getTags } from '../../api/api';
import TagsCloud from '../../components/TagsCloud/TagsCloud';
import css from './BlogPage.module.css';

const BlogPage = () => {
  const location = useLocation();

  const [posts, setPosts] = useState([]);
  const [visibleEntries, setVisibleEntries] = useState(5);
  const [visibleTag, setVisibleTag] = useState('all');
  const [tags, setTags] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch posts and tags
  useEffect(() => {
    const fetchData = async () => {
      try {
        const [fetchedPosts, fetchedTags] = await Promise.all([getAllPosts(), getTags()]);
        setPosts(fetchedPosts);
        setTags(fetchedTags);
      } catch (error) {
        console.error(error);
        setError('Failed to load blog posts or tags');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const filteredEntries = visibleTag === 'all'
    ? posts
    : posts.filter(entry => entry.tags.includes(visibleTag));

  const currentEntries = filteredEntries.slice(0, visibleEntries);

  const handleTagClick = (tag) => {
    setVisibleTag(tag);
    setVisibleEntries(5);
  };

  const showMoreEntries = () => {
    setVisibleEntries(prevVisible => prevVisible + 5);
  };

  const blogItems = currentEntries.map(({ _id, title, content, date, tags }) => (
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

  if (loading) return <div><Loader /></div>;
  if (error) return <p>{error}</p>;

  return (
    <main className={css.container}>
      <h1>Blog</h1>
      <div className={css.entries}>

        <TagsCloud tags={tags} visibleTag={visibleTag} onTagClick={handleTagClick} />
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
