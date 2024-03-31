import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { loader as LandingLoader } from "./pages/Landing";
import { loader as SingleCocktailLoader } from "./pages/Cocktail";
import { action as NewsletterAction } from "./pages/Newsletter";
import {
  About,
  Cocktail,
  Landing,
  Newsletter,
  HomeLayout,
  Error,
  SinglePageError,
} from "./pages";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 60 * 5,
    },
  },
});

const router = createBrowserRouter([
  {
    path: "/",
    element: <HomeLayout />,
    errorElement: <Error />, //global Error
    children: [
      {
        index: true,
        element: <Landing />,
        errorElement: <SinglePageError />,
        loader: LandingLoader(queryClient),
      },
      {
        path: "cocktail/:id",
        errorElement: <SinglePageError />,
        element: <Cocktail />,
        loader: SingleCocktailLoader(queryClient),
      },
      {
        path: "newsletter",
        errorElement: <SinglePageError />,
        element: <Newsletter />,
        action: NewsletterAction,
      },
      {
        path: "about",
        element: <About />,
        children: [
          {
            index: true,
            element: <h2>Our Company</h2>,
          },
          {
            path: "person",
            element: <h2>TThe Person</h2>,
          },
        ],
      },
    ],
  },
]);

const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={router} />
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  );
};

export default App;
