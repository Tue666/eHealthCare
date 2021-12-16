import PropTypes from 'prop-types';
import { createContext, useEffect, useReducer } from 'react';
import { useDispatch } from 'react-redux';

// apis
import accountApi from '../apis/accountApi';
// utils
import { getToken, setToken, isValidToken } from '../utils/jwt';
// slices
import { getProfile, removeAccount } from '../redux/slices/account';

const initialState = {
    isInitialized: false,
    role: null
};

const handlers = {
    INITIALIZE: (state, action) => {
        const role = action.payload;
        return {
            ...state,
            isInitialized: true,
            role
        }
    },
    LOGIN: (state, action) => {
        const role = action.payload;
        return {
            ...state,
            role
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
    register: () => Promise.resolve(),
    logout: () => Promise.resolve()
});

const AuthProvider = ({ children }) => {
    const [state, dispatch] = useReducer(reducer, initialState);
    const dispatchSlice = useDispatch();
    useEffect(() => {
        const initialize = async () => {
            try {
                const tokens = getToken();
                setToken(tokens);
                const role = await isValidToken(tokens);
                if (role) {
                    await dispatchSlice(getProfile());
                }
                dispatch({
                    type: 'INITIALIZE',
                    payload: role
                });
            } catch (error) {
                console.log(error);
            }
        };
        initialize();
    }, [dispatchSlice]);
    const login = async (code, password) => {
        const res = await accountApi.login(code, password);
        const { tokens, account } = res;
        setToken(tokens);
        account && await dispatchSlice(getProfile());
        dispatch({
            type: 'LOGIN',
            payload: account.role
        });
        return account;
    };
    const register = async body => {
        return await accountApi.register(body);
    };
    const logout = async () => {
        setToken(null);
        dispatchSlice(removeAccount());
    };
    return (
        <AuthContext.Provider
            value={{
                ...state,
                login,
                register,
                logout
            }}
        >
            {children}
        </AuthContext.Provider>
    );
};

AuthProvider.propTypes = propTypes;

export { AuthProvider, AuthContext };
