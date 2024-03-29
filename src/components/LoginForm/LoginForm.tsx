import React, { ChangeEvent, FC, useState } from 'react';
import { Button, Input, Spin, message } from 'antd';
import Title from 'antd/es/typography/Title';

import { cnLoginForm } from './LoginForm.classname';

import './LoginForm.css';
import { LoginResponse, isLoginSuccessResponse } from '../../types/api';

type LoginFormProps = {
  onSuccess: (login: string, token: string) => void;
  onStartLoading?: () => void;
  onFinishLoading?: () => void;
}

const LoginForm: FC<LoginFormProps> = ({ onStartLoading, onFinishLoading, onSuccess }) => {
  const [login, setLogin] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [messageApi, contextHolder] = message.useMessage();

  const handleSubmit = () => {
    setLoading(true);
    onStartLoading?.();

    fetch('http://localhost:3000/login', {
      method: 'POST',
      headers: {
        'Content-type': 'application/json',
      },
      body: JSON.stringify({ login, password }),
    })
      .then(response => response.json())
      .then((data: LoginResponse) => {
        if (isLoginSuccessResponse(data)) {
          onSuccess(data.user.login, data.token);

          return;
        }

        throw new Error(data.error);
      })
      .catch(error => {
        messageApi.error(error?.message ?? error ?? 'Неизвестная ошибка');
      })
      .finally(() => {
        setLoading(false);
        onFinishLoading?.();
      });
  };

  const handleLoginChange = (event: ChangeEvent<HTMLInputElement>) => {
    setLogin(event.target.value);
  };

  const handlePasswordChange = (event: ChangeEvent<HTMLInputElement>) => {
    setPassword(event.target.value);
  };

  return (
    <form className={cnLoginForm({ loading })}>
      {contextHolder}
      {loading ? <Spin /> : <>
        <div>
          <Title level={5}>Логин</Title>
          <Input className={cnLoginForm('Login')} value={login} onChange={handleLoginChange} />
        </div>
        <div>
          <Title level={5}>Пароль</Title>
          <Input className={cnLoginForm('Password')} value={password} onChange={handlePasswordChange} type="password" />
        </div>
        <Button
          className={cnLoginForm('Button')}
          type="primary"
          disabled={login.length === 0 || password.length === 0}
          onClick={handleSubmit}
        >
          Войти
        </Button>
      </>}
    </form>
  );
}

export { LoginForm };
