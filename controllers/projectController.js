import Project from "../models/Project.js";

export const createProject = async (req, res) => {
  const project = await Project.create({
    title: req.body.title,
    members: req.body.members,
    createdBy: req.user.id
  });

  res.json(project);
};

export const getProjects = async (req, res) => {
  const projects = await Project.find({ members: req.user.id });
  res.json(projects);
};