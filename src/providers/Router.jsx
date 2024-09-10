// router.jsx
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import HomePage from "../pages/HomePage";
import SearchPage from "../pages/SearchPage";
import TrailerPage from "../pages/TrailerPage";
import MovieDetailsPage from "../pages/MovieDetailsPage";
import WatchlistPage from "../pages/WatchlistPage";
import Layout from "../components/Layout";
import PageNotFound from "../pages/PageNotFound";
import WatchlistsPage from "../pages/WatchlistsPage";

const ROUTES = [
  {
    path: "/deploying/",
    element: <Layout />,
    errorElement: <PageNotFound />,
    children: [
      {
        path: "/deploying/",
        element: <HomePage />,
      },
      {
        path: "/deploying/search",
        element: <SearchPage />,
      },
      {
        path: "/deploying/trailer/:id",
        element: <TrailerPage />,
      },
      {
        path: "/deploying/movie/:id",
        element: <MovieDetailsPage />,
      },
      {
        path: "/deploying/watchlists",
        element: <WatchlistsPage />,
      },
      {
        path: "/deploying/watchlist/:id",
        element: <WatchlistPage />,
      }
    ],
  },
];

const router = createBrowserRouter(ROUTES);

const Router = () => {
  return <RouterProvider router={router} />;
};

export default Router;
