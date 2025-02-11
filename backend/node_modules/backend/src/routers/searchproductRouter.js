
import express from 'express';
import { searchProducts} from '../controllers/searchproduct.js';
const searchRouter = express.Router();

searchRouter.get('/timkiem', searchProducts );
export default searchRouter;