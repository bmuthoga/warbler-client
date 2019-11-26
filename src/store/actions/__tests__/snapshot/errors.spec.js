import configureMockStore from 'redux-mock-store'
import { addError, removeError } from '../../errors'

describe('Errors Action Creators Snapshot Tests', () => {
  let store
  const mockStore = configureMockStore()

  beforeEach(() => {
    store = mockStore({})
  })

  it('should create ADD_ERROR action if adding an error is successful', () => {
    store.dispatch(addError('Sample error message'))
    expect(store.getActions()).toMatchSnapshot()
  })

  it('should create REMOVE_ERROR action if removing an error is successful', () => {
    store.dispatch(removeError())
    expect(store.getActions()).toMatchSnapshot()
  })  
})
