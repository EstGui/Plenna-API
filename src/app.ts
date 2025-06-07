import express from 'express';
import router from './routes';


function CreateApp() {
    const app = express();
    
    app.use(express.json());
    app.use("/api", router)

    return app;
}


export default CreateApp;