import { Request, Response } from 'express';
import User from '../models/User';

export const createOrLoginUser = async (
  req: Request,
  res: Response
): Promise<void> => {
  const { phoneNumber, role = 'user' } = req.body;

  try {
    // Validate required fields
    if (!phoneNumber) {
      res.status(400).json({
        success: false,
        message: 'Phone number is required',
      });
      return;
    }

    // Validate phoneNumber format (basic example, adjust regex as needed)
    const phoneRegex = /^\+?[1-9]\d{1,14}$/;
    if (!phoneRegex.test(phoneNumber)) {
      res.status(400).json({
        success: false,
        message: 'Invalid phone number format',
      });
      return;
    }

    // Check if user exists
    let user = await User.findOne({ phoneNumber });

    if (user) {
      // User exists - login successful
      res.status(200).json({
        success: true,
        message: 'Login successful',
        data: {
          user: {
            id: user._id,
            phoneNumber: user.phoneNumber,
            role: user.role,
            name: user.name, // Include name in response
          },
        },
      });
    } else {
      // User doesn't exist - create new user
      user = new User({
        phoneNumber,
        role,
      });

      await user.save();

      res.status(201).json({
        success: true,
        message: 'User created successfully',
        data: {
          user: {
            id: user._id,
            phoneNumber: user.phoneNumber,
            role: user.role,
          },
        },
      });
    }
  } catch (error: any) {
    console.error('User operation error:', {
      message: error.message,
      stack: error.stack,
      code: error.code,
    });

    // Handle MongoDB duplicate key error
    if (error.name === 'MongoError' && error.code === 11000) {
      res.status(400).json({
        success: false,
        message: 'Phone number already exists',
      });
      return;
    }

    // Handle Mongoose validation errors
    if (error.name === 'ValidationError') {
      res.status(400).json({
        success: false,
        message: 'Validation error',
        errors: error.errors,
      });
      return;
    }

    // Generic server error
    res.status(500).json({
      success: false,
      message: 'Server error',
    });
  }
};

// Get All Users
export const getUsers = async (req: Request, res: Response): Promise<void> => {
  try {
    const users = await User.find().select('-password');
    res.json(users);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
};

// Get User by ID
export const getUserById = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const user = await User.findById(req.params.id).select('-password');
    if (!user) {
      res.status(404).json({ message: 'User not found' });
      return;
    }
    res.json(user);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
};

// Delete User
export const deleteUser = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) {
      res.status(404).json({ message: 'User not found' });
      return;
    }
    await user.deleteOne();
    res.json({ message: 'User deleted' });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
};

export const getUserByPhoneNumber = async (
  req: any,
  res: Response
): Promise<void> => {
  const { phoneNumber } = req.query;

  try {
    const user = await User.findOne({
      phoneNumber: phoneNumber?.toString().trim(),
    });

    if (!user) {
      res.status(404).json({ message: 'No users found for this phone number' });
      return;
    }

    res.json(user);
  } catch (error) {
    console.error('Error occurred:', error);
    res
      .status(500)
      .json({ message: 'Server error', error: (error as Error).message });
  }
};
