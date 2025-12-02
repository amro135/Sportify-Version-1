import mongoose, { Document, Schema, CallbackError } from 'mongoose';
import bcrypt from 'bcryptjs';

export interface IUser extends Document {
    name: string;
    email: string;
    password: string;
    role: 'customer' | 'admin' | 'coach';
    wishlist: mongoose.Types.ObjectId[];
    matchPassword: (enteredPassword: string) => Promise<boolean>;
}

const userSchema: Schema = new Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    role: { type: String, enum: ['customer', 'admin', 'coach'], default: 'customer' },
    wishlist: [{ type: Schema.Types.ObjectId, ref: 'Product' }],
}, {
    timestamps: true,
});

userSchema.methods.matchPassword = async function (enteredPassword: string) {
    return await bcrypt.compare(enteredPassword, this.password);
};

userSchema.pre('save', async function (next: any) {
    if (!this.isModified('password')) {
        return next();
    }

    try {
        const salt = await bcrypt.genSalt(10);
        this.password = await bcrypt.hash(this.password as string, salt);
        next();
    } catch (error) {
        return next(error as CallbackError);
    }
});

const User = mongoose.model<IUser>('User', userSchema);
export default User;
