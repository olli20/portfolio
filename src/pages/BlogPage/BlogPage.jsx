import React from 'react';
import {Link, useLocation} from 'react-router-dom';

import { blogEntries } from '../../data/blogEntries';

import css from './BlogPage.module.css';

const BlogPage = () => {
  const location = useLocation();

  const blogItems = blogEntries.map(({id, title, date, tags}) => (
    <li key={id}>
        <article>
            <Link state={{from: location}} to={`/blog/${id}`}>
                <h2>{title}</h2>
            </Link>
            <p>{date}</p>
            <p>{tags.join(", ")}</p>
        </article>
    </li>
))

  return (
    <div className={css.container}>
      <section>
        <h1>Blog</h1>
        {blogItems}
      </section>
    </div>
  );
};

export default BlogPage;