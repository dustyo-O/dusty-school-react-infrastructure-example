import React, { ChangeEvent, FC, useEffect, useState } from 'react';
import type { ChatMessage as ApiChatMessage } from '../../types/api';

import { cnChat } from './Chat.classname';
import { User } from '../../types/user';

import './Chat.css';

type ChatProps = {
  user: User;
  socket: WebSocket;
  chat: string;
}

type ChatMessage = {
  id: string;
  message: string;
};

const Chat: FC<ChatProps> = ({ socket, user, chat: chatId }) => {
  const [chat, setChat] = useState<ChatMessage[]>([]);

  useEffect(() => {
    const handler = (event: MessageEvent<string>) => {
      const messageData: ApiChatMessage = JSON.parse(event.data);

      if (messageData.message.chat_id !== chatId) {
        return;
      }

      setChat(prev => [...prev, {
        id: messageData._id,
        message: messageData.message.message,
      }]);
    };

    socket.addEventListener('message', handler);

    return () => {
      socket.removeEventListener('message', handler);
    };
  }, [chatId, socket]);

  return (
    <div className={cnChat()}>
      {chat.map((message) => <div key={message.id} className={cnChat('Message')}>{message.message}</div>)}
    </div>
  );
}

export { Chat };
