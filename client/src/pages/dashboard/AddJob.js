import React from 'react'
import { FormRow,Alert,FormRowSelect } from '../../components'
import { useAppContext } from '../../context/appContext'
import Wrapper from '../../assets/wrappers/DashboardFormPage'

export default function AddJob() {
  const {
    isEditing,
    showAlert,
    displayAlert,
    position,
    company,
    jobLocation,
    jobType,
    jobTypeOptions,
    status,
    statusOptions,
    handleChange,
  } = useAppContext()

  const handleSubmit=(e)=>{
    e.preventDefault()
    if(!position || !company || !jobLocation){
      displayAlert();
      return
    }
    console.log('created job')
  }

  const handleJobInput=(e)=>{
    const name = e.target.name;
    const value = e.target.value;
    handleChange({name,value});
  }

  return (
    <Wrapper>
       <form className='form'>
        <h3>{isEditing? 'edit job' : 'add job'}</h3>
        {showAlert && <Alert/>}
        <div className="form-center">
          <FormRow type="text" name="position" value = {position} handleChange={handleJobInput} />
          <FormRow type="text" name="company" value = {company} handleChange={handleJobInput}/>
          <FormRow type="text" labelText='job location' name="jobLocation" value = {jobLocation} handleChange={handleJobInput}/>
        </div>

        <FormRowSelect name="status" value={status} handleChange={handleJobInput} list={statusOptions} />
        <FormRowSelect name="jobType" labelText="Type" value={jobType} handleChange={handleJobInput} list={jobTypeOptions} />

        <div className="btn-container">
          <button type='submit' className='btn btn-block submit-btn' onClick={handleSubmit}>
              submit
          </button>
        </div>
       </form>
    </Wrapper>
  )
}