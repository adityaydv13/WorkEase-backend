const mongoose = require('mongoose');
require('dotenv').config(); // only if using .env for MongoDB URI

(async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    const db = mongoose.connection.db;

    const result = await db.collection('users')
      .find({ email: "adityaydv6335@gmail.com" })
      .explain("executionStats");

    console.log(JSON.stringify(result, null, 2));
    await mongoose.disconnect();
  } catch (err) {
    console.error('Error:', err);
  }
})();
