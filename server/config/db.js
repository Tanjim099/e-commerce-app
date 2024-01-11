const { default: mongoose } = require("mongoose");

const dbConnection = async () => {
    try {
        const connectionInstance = mongoose.connect(process.env.DB_URL);
        console.log(`db connection successfully`)
    } catch (error) {
        console.log("db connection error", error)
    }
}

module.exports = { dbConnection }