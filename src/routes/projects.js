import express from 'express';
import {
  listProjects,
  getProject,
  createProject,
  updateProject,
  deleteProject,
} from '../controllers/projectController.js';

const router = express.Router();

router.get('/', listProjects);
router.get('/:id', getProject);
router.post('/', createProject);
router.put('/:id', updateProject);
router.delete('/:id', deleteProject);

export default router;
