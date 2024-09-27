const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/user');

// Register a new user
exports.register = async (req, res) => {
    try {
        const { full_name, email, password, phone_number } = req.body;

        if (!password) {
            throw new Error('Password is undefined');
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const user = await User.create({
            full_name,
            email,
            password: hashedPassword,
            role: "user",
            phone_number,
            created_at: new Date(),
            updated_at: new Date()
        });

        res.status(201).json({ status: 201, message: 'User registered successfully', user });
    } catch (error) {
        res.status(500).json({ status: 500, error: error.message });
    }
};

// User login
exports.login = async (req, res) => {
    try {
        const { email, password } = req.body;

        const user = await User.findOne({ where: { email } });

        if (!user) {
            return res.status(404).json({ status: 404, error: 'User not found' });
        }

        const isMatch = await bcrypt.compare(password, user.password);

        if (!isMatch) {
            return res.status(401).json({ status: 401, error: 'Incorrect password' });
        }

        const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, { expiresIn: '1h' });

        res.status(200).json({ status: 200, message: 'Logged in successfully', token });
    } catch (error) {
        res.status(500).json({ status: 500, error: error.message });
    }
};

// Get all users
exports.getAllUsers = async (req, res) => {
    try {
        const users = await User.findAll();
        res.status(200).json(users);
    } catch (error) {
        res.status(500).json({ status: 500, error: error.message });
    }
};

// Get a user by ID
exports.getUserById = async (req, res) => {
    try {
        const { id } = req.params;
        const user = await User.findByPk(id);
        
        if (!user) {
            return res.status(404).json({ status: 404, error: 'User not found' });
        }
        
        res.status(200).json(user);
    } catch (error) {
        res.status(500).json({ status: 500, error: error.message });
    }
};

// Update a user
exports.updateUser = async (req, res) => {
    try {
        const { id } = req.params;
        const { full_name, email, password, phone_number } = req.body;

        const user = await User.findByPk(id);

        if (!user) {
            return res.status(404).json({ status: 404, error: 'User not found' });
        }

        if (password) {
            const hashedPassword = await bcrypt.hash(password, 10);
            user.password = hashedPassword;
        }

        user.full_name = full_name || user.full_name;
        user.email = email || user.email;
        user.phone_number = phone_number || user.phone_number;

        await user.save();

        res.status(200).json({ message: 'User updated successfully', user });
    } catch (error) {
        res.status(500).json({ status: 500, error: error.message });
    }
};

// Delete a user
exports.deleteUser = async (req, res) => {
    try {
        const { id } = req.params;

        const user = await User.findByPk(id);

        if (!user) {
            return res.status(404).json({ status: 404, error: 'User not found' });
        }

        await user.destroy();

        res.status(200).json({ message: 'User deleted successfully' });
    } catch (error) {
        res.status(500).json({ status: 500, error: error.message });
    }
};
