const express = require('express');
const router = express.Router();
const Subscription = require('../models/Subscription');
const Order = require('../models/Order');

// Create Subscription & First Order
router.post('/', async (req, res) => {
    try {
        const { customer, items, totalAmount, deliveryAddress, startDate, days } = req.body;

        // 1. Create Subscription Record
        const newSub = new Subscription({
            customer,
            items,
            totalAmount,
            deliveryAddress,
            startDate: new Date(startDate),
            days,
            status: 'active'
        });

        // 2. Create the FIRST Order immediately (for Day 1)
        const firstOrder = new Order({
            customer,
            items: items.map(i => ({ dish: i.dish, quantity: i.quantity, price: i.price })),
            totalAmount: totalAmount / days, // Assuming daily cost is total/days roughly, or logic needs refinement. 
            // Better: Recalculate daily total. The totalAmount passed might be for one day or all days? 
            // Let's assume the frontend sends the DAILY total or we calculate it.
            // For simplicity, let's assume totalAmount sent is per-day cost for now, or total for whole sub?
            // Usually subs are "Prepaid" or "Pay per meal". Let's assume Pay per meal (COD) for now, so totalAmount per order.
            // Wait, req.body.totalAmount is usually the Cart Total.
            totalAmount: items.reduce((sum, item) => sum + (item.price * item.quantity), 0) + 40, // Daily total + delivery
            deliveryAddress,
            status: 'placed',
            paymentMethod: 'cod',
            deliveryType: 'standard'
        });

        await firstOrder.save();

        // Link Order to Subscription
        newSub.orders.push(firstOrder._id);
        await newSub.save();

        res.json({ subscription: newSub, firstOrder });
    } catch (err) {
        console.error(err);
        res.status(500).send('Server Error');
    }
});

// Get User Subscriptions with Orders populated
router.get('/:userId', async (req, res) => {
    try {
        const subs = await Subscription.find({ customer: req.params.userId })
            .populate({
                path: 'orders',
                options: { sort: { createdAt: -1 } }, // Latest order first
                populate: { path: 'items.dish' }
            })
            .populate('items.dish')
            .sort({ createdAt: -1 });
        res.json(subs);
    } catch (err) {
        console.error(err);
        res.status(500).send('Server Error');
    }
});

module.exports = router;
