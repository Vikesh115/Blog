import { useState, useEffect } from 'react';
import axios from 'axios';

function FetchPost() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch posts from the backend
  const fetchPosts = async () => {
    try {
      const response = await axios.get('http://localhost:8000/api/posts');
      setPosts(response.data);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching posts:', error);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  return (
    <div className="min-h-screen pb-28"> {/* Ensure enough space for footer */}
      <div className="container mx-auto p-4">
        <h2 className="text-2xl font-bold mb-6 text-center">Posts</h2>
        {loading ? (
          <p className="text-center">Loading posts...</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {posts.map((post) => (
              <div key={post._id} className="flex flex-col items-center border p-6 rounded-lg shadow-lg bg-white">
                {post.image && (
                  <img
                    src={post.image.startsWith('http') ? post.image : `http://localhost:8000/${post.image}`}
                    alt={post.title}
                    className="mb-4 rounded-lg w-full h-48 object-cover"
                  />
                )}
                <h3 className="text-xl font-semibold text-center mb-2">{post.title}</h3>
                <p className="text-center text-gray-600">{post.content.substring(0, 100)}...</p>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default FetchPost;
