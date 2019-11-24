import React from 'react'
import toJson from 'enzyme-to-json'
import { shallow } from 'enzyme'
import { MessageForm } from '../../MessageForm'

const props = {
  postNewMessage: jest.fn(),
  history: {
    push: jest.fn()
  },
  errors: {}
}

describe('MessageForm Snapshot Tests', () => {
  it('should render the MessageForm component without error message', () => {
    const wrapper = shallow(
      <MessageForm { ...props } />
    )

    expect(toJson(wrapper)).toMatchSnapshot()
  })
  
  it('should render the MessageForm component with error message', () => {
    const errors = {
      message: 'Sample error message'
    }
    const wrapper = shallow(
      <MessageForm { ...props } errors={errors} />
    )

    expect(toJson(wrapper)).toMatchSnapshot()
  })  
})
