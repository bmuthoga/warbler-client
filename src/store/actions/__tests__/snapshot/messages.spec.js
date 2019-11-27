import configureMockStore from 'redux-mock-store'
import thunk from 'redux-thunk'
import {
  loadMessages,
  remove
} from '../../messages'

describe('Messages Action Creators Snapshot Tests', () => {
  let store
  const mockStore = configureMockStore([thunk])

  beforeEach(() => {
    store = mockStore({})
  })

  it('should create LOAD_MESSAGES action if loading messages is successful', () => {
    const messages = [
      {
        _id: '8995ijg85ug8u58g8g858',
        text: 'First sample message',
        user: {
          _id: '7f99fd9r7f800g8g8g9g',
          username: 'firstTestUser',
          profileImageUrl: 'http://lorempixel.com/200/200/'
        },
        createdAt: '2019-11-23T16:45:46.174Z',
        updatedAt: '2019-11-23T16:45:46.174Z'
      },
      {
        _id: '3h5k5h45k6g6g6k6kj6h6k',
        text: 'Second sample message',
        user: {
          _id: '4vb5kl97dsfu485gjig',
          username: 'secondTestUser',
          profileImageUrl: 'http://lorempixel.com/200/200/'
        },
        createdAt: '2019-11-23T16:45:46.174Z',
        updatedAt: '2019-11-23T16:45:46.174Z'
      }
    ]
    store.dispatch(loadMessages(messages))
    expect(store.getActions()).toMatchSnapshot()
  })

  it('should create REMOVE_MESSAGE action if removing a message is successful', () => {
    const messageId = '484hjf8r99g94jg9jg'
    store.dispatch(remove(messageId))
    expect(store.getActions()).toMatchSnapshot()
  })  
})
