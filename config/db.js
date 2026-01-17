const mongoose = require('mongoose')

const dbConnection = async (req, res) => {
    try {
        const connection = mongoose.connect(process.env.MONGODB_CONNECTION_ATLAS,{
            tls:true,
            // useNewUrlParser: true,
            // useUnifiedTopology: true,
        })

        if (connection) {
            console.log('mongodb Connected Successfully👍');

        }
        const db = mongoose.connection
        db.on('connected', () => {
            console.log("connected to mongodb server");

        })
        db.on("disconnected", () => {
            console.log("disconnected to mongodb server");
        });
        db.on("error", (err) => {
            console.log("connected error to mongodb server", err);
        });
    } catch (error) {
        console.log('Connection problem in Database', error);

    }
}

module.exports = dbConnection