import { combineReducers } from 'redux';

// slices
import patientReducer from './slices/patient';
import snackbarReducer from './slices/snackbar';
import dialogReducer from './slices/dialog';

const rootReducer = combineReducers({
    patient: patientReducer,
    snackbar: snackbarReducer,
    dialog: dialogReducer
});

export { rootReducer };
