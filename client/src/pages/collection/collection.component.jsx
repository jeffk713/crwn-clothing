import React from 'react';
import { connect } from 'react-redux';

import CollectionItem from '../../components/collection-item/collection-item.component';

import { selectCollection } from '../../redux/shop/shop.selectors';

import './collection.styles.scss';

const CollectionPage = ({ collection }) => { //Route comes with 3 parameters; match history location
  const {title, items} = collection;
  return (
  <div className='collection-page'>
    <h2 className='title'>{title}</h2>
    <div className='items'>
      {
        items.map(item=>(
          <CollectionItem key={item.id} item={item} />
        ))
      }
    </div>
  </div>
)}

const mapStateToProps = (state, ownProps) => ({
  collection: selectCollection(ownProps.match.params.collectionId)(state) //currying
  // 'selectCollection' returns 'createSelector' so when calling it, 
  //the syntax is "selectCollection(collectionUrlParam)(state)". lec 135 at 5:00
});

export default connect(mapStateToProps)(CollectionPage);