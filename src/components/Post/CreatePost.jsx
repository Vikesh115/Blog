import { useState } from 'react';
import axios from 'axios';

function CreatePost() {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [imageUrl, setImageUrl] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!title || !content) {
      alert('Please fill in both the title and content.');
      return;
    }

    const postData = {
      title,
      content,
      image: imageUrl || null, // Use the provided image URL
    };

    setLoading(true);

    try {
      // Get the JWT token from localStorage (if stored there)
      const token = localStorage.getItem('token'); // Adjust based on how you store the token

      if (!token) {
        alert('Authorization token is missing.');
        setLoading(false);
        return;
      }

      // Make the request to the backend with the token in the Authorization header
      const response = await axios.post('http://localhost:8000/api/posts', postData, {
        headers: {
          'Authorization': `Bearer ${token}`, // Include the token in the Authorization header
          'Content-Type': 'application/json',
        },
      });

      if (response.status === 201) {
        alert('Post created successfully!');
        setTitle('');
        setContent('');
        setImageUrl(''); // Reset the form after successful post creation
      }
    } catch (error) {
      console.error('Error creating post:', error);
      if (error.response) {
        alert(`Failed to create post: ${error.response.data.message}`);
      } else {
        alert('Failed to create post. Please try again later.');
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen pb-28">
      <div className="container mx-auto p-4">
        <h2 className="text-2xl font-bold mb-6 text-center">Create Post</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="text"
            placeholder="Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded-md"
          />
          <textarea
            placeholder="Content"
            value={content}
            onChange={(e) => setContent(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded-md"
          />
          <input
            type="text"
            placeholder="Image URL (Optional)"
            value={imageUrl}
            onChange={(e) => setImageUrl(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded-md"
          />
          <button
            type="submit"
            className="bg-blue-600 text-white px-4 py-2 rounded-md"
            disabled={loading}
          >
            {loading ? 'Creating Post...' : 'Create Post'}
          </button>
        </form>
      </div>
    </div>
  );
}

export default CreatePost;
