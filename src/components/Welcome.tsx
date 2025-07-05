import { cn } from "@/utils/cn";

interface WelcomeProps {
  title?: string;
  className?: string;
}

export function Welcome({ title, className }: WelcomeProps) {
  return (
    <div className={cn("flex-1", className)}>
      {/* Hero Section with Contact Info */}
      <div className="relative h-screen">
        {/* Background Image */}
        <div className="absolute inset-0 z-0">
          <img
            src="/landscape.jpg"
            alt="Auberge de Mauroul"
            className="w-full h-full object-cover"
          />
        </div>

        {/* Contact Info Overlay */}
        <div className="absolute top-4 right-4 flex flex-col gap-4 bg-white/80 p-4 rounded-lg">
          <div className="flex items-center gap-2">
            <img
              src="https://local-fr-public.s3.eu-west-3.amazonaws.com/prod/webtool/userfiles/30839/picto%20telephone.png"
              alt="Téléphone"
              className="w-4 h-4"
            />
            <a href="tel:0467972773" className="hover:text-gray-600">04 67 97 27 73</a>
          </div>
          <div className="flex items-center gap-2">
            <img
              src="https://local-fr-public.s3.eu-west-3.amazonaws.com/prod/webtool/userfiles/30839/picto%20mobile.png"
              alt="Mobile"
              className="w-3 h-4"
            />
            <a href="tel:0630106915" className="hover:text-gray-600">06 30 10 69 15</a>
          </div>
          <div className="flex items-center gap-2">
            <img
              src="https://local-fr-public.s3.eu-west-3.amazonaws.com/prod/webtool/userfiles/30839/picto%20adress.png"
              alt="Adresse"
              className="w-4 h-4"
            />
            <div>
              <p>Hameau de Mauroul, 34390</p>
              <p>Saint - Julien</p>
            </div>
          </div>
        </div>
      </div>

      {/* Presentation Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-serif text-center mb-8">Notre histoire</h2>
          <div className="max-w-2xl mx-auto space-y-4 text-lg">
            <p>
              Notre histoire a débuté avec la découverte de cette auberge, existante
              depuis 1963.
            </p>
            <p>
              Idéalement située dans ce petit hameau de Mauroul elle a acquis une
              notoriété au fil des années.
            </p>
            <p>
              Nichée au pied du massif du Caroux dans un écrin de verdure, le temps
              semble s'être arrêté à Mauroul.
            </p>
            <p>
              A tous les amoureux de Nature, de calme et de sérénité, notre
              restaurant est un espace pour ceux qui ne sont pas pressés, pour les
              épicuriens et les gens heureux.
            </p>
            <p>
              Si vous venez chez nous c'est que vous avez déjà choisi de passer un
              moment de votre vie avec nous.
            </p>
            <p>
              Nous saurons satisfaire vos exigences en proposant une cuisine
              traditionnelle parsemée d'une touche d'exotisme aux saveurs du monde.
            </p>
            <p>
              L'hiver vous pourrez profiter de notre magnifique cheminée et aux
              beaux jours de notre ravissante terrasse panoramique.
            </p>
          </div>
        </div>
      </section>

      {/* Découverte Section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <h3 className="text-2xl font-serif">
                Découvrez notre auberge à Mauroul dans l'Hérault
              </h3>
            </div>
            <div className="space-y-4">
              <p>
                Si vous êtes en visite dans notre région, arrêtez-vous à l'auberge
                pour vous offrir une pause gourmande dans notre restaurant.
              </p>
              <p>
                Le chef Luc vous fera découvrir une cuisine traditionnelle
                française, parsemée d'une touche d'exotisme aux saveurs du monde.
              </p>
              <p>
                Marie saura rendre votre moment agréable et chaleureux, dans un
                cadre où règnent la nature et le chant des oiseaux.
              </p>
              <p>
                L'auberge étant située au pied du massif de l'Espinouse vous
                bénéficierez d'une vue imprenable sur les collines.
              </p>
              <p>
                L'hiver, vous pourrez profiter de notre magnifique cheminée et aux
                beaux jours, de notre ravissante terrasse panoramique.
              </p>
            </div>
          </div>
          <div className="mt-8">
            <img
              src="https://local-fr-public.s3.eu-west-3.amazonaws.com/prod/webtool/userfiles/30839/MODIF%2016092021/Auberge_de_Mauroul%209-1.jpg"
              alt="Auberge de Mauroul"
              className="w-full rounded-lg shadow-lg"
            />
          </div>
        </div>
      </section>

      {/* Réservation Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-serif mb-6">Pensez à réserver !</h2>
          <div className="max-w-2xl mx-auto space-y-4">
            <p>
              Contactez-nous par téléphone au 04 67 97 27 73 pour réserver une table
              dans notre établissement.
            </p>
            <p>Nous sommes ouverts tous les jours sauf mercredi et jeudi</p>
            <p>
              Nous pouvons accueillir des groupes exceptionnellement le dimanche soir
              sur réservation.
            </p>
            <a
              href="/reserver"
              className="inline-block w-full bg-black cursor-pointer text-white py-2 px-4 rounded-md hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-black text-center"
            >
              Réserver une table
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}