import { SearchOutlined } from '@ant-design/icons';
import { Badge, Input } from 'antd';
import { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import MessageHeader from './MessageHeader';
import SendMessage from './SendMessage';

const ChatLayout = ({ children }) => {
  const { id } = useParams();
  console.log(id)

  const [searchTerm, setSearchTerm] = useState('');
  const { id: currentChatId } = useParams();
  const router = useNavigate();

  const contacts = [
    {
      id: 1,
      name: 'Larry',
      message: 'WoofWoof!',
      time: '25m',
      type: 'Client',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=40&h=40&fit=crop&crop=face',
      online: true,
      unread: true
    },
    {
      id: 2,
      name: 'Max',
      message: 'Hello',
      time: '40m',
      type: 'Freelancer',
      avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=40&h=40&fit=crop&crop=face',
      online: true,
      unread: false
    },
    {
      id: 3,
      name: 'Lemon',
      message: 'Where are You?',
      time: '1 hr',
      type: '',
      avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=40&h=40&fit=crop&crop=face',
      online: false,
      unread: false
    },

    {
      id: 5,
      name: 'Chedder',
      message: 'Yes',
      time: '1 day',
      type: '',
      avatar: 'https://images.unsplash.com/photo-1507591064344-4c6ce005b128?w=40&h=40&fit=crop&crop=face',
      online: false,
      unread: false
    },
    {
      id: 6,
      name: 'Daisy',
      message: 'Sure',
      time: '2 day',
      type: '',
      avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=40&h=40&fit=crop&crop=face',
      online: true,
      unread: false
    }
  ];

  const filteredContacts = contacts.filter(contact =>
    contact.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    contact.message.toLowerCase().includes(searchTerm.toLowerCase()) ||
    contact.type.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleChatClick = (id) => {
    router(`/support/${id}`);
  };

  return (
    <div className="flex gap-4">
      {/* Sidebar */}
      <div className="w-3/12 bg-white border flex flex-col h-[800px] shadow-lg border-gray-200 rounded-lg ">
        <div className="flex items-center justify-between p-4 border-b border-gray-400">
          <div className="flex items-center gap-2">
            <h1 className="text-xl font-semibold text-gray-800">Messages</h1>
            <Badge count={99} className="bg-blue-500 pl-3">
              <span className="w-2 h-2"></span>
            </Badge>
          </div>
        </div>

        {/* Search Bar */}
        <div className="p-4 pb-2">
          <Input
            placeholder="Search Client/Freelancer"
            prefix={<SearchOutlined className="text-gray-400" />}
            className="rounded-lg border-gray-200"
            size="large"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        {/* Messages List */}
        <div className="flex flex-col gap-3 px-2 overflow-y-auto">
          {filteredContacts.map((contact) => (
            <div
              key={contact.id}
              onClick={() => handleChatClick(contact.id)}
              className={`flex items-center py-3 px-2 border shadow-xl  cursor-pointer rounded-lg ${currentChatId === String(contact.id)
                ? 'bg-blue-500 text-white '
                : `border-blue-500 bg-white `}`}
            >
              <div className="relative mr-3">
                <img
                  src={contact.avatar}
                  className="border-2 w-12 rounded-lg h-12 border-white shadow-sm"
                />

              </div>

              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between mb-1">
                  <div className="flex items-center gap-2">
                    <span className={`font-medium ${contact.unread || currentChatId === String(contact.id)
                      ? 'text-gray-900'
                      : 'text-gray-800'
                      }`}>
                      {contact.name}
                    </span>
                    {contact.online && (
                      <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                    )}
                  </div>
                  <span className="text-xs text-gray-500 ml-2">{contact.time}</span>
                </div>

                <div className="flex items-center justify-between">
                  <p className={`text-sm truncate ${contact.unread || currentChatId === String(contact.id)
                    ? 'text-gray-900 font-medium'
                    : 'text-gray-600'
                    }`}>
                    {contact.message}
                  </p>
                  {contact.type && (
                    <span className={`text-xs px-2 py-1 rounded-full ml-2 flex-shrink-0 ${contact.type === 'Client'
                      ? 'bg-blue-100 text-blue-700'
                      : 'bg-green-100 text-green-700'
                      }`}>
                      {contact.type}
                    </span>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Chat Content */}
      <main className="flex-1 flex flex-col  shadow-lg rounded-lg border border-gray-200">
        {
          !id ? <div className=' flex justify-center items-center h-[400px] text-2xl font-bold'>
            <div className='text-center'>
              <h2 className="text-xl font-semibold text-gray-700">Welcome to Our Support</h2>
              <p className="text-gray-500">Select a conversation to start chatting</p>
            </div>
          </div> : <div>
            <MessageHeader />

            {/* Messages Area */}
            <div className="flex-1 overflow-y-auto">
              {children}
            </div>

            {/* Message Input */}
            <footer className="p-4 border-t bg-white">
              <SendMessage onSend={(msg) => children.props.handleNewMessage?.(msg)} />
            </footer>
          </div>
        }
      </main>
    </div>
  );
};

export default ChatLayout;