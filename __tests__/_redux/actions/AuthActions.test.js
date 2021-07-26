import {
    signIn,
    // signUp,
    // getVerification,
    // logout,
    setError,
    // setSuccess,
    // setLoading,
} from '../../../src/redux/actions/AuthActions';
import * as reactRedux from 'react-redux';
import awsAmplify from 'aws-amplify';
import SET_USER from '../../../src/redux/types/AuthActionsTypes';
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import { Store } from '../../../src/redux/store/store';

jest.mock('aws-amplify');
jest.mock('../../../src/redux/actions/AuthActions');
awsAmplify.Auth.signIn.mockImplementation( (username, password) => {
    if (username === 'dummyuser' && password === '@Test000') {
        return Promise.resolve({ 
            getUsername: () => { 
                return 'dummyuser'
            } 
        });
    } else {
        return Promise.reject( new Error('username and password not recognized') );
    }
});

let store;
let mockStore;

describe('testing signIn', () => {
    const mockSetError = jest.fn();
    jest.mock('../../../src/redux/actions/AuthActions', () => ({
        setError: mockSetError,
    }));
    
    const mockOnError = jest.fn(() => { /*no-op*/});
    
    beforeEach( () => {
        mockStore = configureMockStore([thunk]);
        store = mockStore();
        console.log(store);
    });

    it('works', () => {
        const userData = {
            username: goodSignInData.username,
            password: goodSignInData.username,
            picture: `https://chirps-bucket-for-pics.s3.us-east-2.amazonaws.com/public/${goodSignInData.username}/myimages`
        };
        store.dispatch(signIn(goodSignInData, mockOnError)).then( () => {
            expect(store.getActions().toContain({
                    type: SET_USER,
                    payload: userData
            }));
        });
    });
});