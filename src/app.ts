import express from 'express';
import router from './routes';
import cors from "cors";


function CreateApp() {
    const app = express();
    
    app.use(cors({
        origin: "*", // seu frontend
        methods: ["GET", "POST", "PUT", "DELETE"],
        credentials: true, // se precisar enviar cookies
    }))
    app.use(express.json());
    app.use("/api", router)

    return app;
}


export default CreateApp;