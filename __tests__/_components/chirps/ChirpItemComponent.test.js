import React from 'react';
import  { Pressable, TouchableOpacity } from 'react-native';
import { mount } from 'enzyme'
import ChirpItemComponent from '../../../src/components/chirps/ChirpItemComponent'; 
import { testState } from '../../../src/shared/constants';
import { mockEvent } from '../../mocks';
import { formatTimestamp } from '../../../src/shared/functions';
import { nestedHell } from '../../testFunctions';

//mock all imported components
jest.mock('../../../src/components/semantic/ModalComponent', () => {
  return ({
      __esModule: true,
      default: () => {
          return <></>
      },
  });
});
jest.mock('../../../src/components/semantic/ImageViewModal', () => {
  return ({
      __esModule: true,
      default: () => {
          return <>{/*fragment*/}</>
      },
  });
});

const comments = [];
const username = 'dummyuser'
const body = 'chirpBody'
const timestamp = Date.now().toString();

const component = (hasBeenLiked=false, media='') => {
  return () => {
    let likes = [''];
    if (hasBeenLiked) {
      likes.push(username)
    }
    return (
      <ChirpItemComponent
        likes={likes}
        comments={comments}
        username={username}
        body={body}
        timestamp={timestamp}
        media={media}
      />
    );
  }
}

let wrapper;

describe('Testing ChirpItemComponent', () => {
  beforeEach( () => {
      wrapper = mount(nestedHell(testState, component(), 'x', 'user'));
  });

  it('should display the username of they who chirped', () => {
    const userWrapper = wrapper.findWhere( w => 
      w.text().includes(username)
    );
    expect(userWrapper.length > 0).toBe(true);
  });

  it('should display the body of the chirp', () => {
    const userWrapper = wrapper.findWhere( w => 
      w.text().includes(body)
    );
    expect(userWrapper.length > 0).toBe(true);
  });

  it('should display the timestamp of the chirp', () => {
    const userWrapper = wrapper.findWhere( w => 
      w.text().includes(formatTimestamp(new Date(Number(timestamp))))
    );
    expect(userWrapper.length > 0).toBe(true);
  });

  it('user can press the chirp', async () => {
    /*
    > setProps can only affect a root component, hence we rerender at 
        TouchableOpacity component
    > use shallow() because ReactWrapper.simulate('press') throws errors
        because Enzyme is fucking dogshit (shallow returns a ShallowWrapper 
        object, which is different from a ReactWrapper object (which is what 
        mount() returns))
    > If TouchableOpacity has TouchableOpacity children, then the find() will 
        return multiple nodes. Hence we assign use get(0) if we find multiple 
        nodes (0 will be the first one found when reading code top-down)
    */
    const temp = wrapper.find(TouchableOpacity);
    const wrap = shallow(temp.length < 2 ? temp.getElement() : temp.get(0));
    wrap.setProps( {onPress: mockEvent} );
    wrap.simulate('press');
    expect(mockEvent).toHaveBeenCalled();
  });

  it('user image has functional press event handler', async () => {
    const wrap = wrapper.find(Pressable).at(0);
    const event = 'onPress';
    const mockEventHandler = jest.spyOn(wrap.props(), event);
    await wrap.prop(event)();
    expect(mockEventHandler).toHaveBeenCalled();
  });

  it('like button has functional press event handler', async () => {
    const wrap = wrapper.find(Pressable).at(1);
    const event = 'onPress';
    const mockEventHandler = jest.spyOn(wrap.props(), event);
    await wrap.prop(event)();
    expect(mockEventHandler).toHaveBeenCalled();
  });

  it('triple-dot icon has functional press event handler', async () => {
    const wrap = wrapper.find(Pressable).at(2);
    const event = 'onPress';
    const mockEventHandler = jest.spyOn(wrap.props(), event);
    await wrap.prop(event)();
    expect(mockEventHandler).toHaveBeenCalled();
  });
});

it('if user already liked the chirp, you can unlike it', async () => {
  wrapper = mount(nestedHell(testState, component(true), 'x', 'user'))
  const wrap = wrapper.find(Pressable).at(1);
  const event = 'onPress';
  const mockEventHandler = jest.spyOn(wrap.props(), event);
  await wrap.prop(event)();
  expect(mockEventHandler).toHaveBeenCalled();
});

it('you can press the component to navigate to SingleChirpView', async () => {
  wrapper = mount(nestedHell(testState, component(), 'x', 'chirp'))
  const wrap = wrapper.find(TouchableOpacity);
  const event = 'onPress';
  const mockEventHandler = jest.spyOn(wrap.props(), event);
  await wrap.prop(event)();
  expect(mockEventHandler).toHaveBeenCalled();
});

it('If the chirp has media, a second pressable image is shown', async () => {
  wrapper = mount(nestedHell(testState, component(false, 'media')));
  const wrap = wrapper.find(Pressable);
  let eventHandlersCalled = 0;
  wrap.forEach( node => {
      const event = 'onPress';
      const mockEventHandler = jest.spyOn(node.props(), event);
      (async () => {
        await node.prop(event)();
      })();
      if (mockEventHandler.mock.calls.length > 0) {
        eventHandlersCalled++;
      }
  });
  expect(eventHandlersCalled).toBeGreaterThan(3);
})
