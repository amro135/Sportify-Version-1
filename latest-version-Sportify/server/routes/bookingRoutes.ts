import express from 'express';
import {
    createBooking,
    getMyBookings,
    getBookings,
} from '../controllers/bookingController';
import { protect, admin } from '../middleware/authMiddleware';

const router = express.Router();

router.route('/').post(protect, createBooking).get(protect, admin, getBookings);
router.route('/mybookings').get(protect, getMyBookings);

export default router;
