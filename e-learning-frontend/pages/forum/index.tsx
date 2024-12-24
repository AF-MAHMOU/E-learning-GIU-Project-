import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { forumsService } from '../../services';
import { useAuth } from '../../hooks/useAuth';

interface ForumPost {
  id: string;
  title: string;
  content: string;
  author: {
    id: string;
    name: string;
  };
  createdAt: string;
  commentsCount: number;
}

interface Forum {
  id: string;
  title: string;
  description: string;
  posts: ForumPost[];
}

export default function ForumPage() {
  const [forums, setForums] = useState<Forum[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedForum, setSelectedForum] = useState<Forum | null>(null);
  const [newPost, setNewPost] = useState({ title: '', content: '' });
  const [showNewPostForm, setShowNewPostForm] = useState(false);
  const router = useRouter();
  const { user } = useAuth();

  useEffect(() => {
    const fetchForums = async () => {
      try {
        const data = await forumsService.getAllForums();
        setForums(data);
        if (data.length > 0) {
          setSelectedForum(data[0]);
        }
      } catch (error) {
        console.error('Failed to fetch forums:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchForums();
  }, []);

  const handleForumSelect = (forum: Forum) => {
    setSelectedForum(forum);
  };

  const handleCreatePost = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedForum || !newPost.title || !newPost.content) return;

    try {
      const post = await forumsService.createPost(selectedForum.id, newPost);
      setSelectedForum({
        ...selectedForum,
        posts: [post, ...selectedForum.posts],
      });
      setNewPost({ title: '', content: '' });
      setShowNewPostForm(false);
    } catch (error) {
      console.error('Failed to create post:', error);
    }
  };

  if (loading) {
    return <div className="flex justify-center items-center min-h-screen">Loading...</div>;
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="grid grid-cols-12 gap-6">
        {/* Forums List */}
        <div className="col-span-3">
          <div className="bg-white rounded-lg shadow p-4">
            <h2 className="text-xl font-semibold mb-4">Forums</h2>
            <div className="space-y-2">
              {forums.map((forum) => (
                <button
                  key={forum.id}
                  onClick={() => handleForumSelect(forum)}
                  className={`w-full text-left p-2 rounded ${
                    selectedForum?.id === forum.id
                      ? 'bg-blue-100 text-blue-800'
                      : 'hover:bg-gray-100'
                  }`}
                >
                  {forum.title}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Selected Forum Content */}
        <div className="col-span-9">
          {selectedForum ? (
            <div>
              <div className="bg-white rounded-lg shadow p-6 mb-6">
                <h1 className="text-2xl font-bold mb-2">{selectedForum.title}</h1>
                <p className="text-gray-600">{selectedForum.description}</p>
              </div>

              <div className="mb-6">
                {user && (
                  <button
                    onClick={() => setShowNewPostForm(!showNewPostForm)}
                    className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
                  >
                    {showNewPostForm ? 'Cancel' : 'Create New Post'}
                  </button>
                )}
              </div>

              {showNewPostForm && (
                <form onSubmit={handleCreatePost} className="bg-white rounded-lg shadow p-6 mb-6">
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Title
                      </label>
                      <input
                        type="text"
                        value={newPost.title}
                        onChange={(e) => setNewPost({ ...newPost, title: e.target.value })}
                        className="w-full p-2 border rounded-lg"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Content
                      </label>
                      <textarea
                        value={newPost.content}
                        onChange={(e) => setNewPost({ ...newPost, content: e.target.value })}
                        className="w-full p-2 border rounded-lg"
                        rows={4}
                        required
                      />
                    </div>
                    <button
                      type="submit"
                      className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700"
                    >
                      Post
                    </button>
                  </div>
                </form>
              )}

              <div className="space-y-6">
                {selectedForum.posts.map((post) => (
                  <div key={post.id} className="bg-white rounded-lg shadow p-6">
                    <h2 className="text-xl font-semibold mb-2">{post.title}</h2>
                    <p className="text-gray-600 mb-4">{post.content}</p>
                    <div className="flex justify-between items-center text-sm text-gray-500">
                      <div>
                        Posted by {post.author.name} on{' '}
                        {new Date(post.createdAt).toLocaleDateString()}
                      </div>
                      <div className="flex items-center space-x-4">
                        <span>{post.commentsCount} comments</span>
                        <button
                          onClick={() => router.push(`/forum/post/${post.id}`)}
                          className="text-blue-600 hover:text-blue-800"
                        >
                          View Discussion →
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
                {selectedForum.posts.length === 0 && (
                  <p className="text-center text-gray-500 py-4">No posts yet</p>
                )}
              </div>
            </div>
          ) : (
            <div className="text-center py-8">Select a forum to view posts</div>
          )}
        </div>
      </div>
    </div>
  );
}