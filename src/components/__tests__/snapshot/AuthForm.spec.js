import React from 'react'
import toJson from 'enzyme-to-json'
import { shallow } from 'enzyme'
import AuthForm from '../../AuthForm'

const errors = { message: null }

it('should render Login form correctly', () => {
  const wrapper = shallow(
    <AuthForm
      buttonText='Log in'
      heading='Welcome Back'
      errors={errors}
      removeError={jest.fn()}
    />
  )

  expect(toJson(wrapper)).toMatchSnapshot()
})

it('should render SignUp form correctly', () => {
  const wrapper = shallow(
    <AuthForm
      buttonText='Sign me up!'
      heading='Join Warbler Today'
      onAuth={jest.fn()}
      errors={errors}
      removeError={jest.fn()}
      signUp
    />
  )

  expect(toJson(wrapper)).toMatchSnapshot()
})
