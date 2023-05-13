const DATABASE_URL = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@sei.8obhe4t.mongodb.net/fiberDB?retryWrites=true&w=majority`;

const PORT = process.env.PORT || 3000;

const JWT_KEY_SECRET = process.env.JWT_KEY_SECRET;

module.exports = { DATABASE_URL, PORT, JWT_KEY_SECRET };
//bc the key and value are the same

