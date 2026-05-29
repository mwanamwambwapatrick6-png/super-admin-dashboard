import express, { Request, Response, NextFunction } from 'express';
import { v4 as uuidv4 } from 'uuid';
import { CustomError } from '../middleware/errorHandler';
import { authenticateToken, AuthRequest, authorizeRole } from '../middleware/auth';

const router = express.Router();

const departments: any[] = [
  {
    id: '1',
    name: 'IT',
    description: 'Information Technology',
    manager: 'admin@example.com',
    status: 'active',
    createdAt: new Date(),
  },
  {
    id: '2',
    name: 'Sales',
    description: 'Sales Department',
    manager: 'manager@example.com',
    status: 'active',
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
        data: departments,
        total: departments.length,
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
      const dept = departments.find(d => d.id === req.params.id);
      if (!dept) {
        throw new CustomError(404, 'Department not found');
      }
      res.json({
        success: true,
        data: dept,
      });
    } catch (error) {
      next(error);
    }
  }
);

router.post(
  '/',
  authenticateToken,
  authorizeRole(['super_admin', 'admin']),
  (req: AuthRequest, res: Response, next: NextFunction) => {
    try {
      const { name, description, manager } = req.body;

      const newDept = {
        id: uuidv4(),
        name,
        description,
        manager,
        status: 'active',
        createdAt: new Date(),
      };

      departments.push(newDept);
      res.status(201).json({
        success: true,
        message: 'Department created successfully',
        data: newDept,
      });
    } catch (error) {
      next(error);
    }
  }
);

router.put(
  '/:id',
  authenticateToken,
  authorizeRole(['super_admin', 'admin']),
  (req: AuthRequest, res: Response, next: NextFunction) => {
    try {
      const dept = departments.find(d => d.id === req.params.id);
      if (!dept) {
        throw new CustomError(404, 'Department not found');
      }

      const { name, description, manager, status } = req.body;
      Object.assign(dept, { name, description, manager, status });

      res.json({
        success: true,
        message: 'Department updated successfully',
        data: dept,
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
      const index = departments.findIndex(d => d.id === req.params.id);
      if (index === -1) {
        throw new CustomError(404, 'Department not found');
      }

      const deletedDept = departments.splice(index, 1);
      res.json({
        success: true,
        message: 'Department deleted successfully',
        data: deletedDept[0],
      });
    } catch (error) {
      next(error);
    }
  }
);

export default router;
