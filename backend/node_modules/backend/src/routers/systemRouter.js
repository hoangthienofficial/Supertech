
   import express from 'express';
   import { getSystemInfo } from '../controllers/systemController.js';

   const routersystem = express.Router();

   routersystem.get('/system-info', getSystemInfo);

   export default routersystem;