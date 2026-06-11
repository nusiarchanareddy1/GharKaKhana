const express = require('express');
const router = express.Router();
const Order = require('../models/Order');
const Dish = require('../models/Dish');

// Create Order
router.post('/', async (req, res) => {
    try {
        console.log("Receiving Order Data:", req.body); // Debug log

        // Validate required fields explicitly
        if (!req.body.customer) {
            return res.status(400).json({ error: "Customer ID is missing. Please login again." });
        }
        if (!req.body.items || req.body.items.length === 0) {
            return res.status(400).json({ error: "Order must contain at least one item." });
        }

        const newOrder = new Order(req.body);
        const order = await newOrder.save();

        console.log("Order Saved:", order._id);
        res.json(order);
    } catch (err) {
        console.error('Order Error:', err);
        res.status(500).json({ msg: 'Server Error', error: err.message });
    }
});

// Get User Orders
router.get('/:userId', async (req, res) => {
    try {
        const orders = await Order.find({ customer: req.params.userId }).populate('items.dish');
        res.json(orders);
    } catch (err) {
        res.status(500).send('Server Error');
    }
});

// Get Cook's Pending/Active Orders
router.get('/cook/:cookId', async (req, res) => {
    try {
        // Find dishes by this cook
        const dishes = await Dish.find({ cook: req.params.cookId });
        const dishIds = dishes.map(d => d._id);

        // Find orders containing these dishes
        const orders = await Order.find({ 'items.dish': { $in: dishIds } })
            .populate('items.dish')
            .populate('customer', 'name email')
            .sort({ createdAt: -1 });
        res.json(orders);
    } catch (err) {
        console.error(err);
        res.status(500).send('Server Error');
    }
});

// Update Order Status
router.put('/:id/status', async (req, res) => {
    try {
        const { status } = req.body;
        const order = await Order.findByIdAndUpdate(
            req.params.id,
            { status },
            { new: true }
        );
        res.json(order);
    } catch (err) {
        console.error(err);
        res.status(500).send('Server Error');
    }
});

module.exports = router;
