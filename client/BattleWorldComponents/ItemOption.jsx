/* eslint-disable jsx-a11y/click-events-have-key-events */
import React from 'react';

const ItemOption = (props) => {
  const {
    item,
    handleItem,
  } = props;

  return (
    <div
      className="frame__item-option"
      onClick={() => handleItem(item)}
      role="button"
      tabIndex={0}
    >
      {item.name}
      <span className="frame__item-count">
        x
        {item.count}
      </span>
    </div>
  );
};

export default ItemOption;
