import { Routes, Route, Navigate } from "react-router-dom";
import { Dashboard, Auth } from "@/layouts";
import { AuthProvider } from "./context/auth-context";
import AuthGuard from "./guards/auth-guard";

function App() {
  return (
    <AuthProvider>
      <Routes>
        <Route
          path="/dashboard/*"
          element={(
            <AuthGuard>
              <Dashboard />
            </AuthGuard>
          )}
        />
        <Route path="/auth/*" element={<Auth />} />
        <Route path="*" element={<Navigate to="/dashboard/home" replace />} />
      </Routes>
    </AuthProvider>
  );
}

export default App;
