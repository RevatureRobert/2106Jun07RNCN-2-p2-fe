import React from 'react';
import  { Image } from 'react-native';
import { mount } from 'enzyme';
import { testState } from '../../../src/shared/constants';
import { nestedHell } from '../../testFunctions';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

import ImageViewModal from '../../../src/components/semantic/ImageViewModal';

const chirperLogo = require('../../../src/assets/chirperLogo.png');

let wrapper;

const isModalVisible = true;
const setModalVisible = () => {/*no-op*/};
const imgUrl = testState.auth.user.picture;
const username = testState.auth.user.username;
const body = testState.chirps.chirps[0].body;

const component = () => {
    return (
        <ImageViewModal
            isModalVisible={isModalVisible}
            setModalVisible = {setModalVisible}
            imgUrl={imgUrl}
            username={username}
            body={body}
        />
    );
}

describe('Testing ImageViewModal', () => {
    beforeEach( () => {
        wrapper = mount( nestedHell(testState, component));
    });

    it('displays an X (close icon) that listens for press', () => {
        expect(
            wrapper.findWhere( node => 
                node.prop('onPress') !== undefined
            ).find(MaterialCommunityIcons).length
        ).toBeGreaterThan(0);
    });

    it('displays image', () => {
        expect(
            wrapper.find(Image).findWhere( node => 
                node.prop('source')['uri'] === imgUrl
            ).length
        ).toBeGreaterThan(0);
        
    });

    it('displays chirp username', () => {
        expect(
            wrapper.someWhere( node => 
                node.text().includes(username)
            )
        ).toBe(true);
    });

    it('displays chirp body', () => {
        expect(
            wrapper.someWhere( node => 
                node.text().includes(body)
            )
        ).toBe(true);
    });
});