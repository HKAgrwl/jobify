import React,{useEffect} from 'react'
import Job from './Job'
import Wrapper from '../assets/wrappers/JobsContainer'
import Loading from './Loading'
import { useAppContext } from '../context/appContext'

export default function JobsContainer() {
  const {getJobs,jobs,isLoading,page,totalJobs} = useAppContext()

  useEffect(() => {
    getJobs();
  }, []);

  if(isLoading){
    return <Loading center />
  }

  if(jobs.length === 0){
    return(      
      <Wrapper>
        <h2>No Jobs to Display...</h2>
      </Wrapper>
    )
  }
  return (
    <Wrapper>
      <h5>{totalJobs} job{jobs.length > 1 && 's'}</h5>
      <div className="jobs">
        {jobs.map((job)=>{
          return <Job key={job._id} {...job} /> 
        })}
      </div>
    </Wrapper>
  )
}
