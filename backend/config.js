const DATABASE_URL = 'mongodb+srv://Project3:Project3Password@cluster0.wfb8lfi.mongodb.net/?retryWrites=true&w=majority';

const PORT = process.env.PORT || 4000;

const JWT_KEY_SECRET = process.env.JWT_KEY_SECRET;

module.exports = { DATABASE_URL, PORT, JWT_KEY_SECRET };
//bc the key and value are the same