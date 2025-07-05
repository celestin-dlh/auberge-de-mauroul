import { createFileRoute, Link } from "@tanstack/react-router";
import { Welcome } from "@/components/Welcome";
import { cn } from "@/utils/cn";
import { Button } from "@/components/Button";

export const Route = createFileRoute("/_public/")({
  component: Home,
});

function Home() {
  return (
    <div className={cn("flex-1")}>
      {/* Hero Section with Contact Info */}
      <div className="relative h-screen">
        {/* Background Image */}
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-gradient-to-b from-black/50 to-black/30" />
          <img
            src="/terrasse-view-1.jpg"
            alt="Auberge de Mauroul"
            className="w-full h-full object-cover"
          />
        </div>
      </div>

      <section className="py-16">
        <div className="container mx-auto px-4 relative">
          <div className="bg-[#9B8579] absolute top-0 left-0 right-0 bottom-0 z-30" />

          <div className="flex flex-col lg:flex-row items-center gap-12 z-20">
            {/* Image à gauche */}
            <div className="lg:w-1/2">
              <img
                src="/terrasse-view-2.jpg"
                alt="Auberge de Mauroul - Vue extérieure"
                className="w-full h-auto rounded-lg shadow-lg"
              />
            </div>

            {/* Texte à droite */}
            <div className="lg:w-1/2 space-y-6">
              <p className="text-black leading-relaxed">
                Une aventure qui continue… Notre histoire a débuté avec la
                découverte de cette auberge, existante depuis 1963. Idéalement
                située dans ce petit hameau de Mauroul elle a acquis une
                notoriété au fil des années. Nichée au pied du massif du Caroux
                dans un écrin de verdure, le temps semble s’être arrêté à
                Mauroul. A tous les amoureux de Nature, de calme et de sérénité,
                notre restaurant est un espace pour ceux qui ne sont pas
                pressés, pour les épicuriens et les gens heureux. Si vous venez
                chez nous c’est que vous avez déjà choisi de passer un moment de
                votre vie avec nous. Nous saurons satisfaire vos exigences en
                proposant une cuisine traditionnelle parsemée d’une touche
                d’exotisme aux saveurs du monde. L’hiver vous pourrez profiter
                de notre magnifique cheminée et aux beaux jours de notre
                ravissante terrasse panoramique.
              </p>

              <div className="flex flex-wrap gap-6 pt-4 justify-center lg:justify-start">
                <Link to="/reserver" className="text-xl text-black font-medium">
                  <span className="text-2xl mr-2">•</span> Réserver une table
                </Link>

                <Link to="/menu" className="text-xl text-black font-medium">
                  <span className="text-2xl mr-2">•</span> Carte & Menu
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
