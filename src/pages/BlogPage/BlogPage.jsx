import { useState, useMemo, useCallback } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Button } from '../../components/Button/Button';
import { blogEntries } from '../../data/blogEntries';
import { getUniqueTags } from './blogUtils';
import css from './BlogPage.module.css';

const BlogPage = () => {
  const location = useLocation();
  const [visibleEntries, setVisibleEntries] = useState(5);  
  const [visibleTag, setVisibleTag] = useState('all');  

  const filteredEntries = useMemo(() => {
    return visibleTag === 'all' 
      ? blogEntries 
      : blogEntries.filter(entry => entry.tags.includes(visibleTag));
  }, [visibleTag]);

  const currentEntries = useMemo(() => {
    return filteredEntries.slice(0, visibleEntries);
  }, [filteredEntries, visibleEntries]);

  const uniqueTags = useMemo(() => getUniqueTags(blogEntries), []);

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

  const blogItems = currentEntries.map(({ id, title, date, tags }) => (
    <li key={id}>
      <article>
        <Link state={{ from: location }} to={`/blog/${id}`}>
          <h2>{title}</h2>
        </Link>
        <p>{date}</p>
        <p>{tags.join(', ')}</p>
      </article>
    </li>
  ));

  const tagsCloud = ['all', ...uniqueTags].map((tag) => renderTagItem(tag));

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
