import { createFileRoute, Link } from "@tanstack/react-router";
import { convexQuery } from "@convex-dev/react-query";
import { useSuspenseQuery } from "@tanstack/react-query";
import { api } from "../../../convex/_generated/api";

export const Route = createFileRoute("/admin/")({
  component: AdminDashboard,
});

function AdminDashboard() {
  // Get menu data
  const { data: menuBlocs = [] } = useSuspenseQuery(
    convexQuery(api.menu.getMenuBlocs, {})
  );

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow-sm border-b">
        <div className="container mx-auto px-4 py-4">
          <h1 className="text-2xl font-bold text-gray-800">
            Administration - Auberge de Mauroul
          </h1>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
   

        <div className="mt-8 grid gap-6 lg:grid-cols-2">
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-xl font-semibold text-gray-800 mb-4">
              Actions rapides
            </h2>
            <div className="space-y-3">
              <Link
                to="/admin/menu"
                className="w-full bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700 transition-colors block text-center"
              >
                Gérer le Menu
              </Link>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-xl font-semibold text-gray-800 mb-4">
              Aperçu du menu
            </h2>
            <div className="space-y-3">
              {menuBlocs.slice(0, 4).map((bloc) => (
                <div
                  key={bloc._id}
                  className="flex justify-between items-center py-2 border-b"
                >
                  <div>
                    <p className="font-medium">{bloc.category}</p>
                    <p className="text-sm text-gray-600">
                      {bloc.items.length} plats
                    </p>
                  </div>
                  <Link
                    to="/admin/menu"
                    className="text-blue-600 hover:text-blue-800 text-sm"
                  >
                    Modifier
                  </Link>
                </div>
              ))}
              {menuBlocs.length === 0 && (
                <div className="text-center py-4">
                  <p className="text-gray-500 text-sm">Aucune section créée</p>
                  <Link
                    to="/admin/menu"
                    className="text-blue-600 hover:text-blue-800 text-sm"
                  >
                    Créer la première section
                  </Link>
                </div>
              )}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
