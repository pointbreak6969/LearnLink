import connectDb from "./db/db.js";
import "dotenv/config";
const PORT = process.env.PORT || 5000;
import { app } from "./app.js";

connectDb().then(()=>{
    app.listen(PORT, ()=>{
        console.log(`Server is running on PORT: ${PORT}`);
    })
}).catch((error)=>{
    console.log("Error while connecting to MongoDB", error);
});