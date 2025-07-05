import { createFileRoute, Outlet } from "@tanstack/react-router";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { zodValidator } from "@tanstack/zod-adapter";
import { z } from "zod";

const publicSearchSchema = z.object({
  lang: z.string().default("fr"),
});

export const Route = createFileRoute("/_public")({
  component: RouteComponent,
  validateSearch: zodValidator(publicSearchSchema),
});

function RouteComponent() {
  return (
    <div className="min-h-screen flex flex-col">
      {/* <Header /> */}
      <main className="flex-1">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}
