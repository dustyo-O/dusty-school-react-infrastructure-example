import { fireEvent, render, screen } from '@testing-library/react';

import { ButtonExit } from './ButtonExit';

const handler = jest.fn();

test('ButtonExit click', async () => {
    render(<ButtonExit onClick={handler} />);

    const button = screen.getByText('Выйти из чата');

    await fireEvent.click(button);

    expect(handler).toBeCalledTimes(1);
});
