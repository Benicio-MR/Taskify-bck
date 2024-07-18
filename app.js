import express from 'express';
import cors from 'cors'
import noteRoutes from './routes/noteRoutes.js'

const app = express();
const PORT = 3000;

app.use(express.json());

app.use(cors());

app.use('/notes', noteRoutes)

app.listen(PORT, () => {
   console.log(`Express server running on port ${PORT}`);
});