const mongoose = require("mongoose");

const AuctionSchema = mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, "Auction-Nest"],
      default: "Amazing",
    },
    description: {
      type: String,
      required: [true, "Find the Best Deals"],
      default: "This is an amazing auction. Bid now!",
    },
    link: {
      type: String,
      required: false,
      default: "https://example.com/default-link",
    },
    img: {
      type: String,
      required: false,
      default: "https://example.com/default-image.jpg",
    },
  },
  {
    timestamps: true,
  }
);

const AuctionModel = mongoose.model("Auction", AuctionSchema);
module.exports = AuctionModel;
