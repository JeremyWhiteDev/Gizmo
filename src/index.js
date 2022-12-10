import { createRoot } from "react-dom/client";
import "./index.css";
import { BrowserRouter } from "react-router-dom";
import firebase from "firebase/compat/app"; // Import Firebase!!
import { firebaseConfig } from "./apiKeys"; // Import Your Config!!
import { Gizmo } from "./components/GizmoApp";
import { QueryClient, QueryClientProvider } from "react-query";

firebase.initializeApp(firebaseConfig);

const queryClient = new QueryClient();

const container = document.getElementById("root");
const root = createRoot(container);
root.render(
  <BrowserRouter>
    <QueryClientProvider client={queryClient}>
      <Gizmo />
    </QueryClientProvider>
  </BrowserRouter>
);
