import { combineReducers } from '@reduxjs/toolkit';
import countryReducer from './reducer';

const rootReducer = combineReducers({
    country: countryReducer,
});

export type RootState = ReturnType<typeof rootReducer>;
export default rootReducer;