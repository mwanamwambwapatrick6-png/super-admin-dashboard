import express, { Request, Response, NextFunction } from 'express';
import { v4 as uuidv4 } from 'uuid';
import { CustomError } from '../middleware/errorHandler';
import { authenticateToken, AuthRequest, authorizeRole } from '../middleware/auth';

const router = express.Router();

const permissions: any[] = [
  {
    id: '1',
    name: 'users.read',
    displayName: 'View Users',
    description: 'Can view user list and details',
    createdAt: new Date(),
  },
  {
    id: '2',
    name: 'users.write',
    displayName: 'Manage Users',
    description: 'Can create, edit and delete users',
    createdAt: new Date(),
  },
  {
    id: '3',
    name: 'reports.read',
    displayName: 'View Reports',
    description: 'Can view system reports',
    createdAt: new Date(),
  },
];

router.get(
  '/',
  authenticateToken,
  (req: AuthRequest, res: Response, next: NextFunction) => {
    try {
      res.json({
        success: true,
        data: permissions,
        total: permissions.length,
      });
    } catch (error) {
      next(error);
    }
  }
);

router.get(
  '/:id',
  authenticateToken,
  (req: AuthRequest, res: Response, next: NextFunction) => {
    try {
      const perm = permissions.find(p => p.id === req.params.id);
      if (!perm) {
        throw new CustomError(404, 'Permission not found');
      }
      res.json({
        success: true,
        data: perm,
      });
    } catch (error) {
      next(error);
    }
  }
);

router.post(
  '/',
  authenticateToken,
  authorizeRole(['super_admin']),
  (req: AuthRequest, res: Response, next: NextFunction) => {
    try {
      const { name, displayName, description } = req.body;

      const newPerm = {
        id: uuidv4(),
        name,
        displayName,
        description,
        createdAt: new Date(),
      };

      permissions.push(newPerm);
      res.status(201).json({
        success: true,
        message: 'Permission created successfully',
        data: newPerm,
      });
    } catch (error) {
      next(error);
    }
  }
);

router.put(
  '/:id',
  authenticateToken,
  authorizeRole(['super_admin']),
  (req: AuthRequest, res: Response, next: NextFunction) => {
    try {
      const perm = permissions.find(p => p.id === req.params.id);
      if (!perm) {
        throw new CustomError(404, 'Permission not found');
      }

      const { displayName, description } = req.body;
      Object.assign(perm, { displayName, description });

      res.json({
        success: true,
        message: 'Permission updated successfully',
        data: perm,
      });
    } catch (error) {
      next(error);
    }
  }
);

router.delete(
  '/:id',
  authenticateToken,
  authorizeRole(['super_admin']),
  (req: AuthRequest, res: Response, next: NextFunction) => {
    try {
      const index = permissions.findIndex(p => p.id === req.params.id);
      if (index === -1) {
        throw new CustomError(404, 'Permission not found');
      }

      const deletedPerm = permissions.splice(index, 1);
      res.json({
        success: true,
        message: 'Permission deleted successfully',
        data: deletedPerm[0],
      });
    } catch (error) {
      next(error);
    }
  }
);

export default router;
