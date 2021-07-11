import { createSelector } from 'reselect';
import {initialGlobalState} from './slice'
const selectGlobal = (state: any) => state.global || initialGlobalState;

export const selectCollapsed = createSelector(
  selectGlobal,
  (globalState: any) => globalState.siderCollapsed,

)
