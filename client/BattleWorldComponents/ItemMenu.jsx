import React from 'react';
import ItemOption from './ItemOption';

const ItemMenu = (props) => {
  const {
    items,
    itemUse,
    throwBall,
    opponent,
    toggleToWorld,
    handleOpponentAttack,
  } = props;

  const handleItem = (item) => {
    // use item
    if (item.recover >= 1) itemUse(item);
    if (item.recover === -1) {
      throwBall({ chosen: item, opponent });
      return toggleToWorld();
    }
    handleOpponentAttack();
  };

  const generateItemList = () => {
    const itemsInBag = Object.keys(items);
    return itemsInBag.map((item, i) => (
      <ItemOption
        key={"i" + i}
        item={items[item]}
        handleItem={handleItem}
      />
    ));
  };

  return (
    <section className="frame__item-menu">
      {generateItemList()}
    </section>
  );
};

export default ItemMenu;
