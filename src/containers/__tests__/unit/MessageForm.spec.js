import React from 'react'
import { shallow } from 'enzyme'
import sinon from 'sinon'
import { MessageForm } from '../../MessageForm'

const props = {
  postNewMessage: jest.fn(),
  history: {
    push: jest.fn()
  },
  errors: {}
}

function shallowSetup() {
  const errors = {
    message: 'Sample error message'
  }
  const defaultWrapper = shallow(
    <MessageForm { ...props } />
  )
  const alternativeWrapper = shallow(
    <MessageForm { ...props } errors={errors} />
  )
  return { defaultWrapper, alternativeWrapper }
}

describe('MessageForm Unit Tests', () => {
  let noErrorWrapper

  beforeEach(() => {
    sinon.spy(MessageForm.prototype, 'handleNewMessage')

    const { defaultWrapper } = shallowSetup()
    noErrorWrapper = defaultWrapper

    const messageInput = noErrorWrapper.find('input').at(0)
    messageInput.simulate('change', {
      target: {
        value: 'Sample message text'
      }
    })
  })

  afterEach(() => {
    MessageForm.prototype.handleNewMessage.restore()
  })

  it('should render the MessageForm component without error message', () => {
    const { defaultWrapper } = shallowSetup()

    expect(defaultWrapper.find('form').exists()).toBe(true)
    expect(defaultWrapper.find('div.alert alert-danger').exists()).not.toBe(true)
    expect(defaultWrapper.find('input').length).toEqual(1)
    expect(defaultWrapper.find('input').first().props().value).toEqual('')
    expect(defaultWrapper.find('button').text()).toEqual('Add my message!')
    expect(defaultWrapper.find('button').length).toEqual(1)
  })
  
  it('should render the MessageForm component with error message', () => {
    const { alternativeWrapper } = shallowSetup()

    expect(alternativeWrapper.find('form').exists()).toBe(true)
    expect(alternativeWrapper.find('div').at(0).hasClass('alert alert-danger')).toBe(true)
    expect(alternativeWrapper.find('input').length).toEqual(1)
    expect(alternativeWrapper.find('input').first().props().value).toEqual('')
    expect(alternativeWrapper.find('button').text()).toEqual('Add my message!')
    expect(alternativeWrapper.find('button').length).toEqual(1)
  })

  it('should update local state on input change', () => {
    expect(noErrorWrapper.state().message).toEqual('Sample message text')
  })

  it('should call handleNewMessage when form is submitted', () => {
    const messageForm = noErrorWrapper.find('form').first()
    messageForm.simulate('submit', {
      preventDefault: () => {}
    })

    expect(MessageForm.prototype.handleNewMessage.calledOnce).toBe(true)
    expect(noErrorWrapper.instance().props.postNewMessage).toHaveBeenCalled()
    expect(noErrorWrapper.instance().props.history.push).toHaveBeenCalled()
  })
})
