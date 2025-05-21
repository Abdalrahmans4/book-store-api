import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import pgclient from './db.js';
import books from './routes/books.js';


 const PORT = process.env.PORT || 5001;


const app  = express();
app.use(express.json());
dotenv.config();
app.use(cors());


 
 app.use("/api/books", books);
 pgclient.connect()
    .then(() => {
        app.listen(PORT, () => {
            console.log(`Listening on PORT ${PORT}`);

        });
    })




