import React, { useEffect, useState } from 'react';
import api from '../../utils/axios';
import { useAuth } from '../../hooks/useAuth';
import { ContentUpload } from './ContentUpload';
import axios from 'axios';

interface Content {
  _id: string;
  title: string;
  description: string;
  type: string;
  url: string;
  uploadedBy: {
    name: string;
    email: string;
  };
  created_at: string;
}

interface CourseContentProps {
  courseId: string;
}

export const CourseContent: React.FC<CourseContentProps> = ({ courseId }) => {
  const [content, setContent] = useState<Content[]>([]);
  const [loading, setLoading] = useState(true);
  const { user } = useAuth();
  const isInstructor = user?.role === 'instructor';
  const isAdmin = user?.role === 'admin';

  const fetchContent = async () => {
    try {
      const response = await api.get(`/courses/${courseId}/content`);
      setContent(response.data);
    } catch (error) {
      console.error('Failed to fetch content:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchContent();
  }, [courseId]);

  const handleDelete = async (contentId: string) => {
    if (!window.confirm('Are you sure you want to delete this content?')) return;

    try {
      await api.delete(`/courses/content/${contentId}`);
      await fetchContent();
      alert('Content deleted successfully');
    } catch (error) {
      if (axios.isAxiosError(error)) {
        alert(error.response?.data?.message || 'Failed to delete content');
      } else {
        alert('An unexpected error occurred');
      }
    }
  };

  const renderContentItem = (item: Content) => {
    const canDelete = isAdmin || (isInstructor && item.uploadedBy.email === user?.email);

    return (
        <div key={item._id} className="bg-white p-4 rounded-lg shadow mb-4">
          <div className="flex justify-between items-start">
            <div>
              <h4 className="text-lg font-semibold">{item.title}</h4>
              <p className="text-gray-600 mt-1">{item.description}</p>
              <div className="mt-2">
              <span className="bg-blue-100 text-blue-800 text-xs font-medium px-2.5 py-0.5 rounded">
                {item.type}
              </span>
                <a
                    href={item.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="ml-4 text-blue-600 hover:underline"
                >
                  View Content
                </a>
              </div>
              <p className="text-sm text-gray-500 mt-2">
                Uploaded by {item.uploadedBy.name} on{' '}
                {new Date(item.created_at).toLocaleDateString()}
              </p>
            </div>
            {canDelete && (
                <button
                    onClick={() => handleDelete(item._id)}
                    className="text-red-600 hover:text-red-800"
                >
                  Delete
                </button>
            )}
          </div>
        </div>
    );
  };

  if (loading) {
    return <div>Loading content...</div>;
  }

  return (
      <div className="space-y-6">
        {(isInstructor || isAdmin) && (
            <ContentUpload courseId={courseId} onUploadSuccess={fetchContent} />
        )}

        <div className="mt-6">
          <h3 className="text-xl font-semibold mb-4">Course Content</h3>
          {content.length === 0 ? (
              <p>No content available for this course.</p>
          ) : (
              <div className="space-y-4">
                {content.map(renderContentItem)}
              </div>
          )}
        </div>
      </div>
  );
};