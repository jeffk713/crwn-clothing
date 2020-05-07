import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';

import { selectIsCollectionFetching} from '../../redux/shop/shop.selectors';
import WithSpinner from '../with-spinner/with-spinner.component';
import CollectionsOverview from './collections-overview.component';

const mapSateToProps = createStructuredSelector({
  isLoading: selectIsCollectionFetching // name has to be the one 'withPinner' expects cause 'isLoading' will be passed into withSpinner
})

//const CollectionsOverviewContainer = connect(mapSateToProps)(withSpinner(CollectionsOverview));
// this way is harder to read.

const CollectionsOverviewContainer = compose( //compse evaluates from right to left, it will evaluate WithSpinner first and then connect
  connect(mapSateToProps),
  WithSpinner
)(CollectionsOverview);

export default CollectionsOverviewContainer;