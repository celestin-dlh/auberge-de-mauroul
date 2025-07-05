import { createFileRoute } from "@tanstack/react-router";
import { ReservationForm } from "@/components/ReservationForm";

export const Route = createFileRoute("/_public/reserver")({
  component: Reserver,
});

function Reserver() {
  return (
    <div className="flex-1">
      <ReservationForm />
    </div>
  );
}
