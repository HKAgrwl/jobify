import {UnAuthenticatedError} from '../errors/index.js'

const checkPermissions = (requestUser,resourceUserId)=>{
    if(requestUser.userId === resourceUserId.toString()) return
    throw new UnAuthenticatedError('Not auhtorized to access this route')
    return
}

export default checkPermissions