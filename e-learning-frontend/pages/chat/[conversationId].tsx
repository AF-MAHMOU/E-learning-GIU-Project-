import { useEffect, useState, useRef } from 'react';
import { useRouter } from 'next/router';
import { chatService } from '../../services';
import { useAuth } from '../../hooks/useAuth';

interface Message {
  id: string;
  content: string;
  senderId: string;
  createdAt: string;
}

interface ChatParticipant {
  id: string;
  name: string;
}

interface Chat {
  id: string;
  participants: ChatParticipant[];
  messages: Message[];
}

export default function ChatConversationPage() {
  const router = useRouter();
  const { conversationId } = router.query;
  const { user } = useAuth();
  const [chat, setChat] = useState<Chat | null>(null);
  const [newMessage, setNewMessage] = useState('');
  const [loading, setLoading] = useState(true);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const fetchChat = async () => {
      if (!conversationId || Array.isArray(conversationId)) return;

      try {
        const data = await chatService.getChatById(conversationId);
        setChat(data);
      } catch (error) {
        console.error('Failed to fetch chat:', error);
      } finally {
        setLoading(false);
      }
    };

    if (conversationId) {
      fetchChat();
    }
  }, [conversationId]);

  useEffect(() => {
    // Scroll to bottom when messages change
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [chat?.messages]);

  const getOtherParticipant = () => {
    if (!chat || !user) return null;
    return chat.participants.find((p) => p.id !== user.id) || chat.participants[0];
  };

  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newMessage.trim() || !conversationId || Array.isArray(conversationId) || !chat) return;

    try {
      const message = await chatService.sendMessage(conversationId, newMessage);
      setChat({
        ...chat,
        messages: [...chat.messages, message],
      });
      setNewMessage('');
    } catch (error) {
      console.error('Failed to send message:', error);
    }
  };

  if (loading) {
    return <div className="flex justify-center items-center min-h-screen">Loading...</div>;
  }

  if (!chat) {
    return <div className="text-center py-8">Conversation not found</div>;
  }

  const otherParticipant = getOtherParticipant();

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-3xl mx-auto bg-white rounded-lg shadow-lg overflow-hidden">
        <div className="border-b px-6 py-4">
          <div className="flex items-center">
            <button
              onClick={() => router.push('/chat')}
              className="mr-4 text-gray-600 hover:text-gray-800"
            >
              ←
            </button>
            <h1 className="text-xl font-semibold">
              {otherParticipant ? otherParticipant.name : 'Chat'}
            </h1>
          </div>
        </div>

        <div className="h-[60vh] overflow-y-auto p-6">
          <div className="space-y-4">
            {chat.messages.map((message) => {
              const isOwnMessage = message.senderId === user?.id;
              return (
                <div
                  key={message.id}
                  className={`flex ${isOwnMessage ? 'justify-end' : 'justify-start'}`}
                >
                  <div
                    className={`max-w-[70%] rounded-lg px-4 py-2 ${
                      isOwnMessage
                        ? 'bg-blue-600 text-white'
                        : 'bg-gray-100 text-gray-900'
                    }`}
                  >
                    <p>{message.content}</p>
                    <span className="text-xs opacity-75">
                      {new Date(message.createdAt).toLocaleTimeString()}
                    </span>
                  </div>
                </div>
              );
            })}
            <div ref={messagesEndRef} />
          </div>
        </div>

        <form onSubmit={handleSendMessage} className="border-t p-4">
          <div className="flex space-x-4">
            <input
              type="text"
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
              placeholder="Type a message..."
              className="flex-1 p-2 border rounded-lg"
            />
            <button
              type="submit"
              disabled={!newMessage.trim()}
              className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 disabled:opacity-50"
            >
              Send
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}