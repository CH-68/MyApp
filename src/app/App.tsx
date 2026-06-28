import { RouterProvider } from "react-router";
import { CaseWorkflowProvider } from "./providers/CaseWorkflowProvider";
import { appRouter } from "./routes";

export default function App() {
  return (
    <CaseWorkflowProvider>
      <RouterProvider router={appRouter} />
    </CaseWorkflowProvider>
  );
}
