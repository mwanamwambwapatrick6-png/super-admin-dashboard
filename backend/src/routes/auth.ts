import express, { Request, Response, NextFunction } from 'express';
import bcryptjs from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { v4 as uuidv4 } from 'uuid';
import { CustomError } from '../middleware/errorHandler';
import { authenticateToken, AuthRequest } from '../middleware/auth';

const router = express.Router();

// Mock user database
const users: any[] = [
  {
    id: '1',
    email: 'admin@example.com',
    password: '$2a$10$5Q0V7YOTOl7qVDvL7.6Kue8Y0i.M.g/SY6KzW3YZ1Z.B5Z5YZpz2S', // Admin@123456
    name: 'Admin User',
    role: 'super_admin',
    createdAt: new Date(),
  },
];

router.post('/register', async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { email, password, name } = req.body;

    if (users.some(u => u.email === email)) {
      throw new CustomError(400, 'Email already registered');
    }

    const hashedPassword = await bcryptjs.hash(password, 10);

    const newUser = {
      id: uuidv4(),
      email,
      password: hashedPassword,
      name,
      role: 'user',
      createdAt: new Date(),
    };

    users.push(newUser);

    res.status(201).json({
      success: true,
      message: 'User registered successfully',
      user: {
        id: newUser.id,
        email: newUser.email,
        name: newUser.name,
        role: newUser.role,
      },
    });
  } catch (error) {
    next(error);
  }
});

router.post('/login', async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { email, password } = req.body;

    const user = users.find(u => u.email === email);
    if (!user) {
      throw new CustomError(401, 'Invalid email or password');
    }

    const isValidPassword = await bcryptjs.compare(password, user.password);
    if (!isValidPassword) {
      throw new CustomError(401, 'Invalid email or password');
    }

    const accessToken = jwt.sign(
      { id: user.id, email: user.email, role: user.role },
      process.env.JWT_SECRET || 'secret',
      { expiresIn: process.env.JWT_EXPIRE || '7d' }
    );

    const refreshToken = jwt.sign(
      { id: user.id },
      process.env.REFRESH_TOKEN_SECRET || 'refresh-secret',
      { expiresIn: process.env.REFRESH_TOKEN_EXPIRE || '30d' }
    );

    res.json({
      success: true,
      message: 'Login successful',
      accessToken,
      refreshToken,
      user: {
        id: user.id,
        email: user.email,
        name: user.name,
        role: user.role,
      },
    });
  } catch (error) {
    next(error);
  }
});

router.get('/me', authenticateToken, (req: AuthRequest, res: Response) => {
  const user = users.find(u => u.id === req.user?.id);
  if (!user) {
    throw new CustomError(404, 'User not found');
  }

  res.json({
    success: true,
    user: {
      id: user.id,
      email: user.email,
      name: user.name,
      role: user.role,
    },
  });
});

export default router;
