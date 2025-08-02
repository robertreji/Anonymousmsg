import {z} from 'zod'

 const verifyschema = z.object(
    {
        code : z.string().length(6,"verification code must be 6 characters  ")
    }
)
export default verifyschema;