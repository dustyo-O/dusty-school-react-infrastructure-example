import React, { FC, useEffect, useState } from 'react';
import { Select, Spin, message } from 'antd';

import { cnChatSelect } from './ChatSelect.classname';
import { User } from '../../types/user';
import { ChatData, ChatsResponse, isChatsSuccessResponse } from '../../types/api';
import { API_ORIGIN } from '../../settings/api';

import './ChatSelect.css';

type ChatSelectProps = {
  user: User;
  onSelect: (chatId: string) => void;
}

type Chat = ChatData;

const ChatSelect: FC<ChatSelectProps> = ({ onSelect, user }) => {
  const [messageApi] = message.useMessage();
  const [chats, setChats] = useState<Chat[]| undefined>(undefined);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (chats !== undefined) {
      return;
    }

    setLoading(true);

    fetch(`${API_ORIGIN}/chats`, {
      method: 'POST',
      headers: {
        'Content-type': 'application/json',
      },
      body: JSON.stringify({ token: user.token }),
    })
      .then(response => response.json())
      .then((data: ChatsResponse) => {
        if (isChatsSuccessResponse(data)) {
          setChats(data);

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
  }, [chats, messageApi, user.token]);

  const handleChatSelect = (value: string) => {
    onSelect(value);
  };

  if (loading) {
    return <Spin />;
  }

  return (
    <div className={cnChatSelect()}>
      <Select
        className={cnChatSelect('Select')}
        options={chats?.map((chat) => ({ value: chat._id, label: <span>{chat.name}</span> }))}
        onChange={handleChatSelect}
      />
    </div>
  );
}

export { ChatSelect };
