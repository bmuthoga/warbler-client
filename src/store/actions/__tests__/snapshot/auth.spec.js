import configureMockStore from 'redux-mock-store'
import { setCurrentUser } from '../../auth'

describe('Auth Action Creators Snapshot Tests', () => {
  let store
  const mockStore = configureMockStore()

  beforeEach(() => {
    store = mockStore({})
  })

  it('should create SET_CURRENT_USER action if signup/signin is successful', () => {
    const user = {
      id: '7784fh489g90239f45',
      username: 'testUser',
      profileImageUrl: 'https://lorempixel.com/200/200/'
    }
    store.dispatch(setCurrentUser(user))
    expect(store.getActions()).toMatchSnapshot()
  })  
})
