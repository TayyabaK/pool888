// ** React Imports
import { Fragment, useState } from 'react'

// ** Third Party Components
import { useForm, Controller } from 'react-hook-form'
import { ChevronLeft, ChevronRight } from 'react-feather'

// ** Reactstrap Imports
import { Form, Label, Input, Row, Col, Button, FormFeedback } from 'reactstrap'
import Select from "react-select"//'../../../../forms/form-elements/select'

import CountryCodes from "../../../../../static_data/CountryCodes" 
//import { data } from '../../../../tables/data-tables/data'

const defaultValues = {
  firstName: ''
}

const PersonalInfo = ({ stepper }) => {

  const [[country, countrycode], setCountryInfo] = useState(["", ""])
  const [isValidCountry, setIsValidCountry] = useState(false)

  // ** Hooks
  const {
    control,
    setError,
    handleSubmit,
    formState: { errors }
  } = useForm({
    defaultValues
  })

  const onCountryChange = (data) => {
    setCountryInfo([data.label, data.value])
    setIsValidCountry(true)
  }  

  const onSubmit = data => {
      for (const key in data) {      
        if (data[key].length === 0) {                
          setError(key, {
            type: 'manual',
            message: `Please enter a valid ${key}`
          })
        }
      }
    }

  return (
    <Fragment>
      <div className='content-header mb-2'>
        <h2 className='fw-bolder mb-75'>Personal Information</h2>
        <span>Enter Your Information.</span>
      </div>
      <Form onSubmit={handleSubmit(onSubmit)}>
        <Row>
          <Col md='6' className='mb-1'>
            <Label className='form-label' for='firstName'>
              First Name
            </Label>
            <Controller
              id='firstName'
              name='firstName'
              control={control}
              render={({ field }) => <Input placeholder='John' invalid={errors.firstName && true} {...field} />}
            />
            {errors.firstName && <FormFeedback>{errors.firstName.message}</FormFeedback>}
          </Col>
          <Col md='6' className='mb-1'>
            <Label className='form-label' for='lastName'>
              Last Name
            </Label>
            <Input id='lastName' name='lastName' />
          </Col>
          </Row>
          <Row>
          <Col md='5' className='mb-1'>
            <Label className='form-label' for='country'>
              Country
            </Label>
            <Select id="country" name="country" options={CountryCodes} onChange={onCountryChange} value={country.value} required></Select>
            {!isValidCountry && <Label style={{color: "#E94560"}}> Please choose a country </Label>}
          </Col>
          <Col md='2' className='mb-1'>            
            <Label>
              Code
            </Label>
            <Input type='number' id='countrycode' name='countrycode' value={countrycode} disabled={true}/>
          </Col>
          <Col md='5' className='mb-1'>            
            <Label>
              Mobile Number 
            </Label>
            <Input type='number' id='mobNumber' name='mobNumber' />
          </Col>
          </Row>
          <Row>
          <Col sm='12' className='mb-1'>
            <Label className='form-label' for='address'>
              Address
            </Label>
             <Input type='text' id='address' name='address'/>
          </Col>
          </Row>
          
        <div className='d-flex justify-content-between mt-2'>
          <Button color='secondary' className='btn-prev' outline onClick={() => stepper.previous()}>
            <ChevronLeft size={14} className='align-middle me-sm-25 me-0'></ChevronLeft>
            <span className='align-middle d-sm-inline-block d-none'>Previous</span>
          </Button>
          <Button type='submit' color='primary' className='btn-next'>
            <span className='align-middle d-sm-inline-block d-none' disabled={!isValidCountry}>Submit</span>
            <ChevronRight size={14} className='align-middle ms-sm-25 ms-0'></ChevronRight>
          </Button>
        </div>
      </Form>
    </Fragment>
  )
}

export default PersonalInfo
