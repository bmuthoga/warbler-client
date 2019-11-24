import React from 'react'
import toJson from 'enzyme-to-json'
import { shallow } from 'enzyme'
import MessageItem from '../../MessageItem'

const messageItemProps= {
  date: '2019-11-18T01:31:05.005Z',
  text: 'Sample message text',
  username: 'testemail',
  profileImageUrl: 'http://lorempixel.com/200/200/',
  removeMessage: jest.fn()
}

describe('MessageItem Snapshot Tests', () => {
  it('should render the MessageItem component without the Delete message button if the message belongs to another user', () => {
    const wrapper = shallow(
      <MessageItem { ...messageItemProps } />
    )

    expect(toJson(wrapper)).toMatchSnapshot()
  })

  it('should render the MessageItem component with the Delete message button if the message belongs to the current user', () => {
    const wrapper = shallow(
      <MessageItem { ...messageItemProps } isCorrectUser={true} />
    )

    expect(toJson(wrapper)).toMatchSnapshot()
  })
})
