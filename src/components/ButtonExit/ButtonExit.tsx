import React, { FC } from 'react';
import { Button } from 'antd';

type ButtonExitProps = {
    onClick: () => void;
};

const ButtonExit: FC<ButtonExitProps> = ({ onClick }) => {
    return  <Button type="dashed" onClick={onClick}>Выйти из чата</Button>

};

export { ButtonExit };
