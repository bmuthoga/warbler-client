import React from 'react'
import toJson from 'enzyme-to-json'
import { shallow } from 'enzyme'
import { MessageList } from '../../MessageList'

const props = {
  fetchMessages: jest.fn(),
  messages: [],
  removeMessage: jest.fn(),
  currentUser: {}
}

describe('MessageList Snapshot Tests', () => {
  it('should render the MessageList component', () => {
    const wrapper = shallow(
      <MessageList { ...props } />
    )

    expect(toJson(wrapper)).toMatchSnapshot()
  })
})
