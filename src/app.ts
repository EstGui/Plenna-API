import express from 'express';
import router from './routes';
import cors from "cors";


function CreateApp() {
    const app = express();
    
    app.use(cors({
        origin: "*",
        methods: ["GET", "POST", "PUT", "DELETE"],
        credentials: true,
    }))
    app.use(express.urlencoded({ extended: true }));
    app.use(express.json());
    app.use("/api", router)

    return app;
}


export default CreateApp;