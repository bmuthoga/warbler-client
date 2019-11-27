import React from 'react'
import { mount } from 'enzyme'
import configureMockStore from 'redux-mock-store'
import withAuth from '../../withAuth'

describe('withAuth Unit Tests', () => {
  let WithAuthComponent
  let mockStore

  beforeEach(() => {
    mockStore = configureMockStore()
    const mockedComponent = () => <div className='mockedComponent'>The mocked component</div>
    WithAuthComponent = withAuth(mockedComponent)
  })

  it('should render the wrapped component if the user is authenticated', () => {
    const store = mockStore({
      currentUser: {
        isAuthenticated: true,
        user: {
          id: '858htuhu58hhurh87',
          username: 'testuser',
          profileImageUrl: 'https://lorempixel.com/200/200/'
        }
      }
    })
    const wrapper = mount(
      <WithAuthComponent store={store} />
    )

    expect(wrapper.html()).not.toBe(null)
    expect(wrapper.html()).toEqual('<div class="mockedComponent">The mocked component</div>')
    expect(wrapper.find('div.mockedComponent').text()).toEqual('The mocked component')
  })

  it('should redirect to /signin if the user is not signed in', () => {
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
    const wrapper = mount(
      <WithAuthComponent { ...props } store={store} />
    )
    expect(wrapper.props().history.push).toHaveBeenCalled()
    expect(wrapper.props().history.push).toHaveBeenCalledTimes(1)
    expect(wrapper.props().history.push).toHaveBeenCalledWith('/signin')
  })
})
