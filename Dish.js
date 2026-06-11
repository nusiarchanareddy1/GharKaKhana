const mongoose = require('mongoose');

const dishSchema = new mongoose.Schema({
    cook: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    name: { type: String, required: true },
    description: { type: String, required: true },
    whyChooseThis: { type: String }, // Specific text for the card highlight
    price: { type: Number, required: true },
    image: { type: String }, // URL to image
    category: { type: String, enum: ['veg', 'non-veg'], required: true },
    tags: [String], // e.g., 'Biryani', 'Curries', 'Spicy'
    ingredients: [String],
    healthBenefits: [String],
    nutritionalInfo: {
        calories: Number,
        protein: String,
        fats: String,
        carbs: String
    },
    healthTips: { type: String },
    isAvailable: { type: Boolean, default: true },
    preparationTime: { type: Number }, // in minutes
    deliveryTime: { type: String }, // e.g., '30-45 mins'
    rating: { type: Number, default: 4.8 },
    reviewsCount: { type: Number, default: 120 },
    reviews: [{
        user: { type: String }, // Name of reviewer
        rating: { type: Number },
        comment: { type: String },
        date: { type: Date, default: Date.now }
    }],
    createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Dish', dishSchema);
