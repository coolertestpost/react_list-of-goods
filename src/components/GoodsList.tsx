import React from 'react';
import { Good } from './Good';

interface Props {
  goods: string[]
}

export const GoodsList: React.FC<Props> = ({ goods }) => {
  return (
    <ul>
      {goods.map((good) => (
        <Good key={good} {...{ good }} />
      ))}
    </ul>
  );
};
