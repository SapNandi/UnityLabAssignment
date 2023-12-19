const mongoose = require("mongoose");

const catalougeSchema = new mongoose.Schema({
  seller_id: {
    type: String,
    required: true,
  },
  products: [
    {
      name: {
        type: String,
        required: true,
      },
      price: {
        type: String,
        required: true,
      },
    },
  ],
});

module.exports = mongoose.model("catalouge", catalougeSchema);
