import React, { ChangeEvent, FC, useState } from 'react';
import { Button, Input, Spin, message } from 'antd';
import Title from 'antd/lib/typography/Title';

import { RegisterResponse, isRegisterExistsResponse, isRegisterSuccessResponse } from '../../types/api';
import { cnRegisterForm } from './RegisterForm.classname';

import './RegisterForm.css';

type RegisterFormProps = {
  onSuccess: () => void;
  onStartLoading?: () => void;
  onFinishLoading?: () => void;
}

const RegisterForm: FC<RegisterFormProps> = ({ onStartLoading, onFinishLoading, onSuccess }) => {
  const [login, setLogin] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [messageApi, contextHolder] = message.useMessage();


  const handleSubmit = () => {
    setLoading(true);
    onStartLoading?.();

    fetch('http://localhost:3000/register', {
      method: 'POST',
      headers: {
        'Content-type': 'application/json',
      },
      body: JSON.stringify({ login, password }),
    })
      .then(response => response.json())
      .then((data: RegisterResponse) => {
        if (isRegisterSuccessResponse(data)) {
          onSuccess();

          return;
        }

        if (isRegisterExistsResponse(data)) {
          messageApi.warning(data.status);

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
    <form className={cnRegisterForm({ loading })}>
      {contextHolder}
      {loading ? <Spin /> : <>
        <div>
          <Title level={5}>Логин</Title>
          <Input value={login} onChange={handleLoginChange} placeholder="dusty" />
        </div>
        <div>
          <Title level={5}>Пароль</Title>
          <Input value={password} onChange={handlePasswordChange} type="password" placeholder="123" />
        </div>
        <Button
          type="primary"
          className={cnRegisterForm('Button')}
          disabled={login.length === 0 || password.length === 0}
          onClick={handleSubmit}
        >
          Зарегистрироваться
        </Button>
      </>}
    </form>
  );
}

export { RegisterForm };
