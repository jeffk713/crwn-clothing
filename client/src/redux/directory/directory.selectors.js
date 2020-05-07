import { createSelector } from 'reselect';

const selectDirectory = state => state.directory; // from rootReducer

export const selectDirectorySections = createSelector(
  [selectDirectory],
  directory => directory.sections
);