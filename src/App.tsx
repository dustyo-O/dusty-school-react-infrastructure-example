import React, { useState } from 'react';

import { cnApp } from './App.classname';
import { message } from 'antd';
import { PageEnter } from './pages/PageEnter/PageEnter';
import { PageSelectChat } from './pages/PageSelectChat/PageSelectChat';
import { PageChat } from './pages/PageChat/PageChat';
import { User } from './types/user';

import './App.css';

type AppState = 'enter' | 'select-chat' | 'chat';

const App = () => {
  const [user, setUser] = useState<User | undefined>(undefined);
  const [chat, setChat] = useState<string | undefined>(undefined);
  const [messageApi, contextHolder] = message.useMessage();

  const handleEnter = (login: string, token: string) => {
    setUser({ login, token });
  };

  const handleSelectChat = (chatId: string) => {
    messageApi.success('Входим в чат...');

    setChat(chatId);
  };

  const handleExitChat = () => {
    setChat(undefined);
  }

  let appState: AppState = 'enter';

  if (user && chat === undefined) {
    appState = 'select-chat';
  }

  if (user && chat) {
    appState = 'chat';
  }

  return (
    <div className={cnApp()}>
      {contextHolder}
      {appState === 'enter' && <PageEnter onEnter={handleEnter}/>}
      {appState === 'select-chat' && user && <PageSelectChat user={user} onSelectChat={handleSelectChat}/>}
      {appState === 'chat' && user && chat && <PageChat chat={chat} user={user} onExitChat={handleExitChat}/>}
    </div>
  );
}

export { App };
