import { adminRoutes } from './adminRoutes';
import { mainRoutes } from './mainRoutes';
import { studentRoutes } from './studentRoutes';

export const routes = [
    ...mainRoutes, 
    ...adminRoutes, 
    ...studentRoutes
];
