import { PaperClipOutlined, SendOutlined } from '@ant-design/icons';
import { Button } from 'antd';
import { useState } from 'react';

const SendMessage = ({ onSend }) => {
  const [message, setMessage] = useState('');

  const handleSend = () => {
    if (message.trim()) {
      onSend(message);
      setMessage('');
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <div className="w-full">
      <div className="flex items-center gap-2 w-full">
        <div className="flex-1 relative">
          <div className="flex items-center bg-gray-50 border border-gray-200 rounded-lg px-3 py-2">
            <input
              type="text"
              placeholder="Type a message"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              onKeyPress={handleKeyPress}
              className="flex-1 bg-transparent text-gray-700 text-base placeholder-gray-400 outline-none border-none"
            />
            <PaperClipOutlined
              className="text-gray-500 text-xl cursor-pointer hover:text-gray-700 transition-colors ml-4"
              onClick={() => console.log('Attachment clicked')}
            />
          </div>
        </div>

        <Button
          type="primary"
          shape="circle"
          size="large"
          icon={<SendOutlined className="text-white text-lg" />}
          onClick={handleSend}
          className="bg-blue-500 hover:bg-blue-600 border-none shadow-md flex items-center justify-center"
          disabled={!message.trim()}
        />
      </div>
    </div>
  );
};

export default SendMessage;