import React, { useEffect } from 'react';
import { Route } from 'react-router-dom';
import { connect } from 'react-redux';

import { fetchCollectionsStart } from '../../redux/shop/shop.actions';

import CollectionsOverviewContainer from '../../components/collections-overview/collections-overview.container';
import CollectionPageContainer from '../../pages/collection/collection.container';


const ShopPage = ({ fetchCollectionsStart, match }) => {
  useEffect(() => {
    fetchCollectionsStart(); 
    // useEffect thinks fetchCollectionsStart() is just from props not from mapDispatchToProps.
    // thats why when we don't set the array as the second argument, 
    // it will give a warning message in case fetchCollectionsStart() changes too often.
  }, [fetchCollectionsStart]) 
  // call 'fetchCollectionsStart()' only there is an update on fetchCollectionsStart
  // we know fetchCollection sStart() is a props and it won't change.
  // if we don't set the array, fetchCollectionsStart() will fire twice from checkCurrentUser of 'App' component.
  // Lec 199 8:00
  
  // componentDidMount() {
  //   const { fetchCollectionsStart } = this.props;
  //   fetchCollectionsStart();
  // }
    //const { match} = this.props; //Route comes with 3 parmeters; match history location
    return (
      <div className='shop-page'> 
        <Route 
          exact path={`${match.path}`} 
          component={CollectionsOverviewContainer}
        />
        <Route 
          path={`${match.path}/:collectionId`} 
          component={CollectionPageContainer} 
        />
      </div>
    );
  }


const mapDispatchToProps = dispatch => ({
  fetchCollectionsStart: () => dispatch(fetchCollectionsStart())
})
export default connect(null, mapDispatchToProps)(ShopPage);