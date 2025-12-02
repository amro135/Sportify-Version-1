import mongoose, { Document, Schema } from 'mongoose';

export interface IBooking extends Document {
    user: mongoose.Types.ObjectId;
    serviceType: string;
    date: Date;
    timeSlot: string;
    status: 'Pending' | 'Confirmed' | 'Cancelled';
}

const bookingSchema: Schema = new Schema({
    user: { type: mongoose.Schema.Types.ObjectId, required: true, ref: 'User' },
    serviceType: { type: String, required: true },
    date: { type: Date, required: true },
    timeSlot: { type: String, required: true },
    status: { type: String, enum: ['Pending', 'Confirmed', 'Cancelled'], default: 'Pending' },
}, {
    timestamps: true,
});

const Booking = mongoose.model<IBooking>('Booking', bookingSchema);
export default Booking;
