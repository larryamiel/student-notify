import { Routes, Route } from "react-router-dom";
import routes from "@/routes";

export function Auth() {

  return (
    <div className="relative min-h-screen w-full">
      <Routes>
        {routes.map(
          ({ layout, pages }) =>
            layout === "auth" &&
            pages.map(({ path, element, guard }) => {
              let Guard = null;
              let guardProps = null;
              if (guard) {
                Guard = guard.Guard;
                guardProps = guard.props;
              }

              return (
                <Route
                  exact
                  path={path}
                  element={
                    guard ? (
                      <Guard {...guardProps} redirect={true}>{element}</Guard>
                    ) : (
                      element
                    )
                  }
                />
              )
            })
        )}
      </Routes>
    </div>
  );
}

Auth.displayName = "/src/layout/Auth.jsx";

export default Auth;
