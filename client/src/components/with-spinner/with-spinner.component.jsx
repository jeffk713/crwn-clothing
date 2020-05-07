import React from 'react';

import { SpinnerContainer, SpinnerOverlay } from './with-spinner.styles';

const WithSpinner = Wrappedcomponent => ({ isLoading, ...otherProps }) => {
  return isLoading? (
    <SpinnerOverlay>
      <SpinnerContainer />
    </SpinnerOverlay>
  ) : (
    <Wrappedcomponent {...otherProps} />
  )
}

// SAME AS BELOW
// const WithSpinner = Wrappedcomponent => {

//   const spinner = ({ isLoading, ...otherProps }) => {
//   return isLoading? (
//     <SpinnerOverlay>
//       <SpinnerContainer />
//     </SpinnerOverlay>
//     ) : (
//     <Wrappedcomponent {...otherProps} />
//     )
//   }
//   return spinner;
// };

export default WithSpinner;