import { Request, Response } from 'express';
import Booking from '../models/Booking';
import { AuthRequest } from '../middleware/authMiddleware';

// @desc    Create new booking
// @route   POST /api/bookings
// @access  Private
export const createBooking = async (req: AuthRequest, res: Response) => {
    try {
        const {
            serviceType, // This could be the Coach ID or Name
            date,
            timeSlot,
        } = req.body;

        // Check if slot is already booked
        const existingBooking = await Booking.findOne({
            serviceType,
            date,
            timeSlot,
            status: 'Confirmed'
        });

        if (existingBooking) {
            res.status(400).json({ message: 'This time slot is already booked' });
            return;
        }

        const booking = new Booking({
            user: req.user?._id,
            serviceType,
            date,
            timeSlot,
            status: 'Confirmed'
        });

        const createdBooking = await booking.save();
        res.status(201).json(createdBooking);
    } catch (error) {
        res.status(500).json({ message: 'Server Error' });
    }
};

// @desc    Get logged in user bookings
// @route   GET /api/bookings/mybookings
// @access  Private
export const getMyBookings = async (req: AuthRequest, res: Response) => {
    try {
        const bookings = await Booking.find({ user: req.user?._id });
        res.json(bookings);
    } catch (error) {
        res.status(500).json({ message: 'Server Error' });
    }
};

// @desc    Get all bookings
// @route   GET /api/bookings
// @access  Private/Admin
export const getBookings = async (req: Request, res: Response) => {
    try {
        const bookings = await Booking.find({}).populate('user', 'id name email');
        res.json(bookings);
    } catch (error) {
        res.status(500).json({ message: 'Server Error' });
    }
};
