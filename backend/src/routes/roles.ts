import express, { Request, Response, NextFunction } from 'express';
import { v4 as uuidv4 } from 'uuid';
import { CustomError } from '../middleware/errorHandler';
import { authenticateToken, AuthRequest, authorizeRole } from '../middleware/auth';

const router = express.Router();

const roles: any[] = [
  {
    id: '1',
    name: 'super_admin',
    displayName: 'Super Admin',
    description: 'Full system access',
    permissions: ['all'],
    createdAt: new Date(),
  },
  {
    id: '2',
    name: 'admin',
    displayName: 'Admin',
    description: 'Department-level access',
    permissions: ['users.read', 'users.write', 'reports.read'],
    createdAt: new Date(),
  },
  {
    id: '3',
    name: 'user',
    displayName: 'User',
    description: 'Limited access',
    permissions: ['profile.read'],
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
        data: roles,
        total: roles.length,
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
      const role = roles.find(r => r.id === req.params.id);
      if (!role) {
        throw new CustomError(404, 'Role not found');
      }
      res.json({
        success: true,
        data: role,
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
      const { name, displayName, description, permissions } = req.body;

      const newRole = {
        id: uuidv4(),
        name,
        displayName,
        description,
        permissions: permissions || [],
        createdAt: new Date(),
      };

      roles.push(newRole);
      res.status(201).json({
        success: true,
        message: 'Role created successfully',
        data: newRole,
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
      const role = roles.find(r => r.id === req.params.id);
      if (!role) {
        throw new CustomError(404, 'Role not found');
      }

      const { displayName, description, permissions } = req.body;
      Object.assign(role, { displayName, description, permissions });

      res.json({
        success: true,
        message: 'Role updated successfully',
        data: role,
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
      const index = roles.findIndex(r => r.id === req.params.id);
      if (index === -1) {
        throw new CustomError(404, 'Role not found');
      }

      const deletedRole = roles.splice(index, 1);
      res.json({
        success: true,
        message: 'Role deleted successfully',
        data: deletedRole[0],
      });
    } catch (error) {
      next(error);
    }
  }
);

export default router;
