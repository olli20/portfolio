import { useState, useEffect, useCallback } from 'react';
import { useParams, useNavigate, useLocation } from 'react-router-dom';
import { Loader } from '../../components/Loader/Loader'
import { getPostById } from '../../api/api';

import css from './BlogEnteryPage.module.css';

const BlogEnteryPage = () => {
  const {blogId} = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from || "/";

  //state
  const [data, setData] = useState(null);  
  const [loading, setLoading] = useState(true);  
  const [error, setError] = useState(null); 

  //fetching data
  useEffect(() => {
    const fetchPost = async () => {
      try {
        const post = await getPostById(blogId);
        setData(post);
      } catch (error) {
        console.log(error);
        setError('Failed to load the blog entry.');
      } finally {
        setLoading(false);
      }
    };

    fetchPost();
  }, [blogId]);

  const goBack = useCallback(() => navigate(from), [from, navigate]);

  if (loading) return <div><Loader /></div>;
  if (error) return <p>{error}</p>;
  if (!data) return <p>No post found</p>;

  return (
    <div className={css.container}>
      <h1>{data.title}</h1>
      <a onClick={goBack}>Go Back</a>
      <div>
        <p>{data.content}</p>
      </div>
    </div>
  );
};

export default BlogEnteryPage;