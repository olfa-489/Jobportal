import express from 'express';
import {
  addToCart,
  getCartJobs,
  removeAllFromCart,
  updateNbPosts,
} from '../controllers/cart.controller.js';
import { protectRoute } from '../middlware/auth.middlware.js';

const router = express.Router();

router.get('/', protectRoute, getCartJobs);
router.post('/', protectRoute, addToCart);
router.delete('/', protectRoute, removeAllFromCart);
router.put('/:id', protectRoute, updateNbPosts);

export default router;
