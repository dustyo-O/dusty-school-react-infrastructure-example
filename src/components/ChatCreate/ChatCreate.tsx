import React, { ChangeEvent, FC, useState } from 'react';
import { Button, Input, message } from 'antd';

import { cnChatCreate } from './ChatCreate.classname';
import { User } from '../../types/user';
import { NewChatResponse, isNewChatSuccessResponse } from '../../types/api';
import { API_ORIGIN } from '../../settings/api';

import './ChatCreate.css';

type ChatCreateProps = {
  user: User;
  onCreate: (chatId: string) => void;
}

const ChatCreate: FC<ChatCreateProps> = ({ onCreate, user }) => {
  const [messageApi] = message.useMessage();
  const [chatName, setChatName] = useState('');
  const [loading, setLoading] = useState(false);

  const handleCreate = () => {
    setLoading(true);

    fetch(`${API_ORIGIN}/newchat`, {
      method: 'POST',
      headers: {
        'Content-type': 'application/json',
      },
      body: JSON.stringify({ token: user.token, name: chatName }),
    })
    .then(response => response.json())
    .then((data: NewChatResponse) => {
      if (isNewChatSuccessResponse(data)) {
        setChatName('');
        onCreate(data.insertedId);

        return;
      }

      throw new Error(data.error);
    })
    .catch(error => {
      messageApi.error(error?.message ?? error ?? 'Неизвестная ошибка');
    })
    .finally(() => {
      setLoading(false);
    });
  };

  const handleChangeChatName = (event: ChangeEvent<HTMLInputElement>) => {
    setChatName(event.target.value);
  };

  return (
    <div className={cnChatCreate()}>
      <Input disabled={loading} onChange={handleChangeChatName} value={chatName} />
      <Button type="primary" loading={loading} onClick={handleCreate}>Создать чат</Button>
    </div>
  );
}

export { ChatCreate };
