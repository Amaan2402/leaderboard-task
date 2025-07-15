import App from "./App";
import ClaimHistory from "./components/claimhistory/ClaimHistory";
export const router = [
  {
    path: "/",
    element: <App />,
  },
  {
    path: "/claim-history",
    element: <ClaimHistory />,
  },
  {
    path: "*",
    element: <div>404 Not Found</div>,
  },
];
