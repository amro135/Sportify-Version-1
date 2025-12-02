"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getBookings = exports.getMyBookings = exports.createBooking = void 0;
const Booking_1 = __importDefault(require("../models/Booking"));
// @desc    Create new booking
// @route   POST /api/bookings
// @access  Private
const createBooking = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    try {
        const { serviceType, // This could be the Coach ID or Name
        date, timeSlot, } = req.body;
        // Check if slot is already booked
        const existingBooking = yield Booking_1.default.findOne({
            serviceType,
            date,
            timeSlot,
            status: 'Confirmed'
        });
        if (existingBooking) {
            res.status(400).json({ message: 'This time slot is already booked' });
            return;
        }
        const booking = new Booking_1.default({
            user: (_a = req.user) === null || _a === void 0 ? void 0 : _a._id,
            serviceType,
            date,
            timeSlot,
            status: 'Confirmed'
        });
        const createdBooking = yield booking.save();
        res.status(201).json(createdBooking);
    }
    catch (error) {
        res.status(500).json({ message: 'Server Error' });
    }
});
exports.createBooking = createBooking;
// @desc    Get logged in user bookings
// @route   GET /api/bookings/mybookings
// @access  Private
const getMyBookings = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    try {
        const bookings = yield Booking_1.default.find({ user: (_a = req.user) === null || _a === void 0 ? void 0 : _a._id });
        res.json(bookings);
    }
    catch (error) {
        res.status(500).json({ message: 'Server Error' });
    }
});
exports.getMyBookings = getMyBookings;
// @desc    Get all bookings
// @route   GET /api/bookings
// @access  Private/Admin
const getBookings = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const bookings = yield Booking_1.default.find({}).populate('user', 'id name email');
        res.json(bookings);
    }
    catch (error) {
        res.status(500).json({ message: 'Server Error' });
    }
});
exports.getBookings = getBookings;
