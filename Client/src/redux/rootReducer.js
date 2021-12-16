import { combineReducers } from 'redux';

// slices
import accountReducer from './slices/account';
import snackbarReducer from './slices/snackbar';

const rootReducer = combineReducers({
    account: accountReducer,
    snackbar: snackbarReducer
});

export { rootReducer };
