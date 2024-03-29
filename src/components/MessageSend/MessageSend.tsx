import React, { ChangeEvent, FC, useState } from 'react';
import { Button, Input, message as messageAntd } from 'antd';

import { cnMessageSend } from './MessageSend.classname';
import { User } from '../../types/user';

import './MessageSend.css';

type MessageSendProps = {
  user: User;
  socket: WebSocket;
  chat: string;
}

const MessageSend: FC<MessageSendProps> = ({ socket, user, chat }) => {
  const [message, setMessage] = useState('');

  const handleSendMessage = () => {
    socket.send(JSON.stringify({
      type: 'message',
      token: user.token,
      message: {
        message,
        chat_id: chat,
      },
    }));

    setMessage('');
  };

  const handleChangeMessage = (event: ChangeEvent<HTMLInputElement>) => {
    setMessage(event.target.value);
  };

  return (
    <div className={cnMessageSend()}>
      <Input onChange={handleChangeMessage} value={message} />
      <Button type="primary" onClick={handleSendMessage}>Отправить</Button>
    </div>
  );
}

export { MessageSend };
