import axios from 'axios';

const BASE_URL = 'https://olena-blog-backend-1c269ed50e4a.herokuapp.com/api';

export const getAllPosts = async (page = 1, limit = 7, tag = null) => {
  try {
    const response = await axios.get(`${BASE_URL}/posts`, {
      params: { page, limit, tag },
    });
    
    if (response.status === 200) {
      return response.data;
    } else {
      throw new Error('Failed to fetch posts');
    }
  } catch (error) {
    console.error('Error fetching posts:', error.response ? error.response.data : error.message);
    throw error;
  }
};

export const getPostById = async (id) => {
  try {
    const {data} = await axios.get(`${BASE_URL}/posts/${id}`);
    return data.data.post;
  } catch (error) {
    console.error(`Error fetching post with ID ${id}:`, error);
    throw error;
  }
};

export const getTags = async () => {
  try {
    const {data} = await axios.get(`${BASE_URL}/tags`); 
    
    return data.data.tags; 
  } catch (error) {
    console.error('Error fetching tags:', error);
    throw error;
  }
};