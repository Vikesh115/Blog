import { useEffect, useState } from "react";
import axios from "axios";
import Header from "../../components/Header/Header";

function Home() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editingPost, setEditingPost] = useState(null);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [actionLoading, setActionLoading] = useState(false); // For delete and edit actions

  // Fetch posts from the backend
  const fetchPosts = async () => {
    setLoading(true);
    try {
      const response = await axios.get("https://blogpostbackend-e1f0.onrender.com/api/posts");
      setPosts(response.data);
    } catch (error) {
      console.error("Error fetching posts:", error);
      alert("Failed to fetch posts");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  const handleDelete = async (postId) => {
    const token = localStorage.getItem("token");
    if (!token) {
      alert("You must be logged in to delete a post");
      return;
    }

    if (window.confirm("Are you sure you want to delete this post?")) {
      setActionLoading(true);
      try {
        const response = await axios.delete(
          `https://blogpostbackend-e1f0.onrender.com/api/posts/${postId}`,
          { headers: { Authorization: `Bearer ${token}` } }
        );

        if (response.status === 200) {
          alert("Post deleted successfully");
          setPosts((prevPosts) =>
            prevPosts.filter((post) => post._id !== postId)
          );
        }
      } catch (error) {
        console.error("Error deleting post:", error);
        alert("Failed to delete post");
      } finally {
        setActionLoading(false);
      }
    }
  };

  const handleEdit = (post) => {
    setEditingPost(post);
    setTitle(post.title);
    setContent(post.content);
  };

  const handleUpdate = async () => {
    if (!title.trim() || !content.trim()) {
      alert("Title and content cannot be empty.");
      return;
    }

    const token = localStorage.getItem("token");
    if (!token) {
      alert("You must be logged in to edit a post");
      return;
    }

    setActionLoading(true);
    console.log("Updating post:", editingPost._id, { title, content });

    try {
      const response = await axios.put(
        `https://blogpostbackend-e1f0.onrender.com/api/posts/${editingPost._id}`,
        { title, content },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      if (response.status === 200) {
        alert("Post updated successfully");
        setPosts((prevPosts) =>
          prevPosts.map((post) =>
            post._id === editingPost._id ? { ...post, title, content } : post
          )
        );
        setEditingPost(null);
        setTitle("");
        setContent("");
      }
    } catch (error) {
      console.error("Error updating post:", error);
      alert("Failed to update post");
    } finally {
      setActionLoading(false);
    }
  };

  return (
    <div className="min-h-screen pb-32">
      <Header />
      <div className="container mx-auto p-4">
        <h2 className="text-2xl font-bold mb-4">Posts</h2>
        {loading ? (
          <p>Loading posts...</p>
        ) : posts.length === 0 ? (
          <p>No posts available.</p>
        ) : (
          <div className="space-y-4">
            {posts.map((post) => (
              <div
                key={post._id}
                className="border p-4 rounded-md shadow-sm hover:shadow-lg transition"
              >
                <h3 className="text-xl font-semibold">{post.title}</h3>
                <p>{post.content.substring(0, 100)}...</p>
                <div className="mt-2 flex space-x-4">
                  <button
                    onClick={() => handleDelete(post._id)}
                    className="text-red-600"
                    disabled={actionLoading}
                  >
                    {actionLoading ? "Deleting..." : "Delete"}
                  </button>
                  <button
                    onClick={() => handleEdit(post)}
                    className="text-blue-600"
                  >
                    Edit
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {editingPost && (
        <div className="fixed inset-0 bg-gray-500 bg-opacity-50 flex items-center justify-center">
          <div className="bg-white p-6 rounded-lg shadow-lg w-1/3 max-h-[80%] overflow-y-auto">
            <h3 className="text-2xl font-semibold mb-4">Edit Post</h3>
            <input
              type="text"
              placeholder="Title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full p-2 mb-4 border border-gray-300 rounded-md"
            />
            <textarea
              placeholder="Content"
              value={content}
              onChange={(e) => setContent(e.target.value)}
              className="w-full p-2 mb-4 border border-gray-300 rounded-md"
            ></textarea>
            <div className="flex space-x-4">
              <button
                onClick={handleUpdate}
                className={`bg-blue-600 text-white px-4 py-2 rounded-md ${
                  actionLoading ? "opacity-50" : ""
                }`}
                disabled={actionLoading}
              >
                {actionLoading ? "Saving..." : "Save"}
              </button>
              <button
                onClick={() => {
                  setEditingPost(null);
                  setTitle("");
                  setContent("");
                }}
                className="bg-gray-600 text-white px-4 py-2 rounded-md"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Home;
