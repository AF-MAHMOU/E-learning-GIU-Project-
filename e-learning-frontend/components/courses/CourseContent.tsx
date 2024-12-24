// components/courses/CourseContent.tsx
import React from 'react';

interface ContentItem {
  title: string;
  description: string;
  type: string;
  url: string;
}

interface CourseContentProps {
  content: ContentItem[];
}

const CourseContent: React.FC<CourseContentProps> = ({ content }) => {
  return (
    <div>
      {content.length === 0 ? (
        <p>No content yet.</p>
      ) : (
        <ul className="space-y-4">
          {content.map((item, index) => (
            <li key={index} className="border p-2 rounded">
              <h3 className="font-semibold">{item.title}</h3>
              <p className="text-gray-600">{item.description}</p>
              <p className="text-sm text-gray-500 mt-1">Type: {item.type}</p>
              <a
                className="text-blue-500 underline"
                href={item.url}
                target="_blank"
                rel="noreferrer"
              >
                View Content
              </a>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default CourseContent;
