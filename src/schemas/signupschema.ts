import {z} from 'zod'

 const signupschema = z.object(
    {
        username : z.string().min(2,'min length is 2 characters')
        .max(20,"maximum length is 20 characters ").regex(/^[a-zA-Z0-9_]+$/,"no speciaal characters allowed "),
        email : z.email({message:"invalid email address"}),
        password : z.string().min(4,"min 4 charachterss ")
    }
)
export default signupschema;