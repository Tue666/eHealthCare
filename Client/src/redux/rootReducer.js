import { combineReducers } from 'redux';

// slices
import accountReducer from './slices/account';
import snackbarReducer from './slices/snackbar';
import dialogReducer from './slices/dialog';

const rootReducer = combineReducers({
    account: accountReducer,
    snackbar: snackbarReducer,
    dialog: dialogReducer
});

export { rootReducer };
