import { useState, useEffect, useCallback } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import ReactMarkdown from 'react-markdown';
import { Loader } from '../../components/Loader/Loader';
import { getPostById } from '../../api/api';
import { Button } from '../../components/Button/Button';
import css from './BlogEnteryPage.module.css';

const BlogEntryPage = () => {
  const { blogId } = useParams();
  const navigate = useNavigate();
  // const location = useLocation();
  // const from = location.state?.from || "/";

  // state
  const [data, setData] = useState(null);  
  const [loading, setLoading] = useState(true);  
  const [error, setError] = useState(null); 

  // fetching data
  useEffect(() => {
    const fetchPost = async () => {
      try {
        const post = await getPostById(blogId);
        setData(post);
      } catch (error) {
        console.error(error);
        setError('Failed to load the blog entry.');
      } finally {
        setLoading(false);
      }
    };
    fetchPost();
  }, [blogId]);

  const goToPreviousPost = () => {
    if (data?.previousPostId) {
      navigate(`/blog/${data.previousPostId}`);
    }
  };

  const goToNextPost = () => {
    if (data?.nextPostId) {
      navigate(`/blog/${data.nextPostId}`);
    }
  };

  const goBack = useCallback(() => navigate('/blog'), [navigate]);

  if (loading) return <div><Loader /></div>;
  if (error) return <p>{error}</p>;
  if (!data) return <p>No post found</p>;

  return (
    <div className={css.container}>
      <nav className={css.navigationButtons}>
        {data.previousPostId && <Button onClick={goToPreviousPost}>Previous Post</Button>}
        <Button onClick={goBack}>Back to Blog</Button>
        {data.nextPostId && <Button onClick={goToNextPost}>Next Post</Button>}
      </nav>
      <main>
        <h1>{data.title}</h1>
        <ReactMarkdown>{data.content}</ReactMarkdown>
      </main>
    </div>
  );
};

export default BlogEntryPage;