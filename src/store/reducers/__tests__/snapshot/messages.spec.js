import messagesReducer from '../../messages'
import { LOAD_MESSAGES, REMOVE_MESSAGE } from '../../../actionTypes'

describe('Messages Reducer Snapshot Tests', () => {
  it('should return the initial state', () => {
    expect(messagesReducer(undefined, {})).toMatchSnapshot()
  })

  it('should handle LOAD_MESSAGES', () => {
    const messages = [
      {
        _id: '87y42f49hg94h9g',
        text: 'First sample message',
        user: {
          _id: '938490u98r4jv94jvj8',
          username: 'firstTestUser',
          profileImageUrl: 'https://lorempixel.com/200/200/'
        },
        createdAt: '2019-11-23T16:45:46.174Z',
        updatedAt: '2019-11-23T16:45:46.174Z'
      },
      {
        _id: '9485g0984g04g0094g',
        text: 'Second sample message',
        user: {
          _id: '948v0845v704788r7v879r',
          username: 'secondTestUser',
          profileImageUrl: 'https://lorempixel.com/200/200/'
        },
        createdAt: '2019-11-23T16:41:16.340Z',
        updatedAt: '2019-11-23T16:41:16.340Z'
      }
    ]
    expect(messagesReducer(undefined, { type: LOAD_MESSAGES, messages })).toMatchSnapshot()
  })

  it('should handle REMOVE_MESSAGE', () => {
    const state = [
      {
        _id: '87y42f49hg94h9g',
        text: 'First sample message',
        user: {
          _id: '938490u98r4jv94jvj8',
          username: 'firstTestUser',
          profileImageUrl: 'https://lorempixel.com/200/200/'
        },
        createdAt: '2019-11-23T16:45:46.174Z',
        updatedAt: '2019-11-23T16:45:46.174Z'
      },
      {
        _id: '9485g0984g04g0094g',
        text: 'Second sample message',
        user: {
          _id: '948v0845v704788r7v879r',
          username: 'secondTestUser',
          profileImageUrl: 'https://lorempixel.com/200/200/'
        },
        createdAt: '2019-11-23T16:41:16.340Z',
        updatedAt: '2019-11-23T16:41:16.340Z'
      }
    ]
    expect(messagesReducer(state, { type: REMOVE_MESSAGE, id: state[1]._id })).toMatchSnapshot()
  })
})
