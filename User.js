const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    role: { type: String, enum: ['customer', 'cook', 'admin'], default: 'customer' },
    phone: { type: String },
    address: {
        street: String,
        city: String,
        state: String,
        zip: String,
        coordinates: {
            lat: Number,
            lng: Number
        }
    },
    bio: { type: String }, // For cooks
    kitchenName: { type: String }, // For cooks
    isHygieneCertified: { type: Boolean, default: false }, // For cooks
    rating: { type: Number, default: 0 }, // For cooks

    // Smart Trust & Transparency Fields
    verificationStatus: {
        type: String,
        enum: ['unverified', 'pending', 'verified', 'trusted'],
        default: 'verified'
    },
    badges: { type: [String], default: ['Hygiene Star', 'Local Hero'] }, // e.g. 'Hygiene Star', 'Local Hero'
    specialties: [{ type: String }], // e.g. 'Biryani', 'Sweets'
    cookingPhilosophy: { type: String },
    ingredientsPolicy: { type: String }, // e.g. 'Farm fresh', 'No preservatives'

    createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('User', userSchema);
