import { act, fireEvent, render, screen } from '@testing-library/react';

import { RegisterForm } from './RegisterForm';
import { cnRegisterForm } from './RegisterForm.classname';

const successHandler = jest.fn();
const startHandler = jest.fn();
const finishHandler = jest.fn();

beforeEach(() => {
    jest.spyOn(global, 'fetch').mockResolvedValue({
        json: jest.fn().mockResolvedValue({
            _id: '123',
        })
    } as unknown as Response);
});

afterEach(() => {
    jest.restoreAllMocks();
});

test('register scenario', async () => {
    render(
        <RegisterForm
            onSuccess={successHandler}
            onFinishLoading={finishHandler}
            onStartLoading={startHandler}
        />
    );


    const login = screen.getByPlaceholderText('dusty');
    const password = screen.getByPlaceholderText('123');
    const registerButton = screen.getByText('', {
        selector: '.' + cnRegisterForm('Button')
    });

    expect(login).toBeVisible();
    expect(password).toBeVisible();
    expect(registerButton).toBeVisible();

    expect(registerButton).toBeDisabled();

    await fireEvent.change(login, { target: { value: 'tester' }});
    await fireEvent.change(password, { target: { value: 'password' }});

    expect(registerButton).not.toBeDisabled();

    await act(async () => await fireEvent.click(registerButton));

    expect(startHandler).toBeCalledTimes(1);
    expect(finishHandler).toBeCalledTimes(1);
    expect(successHandler).toBeCalledTimes(1);
});
