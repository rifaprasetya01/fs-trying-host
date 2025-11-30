import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import sequelize from './config/database.js';
import Project from './models/Project.js'; // ensure model is imported before sync
import projectRoutes from './routes/projects.js';
import errorHandler from './middleware/errorHandler.js';

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json({limit: '2mb'}));
app.use(express.urlencoded({extended: true}));

// base route
app.get('/', (req, res) =>
  res.json({ok: true, env: process.env.NODE_ENV || 'development'})
);

// API routes
app.use('/api/projects', projectRoutes);

// error handler last
app.use(errorHandler);

const PORT = process.env.PORT || 4000;

async function start() {
  try {
    // test connection
    await sequelize.authenticate();
    console.log('✅ Database connection OK');

    // sync models
    await sequelize.sync({alter: true}); // alter:true in dev only; adjust for production
    console.log('✅ Models synchronized');

    app.listen(PORT, () => {
      console.log(`🚀 Server running on http://localhost:${PORT}`);
    });
  } catch (err) {
    console.error('Failed to start server:', err);
    process.exit(1);
  }
}

start();
