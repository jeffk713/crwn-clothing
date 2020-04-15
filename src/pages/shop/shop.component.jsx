import React from 'react';

import SHOP_DATA from './shop.data.component'
import CollectionPreview from '../../components/collection-preview/collection-preview.component'

class ShopPage extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      collections: SHOP_DATA
    }  
  }

  render() {
    const {collections}= this.state;
    return (
      <div className='shop-page'> 
        {
          collections.map(({id, ...otherCollectioinProps})=> (
            <CollectionPreview key={id} {...otherCollectioinProps} />
          ))
        }
      </div>
    );
  }
}

export default ShopPage;