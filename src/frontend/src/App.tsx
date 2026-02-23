import { RouterProvider, createRouter, createRoute, createRootRoute } from '@tanstack/react-router';
import { ThemeProvider } from 'next-themes';
import HomePage from './pages/HomePage';
import PoetProfilePage from './pages/PoetProfilePage';
import OwnerPoetryPage from './pages/OwnerPoetryPage';
import Layout from './components/Layout';
import { LanguageProvider } from './contexts/LanguageContext';
import { Toaster } from '@/components/ui/sonner';

const rootRoute = createRootRoute({
  component: Layout,
});

const indexRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/',
  component: HomePage,
});

const poetRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/poet/$stateOrUT',
  component: PoetProfilePage,
});

const ownerRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/owner-poetry',
  component: OwnerPoetryPage,
});

const routeTree = rootRoute.addChildren([indexRoute, poetRoute, ownerRoute]);

const router = createRouter({ routeTree });

declare module '@tanstack/react-router' {
  interface Register {
    router: typeof router;
  }
}

export default function App() {
  return (
    <ThemeProvider attribute="class" defaultTheme="light" enableSystem>
      <LanguageProvider>
        <RouterProvider router={router} />
        <Toaster />
      </LanguageProvider>
    </ThemeProvider>
  );
}
