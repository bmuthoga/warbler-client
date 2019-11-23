import React from 'react'
import { shallow } from 'enzyme'
import AuthForm from '../../AuthForm'
import sinon from 'sinon'

// const [ onAuth, history, removeError ] = new Array(3).fill(jest.fn())
const removeError = jest.fn()
const onAuth = sinon.fake.returns(Promise.resolve({}))
const history = {
  push: jest.fn(),
  listen: jest.fn()
}
let errors = { message: null }

function shallowSetup() {
  const commonProps = {
    onAuth,
    errors,
    removeError,
    history
  }

  const loginProps = {
    ...commonProps,
    buttonText: 'Log in',
    heading: 'Welcome Back'
  }

  const enzymeLoginWrapper = shallow(<AuthForm { ...loginProps } />)
  return { loginProps, enzymeLoginWrapper }
}

describe('Login Form Tests', () => {
  it('should render a login form with correct attributes', () => {
    const { loginProps, enzymeLoginWrapper } = shallowSetup()

    expect(enzymeLoginWrapper.find('form').exists()).toBe(true)
    expect(enzymeLoginWrapper.find('h2').text()).toBe(loginProps.heading)
    expect(enzymeLoginWrapper.find('label').first().props().htmlFor).toEqual('email')
    expect(enzymeLoginWrapper.find('label').first().text()).toEqual('Email:')
    expect(enzymeLoginWrapper.find('input').first().props().value).toEqual('')
    expect(enzymeLoginWrapper.find('label').at(1).props().htmlFor).toEqual('password')
    expect(enzymeLoginWrapper.find('label').at(1).text()).toEqual('Password:')
    expect(enzymeLoginWrapper.find('input').at(1).props().value).toEqual('')
    expect(enzymeLoginWrapper.find('label').length).toBe(2)
    expect(enzymeLoginWrapper.find('input').length).toBe(2)
  })


  describe('Interacting with the login form', () => {
    let loginWrapper
    let props_

    beforeEach(() => {
      sinon.spy(AuthForm.prototype, 'handleChange')
      sinon.spy(AuthForm.prototype, 'handleSubmit')
      // AuthForm.prototype.handleSubmit = sinon.fake()
      const { loginProps, enzymeLoginWrapper } = shallowSetup()
      loginWrapper = enzymeLoginWrapper
      props_ = loginProps
    })

    afterEach(() => {
      AuthForm.prototype.handleChange.restore()
      AuthForm.prototype.handleSubmit.restore()
      // loginWrapper = null
      // props_ = null
    })

    it('should change state when input values change and call handleChange', () => {
      const emailInput = loginWrapper.find('input').at(0)
      const passwordInput = loginWrapper.find('input').at(1)
      emailInput.simulate('change', {
        target: {
          value: 'testemail@email.com',
          name: 'email'
        }
      })
      passwordInput.simulate('change', {
        target: {
          value: 'password123',
          name: 'password'
        }
      })
      expect(loginWrapper.state().email).toEqual('testemail@email.com')
      expect(loginWrapper.state().password).toEqual('password123')
      expect(AuthForm.prototype.handleChange.calledTwice).toBe(true)
    })

    it('should call handleSubmit when form is submitted and attempt to authenticate', () => {
      const emailInput = loginWrapper.find('input').at(0)
      const passwordInput = loginWrapper.find('input').at(1)
      emailInput.simulate('change', {
        target: {
          value: 'testemail@email.com',
          name: 'email'
        }
      })
      passwordInput.simulate('change', {
        target: {
          value: 'password123',
          name: 'password'
        }
      })
      const loginForm = loginWrapper.find('form').first()
      loginForm.simulate('submit', {
        preventDefault: () => {}
      })

      expect(AuthForm.prototype.handleSubmit.calledOnce).toBe(true)
      expect(loginWrapper.instance().props.onAuth.calledOnce).toBe(true)
    })

    it('should display errors if present', () => {
      loginWrapper.setProps({
        errors: {
          message: 'Invalid email or password'
        }
      })
      expect(loginWrapper.find('div.alert').text()).toEqual(loginWrapper.instance().props.errors.message)
    })

    it('should clear any errors upon successful authentication', () => {
      const emailInput = loginWrapper.find('input').at(0)
      const passwordInput = loginWrapper.find('input').at(1)
      loginWrapper.setProps({
        errors: {
          message: 'Invalid email or password'
        }
      })
      emailInput.simulate('change', {
        target: {
          value: 'testemail@email.com',
          name: 'email'
        }
      })
      passwordInput.simulate('change', {
        target: {
          value: 'password123',
          name: 'password'
        }
      })
      const loginForm = loginWrapper.find('form').first()
      loginForm.simulate('submit', {
        preventDefault: () => {}
      })

      expect(loginWrapper.instance().props.history.push).toHaveBeenCalled()
      expect(loginWrapper.instance().props.history.listen).toHaveBeenCalled()
    })
  })  
})
