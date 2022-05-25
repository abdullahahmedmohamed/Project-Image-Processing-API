import { Router } from 'express';
import imageService from '../../services/Images/imageService';

const route = Router();

route.get('/', async (req, res, next) => {
  try {
    const filePath = await imageService.processImage(req.query);
    res.sendFile(filePath);
  } catch (error) {
    next(error);
  }
});

export default route;
