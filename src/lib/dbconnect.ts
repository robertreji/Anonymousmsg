import mongoose from "mongoose";

export  async function connectdb():Promise<void>{
    try {
        if (mongoose.connection.readyState === 1)
            {
             console.log("Already connected to MongoDB.");
             return; 
            }
        const connection = await mongoose.connect(process.env.DB_URL!)
        console.log("db host id :", connection.connection.host)
    } catch (error :unknown) {
        if(error instanceof Error) throw new Error("an error occured during conection with DB") 
            else throw new Error("something unexpeexted occured during conecion with DBt")
    }
}