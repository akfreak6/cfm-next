import React, { FC, useState } from 'react';
import _ from 'lodash';

interface KeywordFilterProps {
  allKeywords: string[];
  selectedKeywords: string[];
  onSelectedKeywordChange: (newSelectedKeywords: string[]) => void;
}

const KeywordFilter: FC<KeywordFilterProps> = ({
  allKeywords,
  selectedKeywords,
  onSelectedKeywordChange,
}) => {
  return (
    <div>
      <h2 className='mt-5'>Keyword Filter</h2>
      <ul>
        {allKeywords.map((keyword) => (
          <li key={keyword} style={{ float: 'left', paddingRight: '20px' }}>
            <label>
              <input
                type="checkbox"
                checked={_.includes(selectedKeywords, keyword)}
                onChange={() => {
                  const newSelected = _.includes(selectedKeywords, keyword)
                    ? _.without(selectedKeywords, keyword)
                    : [...selectedKeywords, keyword];
                  onSelectedKeywordChange(newSelected);
                }}
              />
              {' '}
              {keyword}
            </label>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default KeywordFilter;
