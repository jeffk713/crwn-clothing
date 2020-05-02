import React from 'react';
import { Route } from 'react-router-dom';
import { connect } from 'react-redux';

import { updateCollections } from '../../redux/shop/shop.actions';

import WithSpinner from '../../components/with-spinner/with-spinner.component';

import CollectionsOverview from '../../components/collections-overview/collections-overview.component';
import CollectionPage from '../../pages/collection/collection.component';

import { firestore, convertCollectionsSnapshotToMap } from '../../firebase/firebase.utils';

const CollectionsOverviewWithSpinner = WithSpinner(CollectionsOverview);
const CollectionPageWithSpinner = WithSpinner(CollectionPage);


class ShopPage extends React.Component {
  state = {
    loading: true
  }

  unsubscribeFromSnapshot = null;

  componentDidMount() {
    const { updateCollections } = this.props;
    const collectionRef = firestore.collection('collections');
    collectionRef.get().then(snapshot => console.log(snapshot.docs[0].data()));
    
    // fetch pattern
    /*
    fetch('https://firestore.googleapis.com/v1/projects/crwn-db-7ddd8/databases/(default)/documents/collections')
    .then(response=> response.json())
    .then(collections=> console.log(collections)); // the data is extremely nested, in this case it is not a good option.
    */

    // Promise base pattern. it gets new data only when the component remounts, not live update
    collectionRef.get().then(snapshot => { 
      //.get() makes 'API call' in componentDiMount to fetch back data, just like snapshot object from observer pattern
      // we use '.then()' because it is a promise
      const collectionsMap = convertCollectionsSnapshotToMap(snapshot);
      updateCollections(collectionsMap);
      this.setState({ loading: false });
    })
    

    //observer/observable pattern, using firestore library. it updates data whenever data is updated, live update 
    /*
    this.unsubscribeFromSnapshot = collectionRef.onSnapshot(async  snapshot => {  //whenever collectionRef updates
      const collectionsMap = convertCollectionsSnapshotToMap(snapshot);
      updateCollections(collectionsMap);
      this.setState({ loading: false })
      })
    */
    
  }
  render() {
    const { match } = this.props; //Route comes with 3 parmeters; match history location
    const { isLoading } = this.state;
    return (
      <div className='shop-page'> 
        <Route 
          exact path={`${match.path}`} 
          render={(props) => <CollectionsOverviewWithSpinner isLoading={isLoading} {...props} />} 
        />
        <Route 
          path={`${match.path}/:collectionId`} 
          render={(props) => <CollectionPageWithSpinner isLoading={isLoading} {...props} />}  
        />
      </div>
    );
  }
}

const mapDispatchToProps = dispatch => ({
  updateCollections: colletionsMap => dispatch(updateCollections(colletionsMap))
})
export default connect(null, mapDispatchToProps)(ShopPage);