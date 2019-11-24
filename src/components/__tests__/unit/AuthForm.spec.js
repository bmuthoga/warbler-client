import React from 'react'
import { shallow } from 'enzyme'
import sinon from 'sinon'
import AuthForm from '../../AuthForm'

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

  const signUpProps = {
    ...commonProps,
    buttonText: 'Sign me up!',
    heading: 'Join Warbler Today',
    signUp: true
  }

  const enzymeLoginWrapper = shallow(<AuthForm { ...loginProps } />)
  const enzymeSignUpWrapper = shallow(<AuthForm { ...signUpProps } />)
  return { loginProps, signUpProps, enzymeLoginWrapper, enzymeSignUpWrapper }
}

describe('AuthForm Unit Tests', () => {
  let loginWrapper
  let signupWrapper
  
  beforeEach(() => {
    sinon.spy(AuthForm.prototype, 'handleChange')
    sinon.spy(AuthForm.prototype, 'handleSubmit')

    const { enzymeLoginWrapper, enzymeSignUpWrapper } = shallowSetup()
    loginWrapper = enzymeLoginWrapper
    signupWrapper = enzymeSignUpWrapper

    const emailLoginInput = loginWrapper.find('input').at(0)
    const passwordLoginInput = loginWrapper.find('input').at(1)
    emailLoginInput.simulate('change', {
      target: {
        value: 'testemail@email.com',
        name: 'email'
      }
    })
    passwordLoginInput.simulate('change', {
      target: {
        value: 'password123',
        name: 'password'
      }
    })

    const emailSignUpInput = signupWrapper.find('input').at(0)
    const passwordSignUpInput = signupWrapper.find('input').at(1)
    const usernameSignUpInput = signupWrapper.find('input').at(2)
    const profileImageUrlSignUpInput = signupWrapper.find('input').at(3)
    emailSignUpInput.simulate('change', {
      target: {
        value: 'testemail@email.com',
        name: 'email'
      }
    })
    passwordSignUpInput.simulate('change', {
      target: {
        value: 'password123',
        name: 'password'
      }
    })
    usernameSignUpInput.simulate('change', {
      target: {
        value: 'testemail',
        name: 'username'
      }
    })
    profileImageUrlSignUpInput.simulate('change', {
      target: {
        value: 'http://lorempixel.com/200/200/',
        name: 'profileImageUrl'
      }
    })
  })

  afterEach(() => {
    AuthForm.prototype.handleChange.restore()
    AuthForm.prototype.handleSubmit.restore()
  })

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
      expect(enzymeLoginWrapper.find('button').text()).toBe(loginProps.buttonText)
      expect(enzymeLoginWrapper.find('label').length).toBe(2)
      expect(enzymeLoginWrapper.find('input').length).toBe(2)
      expect(enzymeLoginWrapper.find('button').length).toBe(1)
    })
  
    describe('Interacting with the login form', () => {
      it('should change state when input values change and call handleChange', () => {
        expect(loginWrapper.state().email).toEqual('testemail@email.com')
        expect(loginWrapper.state().password).toEqual('password123')
        expect(AuthForm.prototype.handleChange.called).toBe(true)
      })
  
      it('should call handleSubmit when form is submitted and attempt to authenticate', () => {
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
        loginWrapper.setProps({
          errors: {
            message: 'Invalid email or password'
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
  
  describe('SignUp Form Tests', () => {
    it('should render a signup form with correct attributes', () => {
      const { signUpProps, enzymeSignUpWrapper } = shallowSetup()
  
      expect(enzymeSignUpWrapper.find('form').exists()).toBe(true)
      expect(enzymeSignUpWrapper.find('h2').text()).toBe(signUpProps.heading)
      expect(enzymeSignUpWrapper.find('label').first().props().htmlFor).toEqual('email')
      expect(enzymeSignUpWrapper.find('label').first().text()).toEqual('Email:')
      expect(enzymeSignUpWrapper.find('input').first().props().value).toEqual('')
      expect(enzymeSignUpWrapper.find('label').at(1).props().htmlFor).toEqual('password')
      expect(enzymeSignUpWrapper.find('label').at(1).text()).toEqual('Password:')
      expect(enzymeSignUpWrapper.find('input').at(1).props().value).toEqual('')
      expect(enzymeSignUpWrapper.find('label').at(2).props().htmlFor).toEqual('username')
      expect(enzymeSignUpWrapper.find('label').at(2).text()).toEqual('Username:')
      expect(enzymeSignUpWrapper.find('input').at(2).props().value).toEqual('')
      expect(enzymeSignUpWrapper.find('label').at(3).props().htmlFor).toEqual('image-url')
      expect(enzymeSignUpWrapper.find('label').at(3).text()).toEqual('Image URL:')
      expect(enzymeSignUpWrapper.find('input').at(3).props().value).toEqual('')
      expect(enzymeSignUpWrapper.find('button').text()).toBe(signUpProps.buttonText)
      expect(enzymeSignUpWrapper.find('label').length).toBe(4)
      expect(enzymeSignUpWrapper.find('input').length).toBe(4)
      expect(enzymeSignUpWrapper.find('button').length).toBe(1)
    })
    
    describe('Interacting with the signup form', () => {
      it('should change state when input values change and call handleChange', () => {
        expect(signupWrapper.state().email).toEqual('testemail@email.com')
        expect(signupWrapper.state().password).toEqual('password123')
        expect(signupWrapper.state().username).toEqual('testemail')
        expect(signupWrapper.state().profileImageUrl).toEqual('http://lorempixel.com/200/200/')
        expect(AuthForm.prototype.handleChange.called).toBe(true)
      })
  
      it('should call handleSubmit when form is submitted and attempt to authenticate', () => {
        const signUpForm = signupWrapper.find('form').first()
        signUpForm.simulate('submit', {
          preventDefault: () => {}
        })
  
        expect(AuthForm.prototype.handleSubmit.calledOnce).toBe(true)
        expect(signupWrapper.instance().props.onAuth.called).toBe(true)
      })
      
      it('should display errors if present', () => {
        signupWrapper.setProps({
          errors: {
            message: 'Invalid email or password'
          }
        })
        expect(signupWrapper.find('div.alert').text()).toEqual(signupWrapper.instance().props.errors.message)
      })

      it('should clear any errors upon successful authentication', () => {
        signupWrapper.setProps({
          errors: {
            message: 'Invalid email or password'
          }
        })
        const signUpForm = signupWrapper.find('form').first()
        signUpForm.simulate('submit', {
          preventDefault: () => {}
        })

        expect(signupWrapper.instance().props.history.push).toHaveBeenCalled()
        expect(signupWrapper.instance().props.history.listen).toHaveBeenCalled()
      })
    })
  })
})
