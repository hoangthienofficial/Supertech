
import express from 'express';
import { getSetting,getSettingById, updateSetting} from '../controllers/settingController.js';
const settingRouter = express.Router();
settingRouter.get('/setting',getSetting);
settingRouter.get('/setting/:id', getSettingById);
settingRouter.put('/settingedit/:id', updateSetting);


export default settingRouter;