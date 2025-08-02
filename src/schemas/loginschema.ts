import { z} from 'zod'

 const loginschema = z.object(
    {
      username:z.string(),
      password : z.string()
    }
)
export default loginschema;