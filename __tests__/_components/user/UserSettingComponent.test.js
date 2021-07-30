import React from 'react'
import { Text, TouchableOpacity } from 'react-native'
import { mount } from 'enzyme';
import { testState } from '../../../src/shared/constants';
import { nestedHell } from '../../testFunctions';
import { Auth, Storage } from 'aws-amplify';
import * as ImagePicker from 'expo-image-picker';

import { UserBioComponent } from '../../../src/components/user/UserBioComponent';
import DeleteAccModal from '../../../src/components/semantic/DeleteAccModal';
import HeaderComponent from '../../../src/components/semantic/HeaderComponent';
import { UserSettingComponent } from '../../../src/components/user/UserSettingComponent';

let wrapper;

const component = (imageInit = null) => {
    return ( () => {
        return <UserSettingComponent imageInit={imageInit}/>
    });
}

// Mock all imported custom React Native components
//  see https://thoughtbot.com/blog/mocking-react-components-with-jest
jest.mock('../../../src/components/semantic/DeleteAccModal', () => {
    return ({
        __esModule: true,
        default: () => {
            return <></>
        },
    });
});
jest.mock('../../../src/components/semantic/HeaderComponent', () => {
    return ({
        __esModule: true,
        default: () => {
            return <></>;
        },
    });
});
jest.mock('../../../src/components/user/UserBioComponent', () => {
    return ({
        UserBioComponent: () => {
            return <></>;
        },
    });
});

/*
TO-DO:
deleteAccModal prop isModalVisible is modified when "delete account" is pressed
*/

describe('Testing UserSettingComponent', () => {
    beforeEach( () => {
        // Mock API calls so the screen isn't flooded with warnings
        jest.spyOn(ImagePicker, 'requestMediaLibraryPermissionsAsync').mockImplementation( () => {
            return Promise.resolve( {status: 'granted'} );
        });
        jest.spyOn(ImagePicker, 'requestCameraPermissionsAsync').mockImplementation( () => {
            return Promise.resolve( {status: 'granted'} );
        });
        jest.spyOn(ImagePicker, 'launchImageLibraryAsync').mockImplementation( () => {
            return Promise.resolve( {uri: 'someURI'} );
        });
        jest.spyOn(Storage, 'get').mockResolvedValue('someURI');
        jest.spyOn(Storage, 'put').mockResolvedValue( {key: 'someURI'} );
        jest.spyOn(global, 'fetch').mockImplementation( () => {
            return Promise.resolve( {blob: jest.fn()} );
        });
        jest.spyOn(Auth, 'currentCredentials').mockImplementation( () => {
           /*no-op*/
        });
        wrapper = mount( nestedHell(testState, component('d')) );
    });

    it('renders HeaderComponent', () => {
        expect(wrapper.find(HeaderComponent).length).toBeGreaterThan(0);
    });

    it('renders UserBioComponent', () => {
        expect(wrapper.find(UserBioComponent).length).toBeGreaterThan(0);
    });

    it('a component for editing pfp, and a component for deleting the account, that listen for press)', () => {
        const wrap = wrapper.find(TouchableOpacity)
        expect(wrap.length).toBeGreaterThan(1);
    });

    it('the first touchable component has a functioning event handler', async () => {
        const wrap = wrapper.find(TouchableOpacity).at(0);
        const event = 'onPress';
        const mockEventHandler = jest.spyOn(wrap.props(), event);
        await wrap.prop(event)();
        expect(mockEventHandler).toHaveBeenCalled();
    });

    it('the secobd touchable component has a functioning event handler', async () => {
        const wrap = wrapper.find(TouchableOpacity).at(1);
        const event = 'onPress';
        const mockEventHandler = jest.spyOn(wrap.props(), event);
        await wrap.prop(event)();
        expect(mockEventHandler).toHaveBeenCalled();
    });

    it('renders DeleteAccModal', () => {
        expect(wrapper.find(DeleteAccModal).length).toBeGreaterThan(0);
    });
});