// ** React Imports
import { Fragment } from 'react'

// ** Third Party Components
import * as yup from 'yup'
import { useForm, Controller } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import { ChevronLeft, ChevronRight } from 'react-feather'

// ** Reactstrap Imports
import { Form, Label, Input, Row, Col, Button, FormFeedback } from 'reactstrap'

// ** Custom Components
import InputPasswordToggle from '@components/input-password-toggle'

const defaultValues = {
  email: '',
  password: '',
  confirmPassword: ''
}

const AccountDetails = ({ stepper }) => {
  const SignupSchema = yup.object().shape({
    email: yup.string().email().required(),
    password: yup.string().required(),
    confirmPassword: yup
      .string()
      .required()
      .oneOf([yup.ref(`password`), null], 'Passwords must match')
  })

  // ** Hooks

  const {
    control,
    handleSubmit,
    formState: { errors }
  } = useForm({
    defaultValues,
    resolver: yupResolver(SignupSchema)
  })

  const onSubmit = data => {
    if (Object.values(data).every(field => field.length > 0)) {
      stepper.next()
    }
  }

  return (
    <Fragment>
      <div className='content-header mb-2'>
        <h2 className='fw-bolder mb-75'>Account Information</h2>
        <span>Enter your username password details</span>
      </div>
      <Form onSubmit={handleSubmit(onSubmit)}>
        <Row>
          
          <Col md='6' className='mb-1'>
            <Label className='form-label' for={`email`}>
              Email
            </Label>
            <Controller
              control={control}
              id='email'
              name='email'
              render={({ field }) => (
                <Input type='email' placeholder='john.doe@email.com' invalid={errors.email && true} {...field} />
              )}
            />
            {errors.email && <FormFeedback>{errors.email.message}</FormFeedback>}
          </Col>
        </Row>
        <Row>
          <div className='form-password-toggle col-md-6 mb-1'>
            <Controller
              id='password'
              name='password'
              control={control}
              render={({ field }) => (
                <InputPasswordToggle
                  label='Password'
                  htmlFor='password'
                  className='input-group-merge'
                  invalid={errors.password && true}
                  {...field}
                />
              )}
            />
            {errors.password && <FormFeedback>{errors.password.message}</FormFeedback>}
          </div>
          </Row>
          <Row>
          <div className='form-password-toggle col-md-6 mb-1'>
            <Controller
              control={control}
              id='confirmPassword'
              name='confirmPassword'
              render={({ field }) => (
                <InputPasswordToggle
                  label='Confirm Password'
                  htmlFor='password'
                  className='input-group-merge'
                  invalid={errors.confirmPassword && true}
                  {...field}
                />
              )}
            />
            {errors.confirmPassword && <FormFeedback>{errors.confirmPassword.message}</FormFeedback>}
          </div>
        </Row>

        <div className='d-flex justify-content-between mt-2'>
          
          <Button type='submit' color='primary' className='btn-next'>
            <span className='align-middle d-sm-inline-block d-none'>Next</span>
            <ChevronRight size={14} className='align-middle ms-sm-25 ms-0'></ChevronRight>
          </Button>
        </div>
      </Form>
    </Fragment>
  )
}

export default AccountDetails
