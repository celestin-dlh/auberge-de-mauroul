import { createFileRoute } from "@tanstack/react-router";
import { convexQuery } from "@convex-dev/react-query";
import { useSuspenseQuery } from "@tanstack/react-query";
import { api } from "../../../convex/_generated/api";
import MenuBloc from "@/components/MenuBloc";

export const Route = createFileRoute("/_public/menu")({
  component: Menu,
  loader: async (opts) => {
    await opts.context.queryClient.ensureQueryData(
      convexQuery(api.menu.getMenuBlocs, {}),
    );
  },
});

function Menu() {
  const { data: menuBlocs = [] } = useSuspenseQuery(
    convexQuery(api.menu.getMenuBlocs, {})
  );

  return (
    <div>
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-4xl font-bold text-center mb-8">Notre Menu</h1>
      </div>

      {menuBlocs.map((bloc) => (
        <MenuBloc key={bloc._id} {...bloc} />
      ))}
    </div>
  );
}
