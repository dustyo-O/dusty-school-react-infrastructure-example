import React, { FC } from 'react';

import { cnPageSelectChat } from './PageSelectChat.classname';
import { User } from '../../types/user';
import { ChatSelect } from '../../components/ChatSelect/ChatSelect';
import { ChatCreate } from '../../components/ChatCreate/ChatCreate';

import './PageSelectChat.css';

type PageSelectChatProps = {
  user: User;
  onSelectChat: (chatId: string) => void;
}

const PageSelectChat: FC<PageSelectChatProps> = ({ user, onSelectChat }) => {
  return (
    <div className={cnPageSelectChat()}>
      <ChatSelect user={user} onSelect={onSelectChat}/>
      <ChatCreate user={user} onCreate={onSelectChat} />
    </div>
  );
};

export { PageSelectChat };
