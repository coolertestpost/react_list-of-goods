/* eslint-disable max-len */
import React, { useState } from 'react';
import 'bulma/css/bulma.css';
import './App.scss';

import cn from 'classnames';

import { GoodsList } from './components/GoodsList';

export const goodsFromServer = [
  'Dumplings',
  'Carrot',
  'Eggs',
  'Ice cream',
  'Apple',
  'Bread',
  'Fish',
  'Honey',
  'Jam',
  'Garlic',
];

enum SortType {
  NONE,
  ALPHABET,
  LENGTH,
}

type ReorderOptions = {
  sortType: SortType,
  isReversed: boolean,
};

// Use this function in the render method to prepare goods
export function getReorderedGoods(
  goods: string[],
  { sortType, isReversed }: ReorderOptions,
) {
  // To avoid the original array mutation
  const visibleGoods = [...goods];

  function checkForReverse() {
    if (isReversed) {
      visibleGoods.reverse();
    }
  }

  if (sortType === SortType.NONE) {
    checkForReverse();

    return visibleGoods;
  }

  if (sortType) {
    switch (sortType) {
      case SortType.ALPHABET:
        visibleGoods.sort((good1, good2) => {
          return good1.localeCompare(good2);
        });

        checkForReverse();

        break;

      case SortType.LENGTH:
        visibleGoods.sort((good1, good2) => {
          return good1.length - good2.length;
        });

        checkForReverse();

        break;

      default:
        break;
    }
  }

  // Sort and reverse goods if needed
  // eslint-disable-next-line no-console
  console.log(sortType, isReversed);

  return visibleGoods;
}

// DON'T save goods to the state
// type State = {
//   isReversed: boolean,
//   sortType: SortType,
// };

export const App: React.FC = () => {
  const [reverse, setReverse] = useState(false);
  const [sortField, setSortField] = useState(SortType.NONE);

  const visibleGoods = getReorderedGoods(goodsFromServer, { sortType: sortField, isReversed: reverse });

  return (
    <div className="section content">
      <div className="buttons">
        <button
          type="button"
          className={cn('button is-info', { 'is-light': sortField !== SortType.ALPHABET })}
          onClick={() => setSortField(SortType.ALPHABET)}
        >
          Sort alphabetically
        </button>

        <button
          type="button"
          className={cn('button is-succes', { 'is-light': sortField !== SortType.LENGTH })}
          onClick={() => setSortField(SortType.LENGTH)}
        >
          Sort by length
        </button>

        <button
          type="button"
          className={cn('button is-warning', { 'is-light': reverse })}
          onClick={() => setReverse(!reverse)}
        >
          Reverse
        </button>

        <button
          type="button"
          className="button is-danger is-light"
          onClick={() => {
            setSortField(SortType.NONE);
            setReverse(false);
          }}
        >
          Reset
        </button>
      </div>

      <ul>
        <GoodsList goods={visibleGoods} />
      </ul>
    </div>
  );
};
