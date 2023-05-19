const DATABASE_URL = 'mongodb+srv://project:4KjGdOWhaAQWN520@cluster0.qs3kxed.mongodb.net/exercisesDB?retryWrites=true&w=majority';
const PORT = process.env.PORT || 4000;

const JWT_KEY_SECRET = process.env.JWT_KEY_SECRET;

module.exports = { DATABASE_URL, PORT, JWT_KEY_SECRET };
//bc the key and value are the same