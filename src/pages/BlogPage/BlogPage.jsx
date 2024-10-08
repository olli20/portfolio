import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Button } from '../../components/Button/Button';
import { blogEntries } from '../../data/blogEntries';
import css from './BlogPage.module.css';

const BlogPage = () => {
  const location = useLocation();
  
  const [visibleEntries, setVisibleEntries] = useState(5);

  const showMoreEntries = () => {
    setVisibleEntries((prevVisible) => prevVisible + 5);
  };

  const currentEntries = blogEntries.slice(0, visibleEntries);

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

  return (
    <div className={css.container}>
      <section>
        <h1>Blog</h1>
        <ul>{blogItems}</ul>

        {visibleEntries < blogEntries.length && (
          <Button onClick={showMoreEntries}>Show More</Button>
        )}
      </section>
    </div>
  );
};

export default BlogPage;
