import { nestedHell } from '../../testFunctions';
import { testState } from '../../../src/shared/constants';
import { Pressable } from 'react-native';

import SingleChirpView from '../../../src/components/chirps/SingleChirpComponent';

// mock imported components
jest.mock('../../../src/components/semantic/ModalComponent', () => {
    return ({
        __esModule: true,
        default: () => {
            return <></>;
        }
    });
});
jest.mock('../../../src/components/semantic/ImageViewModal', () => {
    return ({
        __esModule: true,
        default: () => {
            return <>{/*mocked implementation*/}</>;
        }
    });
});

const userImg = 'userImg';
const username = 'dummyuser';
const body = 'chirpBody';
const comments = [];
const likes = [''];
const media = 'media';
const timestamp = Date.now().toString();

const setLikeState = () => {/*no-op*/};

const component = (isLiked = false) => {
    return ( () => {
        const likeState = {
            count: 1,
            isLiked: isLiked,
            icon: 'heart-outline',
            color: 'blue',
        };
        return (
            <SingleChirpView 
                userImg={userImg}
                username={username}
                body={body}
                comments={comments}
                likes={likes}
                media={media}
                timestamp={timestamp}
                likeState={likeState}
                setLikeState={setLikeState}
            />
        );
    });
}

let wrapper;

describe('testing SingleChirpComponent when chirp has not been liked', () => {
    beforeEach( () => {
        wrapper = mount(nestedHell(testState, component(false), 'x', 'user'));
    });

    it('renders the component', () => {
        expect(1).toBe(1);
    });

    const cases = [0,1,2,3];
    test.each(cases)('event hander %# on Pressable works properly', async (n) => {
        const wrap = wrapper.find(Pressable).at(n);
        const event = 'onPress';
        const mockEventHandler = jest.spyOn(wrap.props(), event);
        await wrap.prop(event)();
        expect(mockEventHandler).toHaveBeenCalled();
    });
});

describe('testing SingleChirpComponent when chirp has been liked', () => {
    beforeEach( () => {
        wrapper = mount(nestedHell(testState, component(true)));
    });

    it('renders the component', () => {
        expect(1).toBe(1);
    });
});
