import PropTypes from 'prop-types';
import { createContext, useEffect, useReducer } from 'react';
import { useDispatch } from 'react-redux';

// apis
import patientApi from '../apis/patientApi';
// utils
import { getToken, setToken, isValidToken } from '../utils/jwt';
// slices
import { getProfile } from '../redux/slices/patient';

const initialState = {
    isInitialized: false,
    isAuthenticated: false
};

const handlers = {
    INITIALIZE: (state, action) => {
        const isAuthenticated = action.payload;
        return {
            ...state,
            isAuthenticated,
            isInitialized: true
        }
    },
    LOGIN: (state) => {
        return {
            ...state,
            isAuthenticated: true
        }
    },
    LOGOUT: (state) => {
        return {
            ...state,
            isAuthenticated: false
        }
    }
};

const reducer = (state, action) => handlers[action.type] ? handlers[action.type](state, action) : state;

const propTypes = {
    children: PropTypes.node
};

const AuthContext = createContext({
    ...initialState,
    login: () => Promise.resolve(),
    register: () => Promise.resolve()
});

const AuthProvider = ({ children }) => {
    const [state, dispatch] = useReducer(reducer, initialState);
    const dispatchSlice = useDispatch();
    useEffect(() => {
        const initialize = async () => {
            try {
                const tokens = getToken();
                setToken(tokens);
                const isAuthenticated = await isValidToken(tokens);
                if (isAuthenticated) {
                    await dispatchSlice(getProfile());
                }
                dispatch({
                    type: 'INITIALIZE',
                    payload: isAuthenticated
                });
            } catch (error) {
                console.log(error);
            }
        };
        initialize();
    }, [dispatchSlice]);
    const login = async (code, password) => {
        const res = await patientApi.login(code, password);
        const { tokens, user } = res;
        setToken(tokens);
        await dispatchSlice(getProfile());
        dispatch({
            type: 'LOGIN'
        });
        return user;
    };
    const register = async body => {
        return await patientApi.register(body);
    };
    return (
        <AuthContext.Provider
            value={{
                ...state,
                login,
                register
            }}
        >
            {children}
        </AuthContext.Provider>
    );
};

AuthProvider.propTypes = propTypes;

export { AuthProvider, AuthContext };
