import * as React from 'react';

import {
  ItemContainer,
} from './styles';

interface ItemContainerProps {
  item?: ItemProps;
}

interface ItemProps {
  name?: string;
}

const Item = ({item}: ItemContainerProps) => {
  return <ItemContainer>
    <h3>
      {item.name}
    </h3>
  </ItemContainer>;
};

export default Item;
