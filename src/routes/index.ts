import express from 'express';
import adminRoutes from './admin';
import shopRoutes from './shop';
// import authRoutes from './auth'; // (later if needed)

const router = express.Router();

// Mount sub-routers
router.use('/admin', adminRoutes);
router.use('/', shopRoutes);
// router.use('/auth', authRoutes); // (later)

export default router;
