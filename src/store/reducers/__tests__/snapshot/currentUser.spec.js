import authReducer from '../../currentUser'
import { SET_CURRENT_USER } from '../../../actionTypes'

describe('Auth Reducer Snapshot Tests', () => {
  it('should return the initial state', () => {
    expect(authReducer(undefined, {})).toMatchSnapshot()
  })

  it('should handle SET_CURRENT_USER', () => {
    const user = {
      id: '89498gh94ug95g0',
      username: 'testUser',
      profileImageUrl: 'http://lorempixel.com/200/200/'
    }
    expect(authReducer(undefined, { type: SET_CURRENT_USER, user })).toMatchSnapshot()
  })
})
