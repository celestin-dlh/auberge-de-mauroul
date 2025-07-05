import { useState } from "react";
import { Button } from "./Button";
import { cn } from "@/utils/cn";
import { useMutation as useConvexMutation } from "convex/react";
import { api } from "../../convex/_generated/api";

interface ReservationFormData {
  date: string;
  time: string;
  guests: string;
  name: string;
  phone: string;
  email: string;
  message: string;
}

interface ReservationFormProps {
  className?: string;
}

export function ReservationForm({ className }: ReservationFormProps) {
  const [formData, setFormData] = useState<ReservationFormData>({
    date: "",
    time: "",
    guests: "",
    name: "",
    phone: "",
    email: "",
    message: "",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  
  // Convex mutation
  const createReservation = useConvexMutation(api.reservations.createReservation);

  const handleInputChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      await createReservation({
        date: formData.date,
        time: formData.time,
        guests: formData.guests,
        name: formData.name,
        phone: formData.phone,
        email: formData.email,
        message: formData.message,
      });

      alert("Réservation enregistrée avec succès!");
      setFormData({
        date: "",
        time: "",
        guests: "",
        name: "",
        phone: "",
        email: "",
        message: "",
      });
    } catch (error) {
      alert(
        "Une erreur s'est produite. Veuillez réessayer ou nous contacter directement."
      );
      console.error("Erreur:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  // Time options - this would typically come from i18n
  const timeOptions = {
    "19:00": "19:00",
    "19:30": "19:30",
    "20:00": "20:00",
    "20:30": "20:30",
    "21:00": "21:00",
  };

  // Guest options - this would typically come from i18n
  const guestOptions = {
    "1": "1 personne",
    "2": "2 personnes",
    "3": "3 personnes",
    "4": "4 personnes",
    "5": "5 personnes",
    "6": "6 personnes",
    "7": "7 personnes",
    "8": "8 personnes ou plus",
  };

  return (
    <div className={cn("max-w-2xl mx-auto pb-5 px-5", className)}>
      <h1 className="text-center text-5xl mt-10 font-cormorant">
        Réserver une table
      </h1>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label
            htmlFor="date"
            className="block text-sm font-medium text-gray-700"
          >
            Date
          </label>
          <input
            type="date"
            id="date"
            name="date"
            value={formData.date}
            onChange={handleInputChange}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 px-4 py-2 font-serif"
            required
          />
        </div>

        <div>
          <label
            htmlFor="time"
            className="block text-sm font-medium text-gray-700"
          >
            Heure
          </label>
          <select
            id="time"
            name="time"
            value={formData.time}
            onChange={handleInputChange}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 px-4 py-2 font-serif"
            required
          >
            <option value="">Choisir une heure</option>
            {Object.entries(timeOptions).map(([value, label]) => (
              <option key={value} value={value}>
                {label}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label
            htmlFor="guests"
            className="block text-sm font-medium text-gray-700"
          >
            Nombre de personnes
          </label>
          <select
            id="guests"
            name="guests"
            value={formData.guests}
            onChange={handleInputChange}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 px-4 py-2 font-serif"
            required
          >
            <option value="">Choisir le nombre de personnes</option>
            {Object.entries(guestOptions).map(([value, label]) => (
              <option key={value} value={value}>
                {label}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label
            htmlFor="name"
            className="block text-sm font-medium text-gray-700"
          >
            Nom
          </label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleInputChange}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 px-4 py-2 font-serif"
            required
          />
        </div>

        <div>
          <label
            htmlFor="phone"
            className="block text-sm font-medium text-gray-700"
          >
            Téléphone
          </label>
          <input
            type="tel"
            id="phone"
            name="phone"
            value={formData.phone}
            onChange={handleInputChange}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 px-4 py-2 font-serif"
            required
          />
        </div>

        <div>
          <label
            htmlFor="email"
            className="block text-sm font-medium text-gray-700"
          >
            Email
          </label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleInputChange}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 px-4 py-2 font-serif"
            required
          />
        </div>

        <div>
          <label
            htmlFor="message"
            className="block text-sm font-medium text-gray-700"
          >
            Message
          </label>
          <textarea
            id="message"
            name="message"
            rows={3}
            value={formData.message}
            onChange={handleInputChange}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 px-4 py-2 font-serif"
          />
        </div>

        <Button type="submit" disabled={isSubmitting}>
          {isSubmitting ? "Envoi en cours..." : "Envoyer la réservation"}
        </Button>
      </form>
    </div>
  );
}
