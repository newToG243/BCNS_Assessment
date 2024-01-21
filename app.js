const express = require('express');
const app = express();
const db = require('./DB/connection')
const router = require('./Routes/route')
const notFound = require('./Midleware/notFound')
app.use(express.json());

app.use('/api/v1/tasks', router)
app.use(notFound);

const PORT = 3000;

const start = async () => {
    try {
        await db(process.env.MONGO_URI)
        app.listen(PORT, console.log(`server is listening ${PORT}`));
    } catch (error) {
        console.log(error);
    }
}
start();
