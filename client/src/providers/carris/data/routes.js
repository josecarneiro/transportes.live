import rawRoutes from '@/../public/built/carris/route/list';

const routes = Object.entries(rawRoutes).map(([id, name]) => ({
  id,
  name
}));

export default routes;
