import React from 'react';
import { mount } from 'enzyme';
import { testState } from '../../../src/shared/constants';
import { nestedHell } from '../../testFunctions';

import { UserBioComponent } from '../../../src/components/user/UserBioComponent';
import DeleteAccModal from '../../../src/components/semantic/DeleteAccModal';
import HeaderComponent from '../../../src/components/semantic/HeaderComponent';
import { UserSettingComponent } from '../../../src/components/user/UserSettingComponent';

let wrapper;

const component = () => {
    return <UserSettingComponent/>
}

/*
TO-DO:
conditionally renders pfp picture
conditionally renders "edit picture"
deleteAccModal prop isModalVisible is modified when "delete account" is pressed
*/

describe('Testing UserSettingComponent', () => {
    beforeEach( () => {
        wrapper = mount( nestedHell(testState, component) );
    });

    it('renders HeaderComponent', () => {
        expect(wrapper.find(HeaderComponent).length).toBeGreaterThan(0);
    });

    it('renders UserBioComponent', () => {
        expect(wrapper.find(UserBioComponent).length).toBeGreaterThan(0);
    });

    it('renders text for deleting account that listens for press', () => {
        expect(
            wrapper.findWhere( node => 
                node.text().toLowerCase().includes('delete')
            )
            .length
        )
        .toBeGreaterThan(0);
    });

    it('renders DeleteAccModal', () => {
        expect(wrapper.find(DeleteAccModal).length).toBeGreaterThan(0);
    });
});
