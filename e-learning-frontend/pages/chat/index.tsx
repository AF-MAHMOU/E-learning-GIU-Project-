import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { chatService } from '../../services';
import { useAuth } from '../../hooks/useAuth';

interface ChatPreview {
  id: string;
  participants: {
    id: string;
    name: string;
  }[];
  lastMessage: {
    content: string;
    createdAt: string;
    senderId: string;
  };
  unreadCount: number;
}

export default function ChatPage() {
  const [chats, setChats] = useState<ChatPreview[]>([]);
  const [loading, setLoading] = useState(true);
  const router = useRouter();
  const { user } = useAuth();

  useEffect(() => {
    const fetchChats = async () => {
      try {
        const data = await chatService.getAllChats();
        setChats(data);
      } catch (error) {
        console.error('Failed to fetch chats:', error);
      } finally {
        setLoading(false);
      }
    };

    if (user) {
      fetchChats();
    }
  }, [user]);

  const handleChatSelect = (chatId: string) => {
    router.push(`/chat/${chatId}`);
  };

  const getOtherParticipant = (chat: ChatPreview) => {
    return chat.participants.find((p) => p.id !== user?.id) || chat.participants[0];
  };

  if (loading) {
    return <div className="flex justify-center items-center min-h-screen">Loading...</div>;
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-2xl mx-auto">
        <h1 className="text-3xl font-bold mb-6">Messages</h1>
        <div className="space-y-2">
          {chats.map((chat) => {
            const otherParticipant = getOtherParticipant(chat);
            return (
              <button
                key={chat.id}
                onClick={() => handleChatSelect(chat.id)}
                className="w-full text-left bg-white p-4 rounded-lg shadow hover:shadow-md transition-shadow"
              >
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="font-semibold">{otherParticipant.name}</h3>
                    <p className="text-gray-600 text-sm line-clamp-1">
                      {chat.lastMessage.content}
                    </p>
                  </div>
                  <div className="flex flex-col items-end">
                    <span className="text-xs text-gray-500">
                      {new Date(chat.lastMessage.createdAt).toLocaleDateString()}
                    </span>
                    {chat.unreadCount > 0 && (
                      <span className="bg-blue-600 text-white text-xs px-2 py-1 rounded-full mt-1">
                        {chat.unreadCount}
                      </span>
                    )}
                  </div>
                </div>
              </button>
            );
          })}
          {chats.length === 0 && (
            <p className="text-center text-gray-500 py-4">No messages yet</p>
          )}
        </div>
      </div>
    </div>
  );
}