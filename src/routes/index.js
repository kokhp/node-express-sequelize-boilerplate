import express from 'express';


import adminRoutes from './admin';
import publicRoutes from './public';
import userRoutes from './users';
import virtualAccountTypeRoutes from './virtualAccountTypes';
import apiMiddleware from '../middleware/apiAuth';
import adminMiddleware from '../middleware/adminAuth';

const app = express();

/* routes */

app.use('/user', apiMiddleware, userRoutes);
app.use('/virtualAccType', apiMiddleware, virtualAccountTypeRoutes);
app.use('/admin', apiMiddleware, adminMiddleware, adminRoutes);


/* public routes */
app.use('/pub', publicRoutes);


module.exports = app;
