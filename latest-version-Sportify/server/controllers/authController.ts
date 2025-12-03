import { Request, Response } from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

// In-memory user storage for demo (replace with DB later)
const users: any[] = [];

const generateToken = (id: string) => {
    return jwt.sign({ id }, process.env.JWT_SECRET || 'fallback_secret', {
        expiresIn: '30d',
    });
};

// @desc    Auth user & get token
// @route   POST /api/users/login
// @access  Public
const loginUser = async (req: Request, res: Response) => {
    try {
        const { email, password } = req.body;

        const user = users.find(u => u.email === email);

        if (user && await bcrypt.compare(password, user.password)) {
            res.json({
                _id: user._id,
                name: user.name,
                email: user.email,
                isAdmin: user.isAdmin,
                token: generateToken(user._id),
            });
        } else {
            res.status(401).json({ message: 'Invalid email or password' });
        }
    } catch (error: any) {
        res.status(500).json({ message: error.message });
    }
};

// @desc    Register a new user
// @route   POST /api/users/register
// @access  Public
const registerUser = async (req: Request, res: Response) => {
    try {
        const { name, email, password } = req.body;

        const userExists = users.find(u => u.email === email);

        if (userExists) {
            res.status(400).json({ message: 'User already exists' });
            return;
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = {
            _id: Date.now().toString(),
            name,
            email,
            password: hashedPassword,
            isAdmin: false,
        };

        users.push(newUser);

        res.status(201).json({
            _id: newUser._id,
            name: newUser.name,
            email: newUser.email,
            isAdmin: newUser.isAdmin,
            token: generateToken(newUser._id),
        });
    } catch (error: any) {
        res.status(500).json({ message: error.message });
    }
};

// @desc    Get user profile
// @route   GET /api/users/profile
// @access  Private
const getUserProfile = async (req: any, res: Response) => {
    try {
        const user = users.find(u => u._id === req.user?._id);

        if (user) {
            res.json({
                _id: user._id,
                name: user.name,
                email: user.email,
                isAdmin: user.isAdmin,
            });
        } else {
            res.status(404).json({ message: 'User not found' });
        }
    } catch (error: any) {
        res.status(500).json({ message: error.message });
    }
};

export { loginUser, registerUser, getUserProfile };
