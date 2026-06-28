import { createBrowserRouter } from "react-router";
import { AppLayout } from "./layouts/AppLayout";
import { CaseDetailPage } from "./pages/CaseDetailPage";
import { HomePage } from "./pages/HomePage";

export const appRouter = createBrowserRouter([
  {
    path: "/",
    element: <AppLayout />,
    children: [
      { index: true, element: <HomePage /> },
      { path: "cases/:caseId", element: <CaseDetailPage /> },
    ],
  },
]);
