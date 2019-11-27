import React from 'react'
import toJson from 'enzyme-to-json'
import { shallow } from 'enzyme'
import configureMockStore from 'redux-mock-store'
import withAuth from '../../withAuth'

describe('withAuth Snapshot Tests', () => {
  let WithAuthComponent
  let mockStore

  beforeEach(() => {
    mockStore = configureMockStore()
    const mockedComponent = jest.fn()
    WithAuthComponent = withAuth(mockedComponent)
  })

  it('should render the component with props.isAuthenticated equal to true', () => {
    const store = mockStore({
      currentUser: {
        isAuthenticated: true,
        user: {
          id: '7585jjjjgig85jtjv',
          username: 'testuser',
          profileImageUrl: 'https://lorempixel.com/200/200/'
        }
      }
    })
    const props = {
      history: {
        push: jest.fn()
      }
    }
    const wrapper = shallow(
      <WithAuthComponent { ...props } store={store} />
    )

    expect(toJson(wrapper)).toMatchSnapshot()
  })

  it('should render the component with props.isAuthenticated equal to false', () => {
    const store = mockStore({
      currentUser: {
        isAuthenticated: false,
        user: {}
      }
    })
    const props = {
      history: {
        push: jest.fn()
      }
    }
    const wrapper = shallow(
      <WithAuthComponent { ...props } store={store} />
    )

    expect(toJson(wrapper)).toMatchSnapshot()
  })
})
