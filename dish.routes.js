const express = require('express');
const router = express.Router();
const Dish = require('../models/Dish');
const multer = require('multer');
const path = require('path');
const mongoose = require('mongoose');

// Configure Multer Storage
const storage = multer.diskStorage({
    destination: './uploads/',
    filename: function (req, file, cb) {
        cb(null, 'dish-' + Date.now() + path.extname(file.originalname));
    }
});

const upload = multer({
    storage: storage,
    limits: { fileSize: 5000000 }, // 5MB limit
    fileFilter: function (req, file, cb) {
        checkFileType(file, cb);
    }
});

// Check File Type
function checkFileType(file, cb) {
    const filetypes = /jpeg|jpg|png|webp|gif/;
    const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
    const mimetype = filetypes.test(file.mimetype);

    if (mimetype && extname) {
        return cb(null, true);
    } else {
        cb('Error: Images Only!');
    }
}

// Get all dishes
router.get('/', async (req, res) => {
    try {
        let query = {};

        // Filter by cook if cook parameter is provided
        if (req.query.cook) {
            const mongoose = require('mongoose');
            // Try to convert to ObjectId if it looks like a MongoDB ID
            if (mongoose.Types.ObjectId.isValid(req.query.cook)) {
                query.cook = new mongoose.Types.ObjectId(req.query.cook);
            } else {
                query.cook = req.query.cook;
            }
        }

        console.log('Dishes query:', query); // Debug log
        const dishes = await Dish.find(query).populate('cook', 'name rating bio verificationStatus badges address');
        if (dishes.length > 0) {
            console.log('Sample dish city:', dishes[0].cook?.address?.city || 'MISSING');
        }
        res.json(dishes);
    } catch (err) {
        console.error('Error fetching dishes:', err);
        res.status(500).send('Server Error');
    }
});

// Get single dish by ID
router.get('/:id', async (req, res) => {
    try {
        const dish = await Dish.findById(req.params.id).populate('cook', 'name rating bio kitchenName verificationStatus badges address');
        if (!dish) return res.status(404).json({ msg: 'Dish not found' });
        res.json(dish);
    } catch (err) {
        if (err.kind === 'ObjectId') return res.status(404).json({ msg: 'Dish not found' });
        res.status(500).send('Server Error');
    }
});

// Create a dish with Image Upload
router.post('/', upload.single('image'), async (req, res) => {
    try {
        // Validation
        if (!req.body.cook || !req.body.name || !req.body.description || req.body.price === undefined) {
            return res.status(400).json({ error: 'Missing required fields: cook, name, description, price' });
        }

        let imagePath = req.body.image;
        if (req.file) {
            imagePath = `http://localhost:5000/uploads/${req.file.filename}`;
        }

        // Fix: Parse comma-separated strings back to arrays if they come from FormData
        let ingredients = req.body.ingredients;
        if (typeof ingredients === 'string') {
            ingredients = ingredients.split(',').map(item => item.trim()).filter(Boolean);
        }

        let healthBenefits = req.body.healthBenefits;
        if (typeof healthBenefits === 'string') {
            healthBenefits = healthBenefits.split(',').map(item => item.trim()).filter(Boolean);
        }

        // Convert string numbers to actual numbers
        const price = Number(req.body.price);

        if (isNaN(price) || price <= 0) {
            return res.status(400).json({ error: 'Price must be a valid number greater than 0' });
        }

        // Handle preparationTime - only include if provided
        const dishData = {
            cook: req.body.cook,
            name: req.body.name,
            description: req.body.description,
            price,
            category: req.body.category,
            ingredients,
            healthBenefits,
            healthTips: req.body.healthTips,
            image: imagePath,
            rating: 4.8,
            reviewsCount: 120
        };

        // Only add preparationTime if it was provided
        if (req.body.preparationTime) {
            const prepTime = Number(req.body.preparationTime);
            if (!isNaN(prepTime)) {
                dishData.preparationTime = prepTime;
            }
        }

        const newDish = new Dish(dishData);
        const dish = await newDish.save();
        res.json(dish);
    } catch (err) {
        console.error("Dish Create Error:", err);
        res.status(500).json({ error: 'Server Error: ' + err.message });
    }
});

// DELETE routes - More specific ones first!

// Delete all dishes for a cook (must come BEFORE /:id route)
router.delete('/cook/:cookId/all', async (req, res) => {
    try {
        const cookId = req.params.cookId;

        console.log('DELETE ALL - Cook ID:', cookId);

        if (!mongoose.Types.ObjectId.isValid(cookId)) {
            return res.status(400).json({ error: 'Invalid cook ID format' });
        }

        const result = await Dish.deleteMany({ cook: new mongoose.Types.ObjectId(cookId) });
        console.log('Deleted count:', result.deletedCount);

        res.json({
            message: 'All dishes deleted successfully',
            deletedCount: result.deletedCount
        });
    } catch (err) {
        console.error("Delete All Error:", err.message);
        res.status(500).json({ error: 'Server error: ' + err.message });
    }
});

// Delete a single dish by ID (more generic route)
router.delete('/:id', async (req, res) => {
    try {
        const dishId = req.params.id;

        console.log('DELETE SINGLE - Dish ID:', dishId);

        // Validate ObjectId format
        if (!mongoose.Types.ObjectId.isValid(dishId)) {
            console.log('Invalid ObjectId format');
            return res.status(400).json({ error: 'Invalid dish ID format' });
        }

        // Delete the dish
        const deletedDish = await Dish.findByIdAndDelete(new mongoose.Types.ObjectId(dishId));

        if (!deletedDish) {
            console.log('Dish not found');
            return res.status(404).json({ error: 'Dish not found' });
        }

        console.log('Deleted dish:', deletedDish.name);
        res.json({ message: 'Dish deleted successfully', dish: deletedDish });
    } catch (err) {
        console.error("Delete Error:", err.message);
        res.status(500).json({ error: 'Server error: ' + err.message });
    }
});

module.exports = router;
