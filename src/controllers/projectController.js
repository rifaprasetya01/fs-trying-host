import Project from '../models/Project.js';

/**
 * GET /api/projects
 */
export const listProjects = async (req, res, next) => {
  try {
    const projects = await Project.findAll({order: [['createdAt', 'DESC']]});
    res.json(projects);
  } catch (err) {
    next(err);
  }
};

/**
 * GET /api/projects/:id
 */
export const getProject = async (req, res, next) => {
  try {
    const id = Number(req.params.id);
    const project = await Project.findByPk(id);
    if (!project) return res.status(404).json({message: 'Project not found'});
    res.json(project);
  } catch (err) {
    next(err);
  }
};

/**
 * POST /api/projects
 * body: { title, description, url, repo, tags (array|string), cover }
 */
export const createProject = async (req, res, next) => {
  try {
    const {title, description, url, repo, tags, cover} = req.body;
    if (!title) return res.status(400).json({message: 'title is required'});

    const project = await Project.create({
      title,
      description,
      url,
      repo,
      tags,
      cover,
    });
    res.status(201).json(project);
  } catch (err) {
    next(err);
  }
};

/**
 * PUT /api/projects/:id
 */
export const updateProject = async (req, res, next) => {
  try {
    const id = Number(req.params.id);
    const project = await Project.findByPk(id);
    if (!project) return res.status(404).json({message: 'Project not found'});

    const {title, description, url, repo, tags, cover} = req.body;
    await project.update({title, description, url, repo, tags, cover});
    res.json(project);
  } catch (err) {
    next(err);
  }
};

/**
 * DELETE /api/projects/:id
 */
export const deleteProject = async (req, res, next) => {
  try {
    const id = Number(req.params.id);
    const project = await Project.findByPk(id);
    if (!project) return res.status(404).json({message: 'Project not found'});

    await project.destroy();
    res.status(204).end();
  } catch (err) {
    next(err);
  }
};
