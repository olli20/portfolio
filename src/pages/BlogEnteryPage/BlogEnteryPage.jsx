import {useCallback} from 'react';
import {useParams, useNavigate, useLocation} from 'react-router-dom';

import { blogEntries } from '../../data/blogEntries';

import css from './BlogEnteryPage.module.css';

const BlogEnteryPage = () => {
  const {blogId} = useParams();

    const navigate = useNavigate();
    const location = useLocation();
    const from = location.state?.from || "/";

    const goBack = useCallback(() => navigate(from), [from, navigate]);

    const enteryData = blogEntries.find(({ id }) => id === blogId);

  return (
    <div className={css.container}>
      <h1>{enteryData.title}</h1>
      <a onClick={goBack}>Go Back</a>
      <div>
        <p>{enteryData.content}</p>
        <p>{enteryData.date}</p>
      </div>
    </div>
  );
};

export default BlogEnteryPage;