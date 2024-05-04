const db = require('../models');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = db.user;

const newUser = async (req, res) => {
    try {
        const hashedPassword = await bcrypt.hash(req.body.userPassword, 10);
        const info = {
            userEmail: req.body.userEmail,
            userPassword: hashedPassword,
            userImage: req.body.userImage
        };
        const user = await User.create(info);
        res.status(201).send(user); // Changed status code to 201 for resource creation
        console.log(user);
    } catch (error) {
        res.status(500).send({ message: 'Error creating user', error: error.message });
    }
};

const loginUser = async (req, res) => {
    try {
        const user = await User.findOne({ where: { userEmail: req.body.userEmail } });
        if (user && await bcrypt.compare(req.body.userPassword, user.userPassword)) {
            const token = jwt.sign({ id: user.userId }, 'your_secret_key', { expiresIn: '24h' });
            let refreshToken = '';
            if (req.body.rememberMe) {
                refreshToken = jwt.sign({ id: user.userId }, 'your_refresh_token_secret', { expiresIn: '7d' });
                user.refreshToken = refreshToken;
                await user.save();
            }
            res.json({ message: 'Login successful', token: token, refreshToken: refreshToken });
        } else {
            res.status(401).json({ message: 'Invalid email or password' });
        }
    } catch (error) {
        console.error('Login error:', error);
        res.status(500).json({ message: 'Error logging in', error: error.message });
    }
};

const refreshToken = async (req, res) => {
    try {
        const { token } = req.body;

        if (!token) {
            return res.status(401).json({ message: 'No token provided' });
        }

        const decoded = jwt.verify(token, 'your_refresh_token_secret');
        const user = await User.findOne({ where: { userId: decoded.id } });

        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        const newToken = jwt.sign({ id: user.userId }, 'your_secret_key', { expiresIn: '24h' });

        res.status(200).json({ message: 'Token refreshed', token: newToken });
    } catch (error) {
        return res.status(403).json({ message: 'Invalid token', error: error.message });
    }
};

const getAllUsers = async (req, res) => {
    try {
        const users = await User.findAll({});
        res.status(200).send(users);
    } catch (error) {
        res.status(500).send({ message: 'Error fetching users', error: error.message });
    }
};

const getOneUser = async (req, res) => {
    try {
        const id = req.params.id;
        const user = await User.findOne({ where: { userId: id } });
        res.status(200).send(user);
    } catch (error) {
        res.status(500).send({ message: 'Error fetching user', error: error.message });
    }
};

const deleteUser = async (req, res) => {
    try {
        const id = req.params.id;
        await User.destroy({ where: { userId: id } });
        res.status(200).send('User is deleted');
    } catch (error) {
        res.status(500).send({ message: 'Error deleting user', error: error.message });
    }
};

const updateUser = async (req, res) => {
    try {
        const id = req.params.id;
        const user = await User.update(req.body, { where: { userId: id } });
        res.status(200).send(user);
    } catch (error) {
        res.status(500).send({ message: 'Error updating user', error: error.message });
    }
};

module.exports = {
    newUser,
    loginUser,
    refreshToken,
    getAllUsers,
    getOneUser,
    deleteUser,
    updateUser
};
