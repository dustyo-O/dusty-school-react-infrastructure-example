import React, { FC, useState } from 'react';
import { Button, message } from 'antd';

import { RegisterForm } from '../../components/RegisterForm/RegisterForm';
import { LoginForm } from '../../components/LoginForm/LoginForm';
import { cnPageEnter } from './PageEnter.classname';

import './PageEnter.css';

type PageEnterProps = {
  onEnter: (login: string, token: string) => void;
}

type PageEnterState = 'login' | 'register';

const PageEnter: FC<PageEnterProps> = ({ onEnter }) => {
  const [pageState, setPageState] = useState<PageEnterState>('login');
  const [loading, setLoading] = useState(false);
  const [messageApi, contextHolder] = message.useMessage();

  const handleToggleLoginRegister = () => {
    setPageState(prev => prev === 'login' ? 'register' : 'login');
  };

  const handleStart = () => {
    setLoading(true);
  };

  const handleFinish = () => {
    setLoading(false);
  };

  const handleRegisterFinish = () => {
    setPageState('login');
    messageApi.success('Успешно зарегистрировались, теперь можно войти');
  };

  const handleLoginFinish = (login: string, token: string) => {
    onEnter(login, token);
  };

  const buttonToggleText = pageState === 'register' ? 'Войти' : 'Зарегистрироваться';

  return (
    <div className={cnPageEnter()}>
      {contextHolder}
      {
        pageState === 'register' ?
          <RegisterForm
            onStartLoading={handleStart}
            onFinishLoading={handleFinish}
            onSuccess={handleRegisterFinish}
          /> :
          <LoginForm
            onSuccess={handleLoginFinish}
            onStartLoading={handleStart}
            onFinishLoading={handleFinish}
          />
      }
      {
        loading ?
          undefined :
          <>или <Button type="link" onClick={handleToggleLoginRegister}>{buttonToggleText}</Button></>
      }

    </div>
  );
};

export { PageEnter };
