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
        path: "/",
        element: <HomePage />,
      },
      {
        path: "/search",
        element: <SearchPage />,
      },
      {
        path: "/trailer/:id",
        element: <TrailerPage />,
      },
      {
        path: "/movie/:id",
        element: <MovieDetailsPage />,
      },
      {
        path: "/watchlists",
        element: <WatchlistsPage />,
      },
      {
        path: "/watchlist/:id",
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
