import app from './app';
import connection from "./configs/database"

const PORT = process.env.PORT || 7171;

app.listen(PORT,async () => {
    try {
        await connection;
        console.log("Connected to Database")
    } catch (error) {
        console.log(error)
        console.log("Unable to connect to Database")
    }
    console.log(`Server is running on port ${process.env.port}`);
});
