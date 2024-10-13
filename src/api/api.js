import axios from 'axios';

const BASE_URL = 'https://olena-blog-backend-1c269ed50e4a.herokuapp.com/api';

export const getAllPosts = async () => {
  try {
    const response = await axios.get(`${BASE_URL}/blog`);
    return response.data.data.posts;
  } catch (error) {
    console.error('Error fetching all posts:', error);
    throw error;
  }
};
  
export const getPostById = async (id) => {
  try {
    const response = await axios.get(`${BASE_URL}/blog/${id}`);
    return response.data.data.post;
  } catch (error) {
    console.error(`Error fetching post with ID ${id}:`, error);
    throw error;
  }
};

export const getTags = async () => {
  try {
    const response = await axios.get(`${BASE_URL}/tags`); 
    return response.data.data.tags[0].allTags;
  } catch (error) {
    console.error('Error fetching tags:', error);
    throw error;
  }
};