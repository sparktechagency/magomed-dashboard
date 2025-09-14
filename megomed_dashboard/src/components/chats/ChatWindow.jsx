import { useState } from 'react';

export default function MessageInterface() {
  const [messages, setMessages] = useState([
    {
      id: 1,
      text: "omg, this is amazing",
      sender: 'them',
      time: '2 min ago',
      avatar: '👤'
    },
    {
      id: 2,
      text: "perfect!✅",
      sender: 'them',
      time: '2 min ago',
      avatar: '👤'
    },
    {
      id: 3,
      text: "Wow, this is really epic",
      sender: 'them',
      time: '2 min ago',
      avatar: '👤'
    },
    {
      id: 4,
      text: "woohoooo",
      sender: 'me',
      time: 'now'
    },
    {
      id: 5,
      text: "Haha oh man",
      sender: 'me',
      time: 'now'
    },
    {
      id: 6,
      text: "Haha that's terrifying 😱",
      sender: 'me',
      time: 'now'
    },
    {
      id: 7,
      text: "omg, this is amazing",
      sender: 'them',
      time: 'just now',
      avatar: '👤'
    },
    {
      id: 8,
      text: "perfect!✅",
      sender: 'them',
      time: 'just now',
      avatar: '👤'
    },
    {
      id: 9,
      text: "Wow, this is really epic",
      sender: 'them',
      time: 'just now',
      avatar: '👤'
    },
    {
      id: 10,
      text: "woohoooo",
      sender: 'me',
      time: 'just now'
    },
    {
      id: 11,
      text: "Haha oh man",
      sender: 'me',
      time: 'just now'
    },
    {
      id: 12,
      text: "Haha that's terrifying 😱",
      sender: 'me',
      time: 'just now'
    }
  ]);

  const [newMessage, setNewMessage] = useState('');

  const handleSendMessage = () => {
    if (newMessage.trim()) {
      const message = {
        id: messages.length + 1,
        text: newMessage,
        sender: 'me',
        time: 'just now'
      };
      setMessages([...messages, message]);
      setNewMessage('');
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleSendMessage();
    }
  };

  return (
    <div className=" flex flex-col h-[600px]">
      {/* Messages Container */}
      <div className="flex-1 overflow-y-auto p-4 space-y-2 bg-gray-50">
        {messages.map((message, index) => {
          const showAvatar = message.sender === 'them' &&
            (index === 0 || messages[index - 1].sender !== 'them' ||
              messages[index - 1].time !== message.time);

          const isLastInGroup = message.sender === 'them' &&
            (index === messages.length - 1 || messages[index + 1].sender !== 'them' ||
              messages[index + 1].time !== message.time);

          return (
            <div key={message.id} className={`flex ${message.sender === 'me' ? 'justify-end' : 'justify-start'}`}>
              {message.sender === 'them' && (
                <div className="w-8 h-8 mr-2 flex-shrink-0">
                  {showAvatar && (
                    <div className="w-8 h-8 bg-gray-300 rounded-full flex items-center justify-center text-sm">
                      👤
                    </div>
                  )}
                </div>
              )}

              <div className={`max-w-xs ${message.sender === 'me' ? 'ml-auto' : ''}`}>
                <div
                  className={`px-4 py-2 rounded-2xl ${message.sender === 'me'
                    ? 'bg-blue-500 text-white rounded-br-md'
                    : 'bg-white text-gray-800 border border-gray-200 rounded-bl-md'
                    }`}
                >
                  <p className="text-sm">{message.text}</p>
                </div>

                {isLastInGroup || message.sender === 'me' ? (
                  <div className={`text-xs text-gray-500 mt-1 ${message.sender === 'me' ? 'text-right' : 'text-left ml-1'
                    }`}>
                    {message.time}
                    {message.sender === 'me' && (
                      <span className="ml-1">✓</span>
                    )}
                  </div>
                ) : null}
              </div>

              {message.sender === 'me' && (
                <div className="w-8 h-8 ml-2 border border-blue-500 bg-blue-100 rounded-full flex items-center justify-center text-white text-sm flex-shrink-0">
                  👤
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}