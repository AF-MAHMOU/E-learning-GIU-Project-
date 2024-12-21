import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import axios from 'axios';
import api from '../../utils/axios';

interface ContentUploadProps {
  courseId: string;
  onUploadSuccess: () => void;
}

type ContentFormData = {
  title: string;
  description: string;
  type: string;
  url: string;
};

export const ContentUpload: React.FC<ContentUploadProps> = ({ courseId, onUploadSuccess }) => {
  const { register, handleSubmit, reset } = useForm<ContentFormData>();
  const [loading, setLoading] = useState(false);

  const onSubmit = async (data: ContentFormData) => {
    try {
      setLoading(true);
      await api.post(`/courses/${courseId}/content`, data);
      reset();
      onUploadSuccess();
      alert('Content uploaded successfully!');
    } catch (error) {
      if (axios.isAxiosError(error)) {
        alert(error.response?.data?.message || 'Failed to upload content');
      } else {
        alert('An unexpected error occurred');
      }
    } finally {
      setLoading(false);
    }
  };

  return (
      <div className="p-4 bg-white rounded-lg shadow">
        <h3 className="text-lg font-semibold mb-4">Upload Content</h3>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 mb-6">
          <div>
            <input
                {...register('title', { required: true })}
                placeholder="Content Title"
                className="w-full p-2 border rounded"
            />
          </div>
          <div>
          <textarea
              {...register('description', { required: true })}
              placeholder="Content Description"
              className="w-full p-2 border rounded"
          />
          </div>
          <div>
            <select
                {...register('type', { required: true })}
                className="w-full p-2 border rounded"
            >
              <option value="">Select Content Type</option>
              <option value="video">Video</option>
              <option value="document">Document</option>
              <option value="link">Link</option>
            </select>
          </div>
          <div>
            <input
                {...register('url', { required: true })}
                placeholder="Content URL"
                className="w-full p-2 border rounded"
            />
          </div>
          <button
              type="submit"
              disabled={loading}
              className="bg-blue-500 text-white px-4 py-2 rounded disabled:bg-blue-300"
          >
            {loading ? 'Uploading...' : 'Upload Content'}
          </button>
        </form>
      </div>
  );
};