import { act, render } from '@testing-library/react';

import { ChatSelect } from './ChatSelect';
import { cnChatSelect } from './ChatSelect.classname';

const handler = jest.fn();

beforeEach(() => {
    jest.spyOn(global, 'fetch').mockResolvedValue({
        json: jest.fn().mockResolvedValue([{
            _id: '123',
            name: 'chatik',
        }])
    } as unknown as Response);
});

afterEach(() => {
    jest.restoreAllMocks();
});

test('renders', async () => {
    // eslint-disable-next-line testing-library/no-unnecessary-act
    const { container } = await act(async () => {
        return render(<ChatSelect user={{ token: 'testtoken', login: 'dusty' }} onSelect={handler} />);
    });

    // eslint-disable-next-line testing-library/no-node-access
    expect(container.firstElementChild).toHaveClass(cnChatSelect());
});
