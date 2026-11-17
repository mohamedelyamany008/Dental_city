import express from 'express';
import path from 'path';
import fs from 'fs';
import { fileURLToPath } from 'url';
import dotenv from 'dotenv';
import cookieParser from 'cookie-parser';
import session from 'express-session';
import expressLayouts from 'express-ejs-layouts';
import { indexRoutes } from './routes/index.routes.js';
import { appointmentRoutes } from './routes/appointments.routes.js';
import { doctorRoutes } from './routes/doctor.routes.js';
import { injectLocals } from './middleware/auth.js';
dotenv.config();
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const app = express();
const PORT = process.env.PORT || 5083;
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cookieParser());
app.use(session({
    secret: process.env.SESSION_SECRET || 'dental_city_secure_key_2026',
    resave: false,
    saveUninitialized: false,
    cookie: {
        httpOnly: true,
        maxAge: 8 * 60 * 60 * 1000
    }
}));
app.use(injectLocals);
const publicPath = path.join(__dirname, '..', 'public');
app.use(express.static(publicPath));
app.use(expressLayouts);
app.set('layout', 'layouts/main');
app.set('view engine', 'ejs');
const viewsPath = fs.existsSync(path.join(__dirname, 'views'))
    ? path.join(__dirname, 'views')
    : path.join(__dirname, '..', 'src', 'views');
app.set('views', viewsPath);
app.use('/', indexRoutes);
app.use('/', appointmentRoutes);
app.use('/', doctorRoutes);
app.use((_req, res) => {
    res.status(404).render('error', {
        title: 'الصفحة غير موجودة - 404',
        message: 'عذراً، الصفحة التي تبحث عنها غير موجودة أو تم نقلها.'
    });
});
app.use((err, _req, res, _next) => {
    const errorMsg = err instanceof Error ? err.message : 'حدث خطأ غير متوقع';
    console.error('Unhandled server error:', err);
    res.status(500).render('error', {
        title: 'حدث خطأ في الخادم',
        message: errorMsg || 'حدث خطأ غير متوقع، يرجى المحاولة مرة أخرى لاحقاً.'
    });
});
app.listen(PORT, () => {
    console.log(`====================================================`);
    console.log(`🏥 Dental City Web Application (Node.js + TypeScript)`);
    console.log(`🚀 Server running on: http://localhost:${PORT}`);
    console.log(`📅 Appointments: http://localhost:${PORT}/Appointments/Book`);
    console.log(`🔐 Doctor Portal: http://localhost:${PORT}/Doctor/Login`);
    console.log(`====================================================`);
});
export default app;
