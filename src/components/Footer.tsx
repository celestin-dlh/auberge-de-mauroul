import { cn } from "@/utils/cn";

interface FooterProps {
  className?: string;
}

export function Footer({ className }: FooterProps) {
  return (
    <footer
      className={cn("bg-white pt-20 pb-14 border-t border-gray-200", className)}
    >
      <div className="container mx-auto px-4">
        <div className="flex flex-col items-center">
          {/* Logo Text */}
          <div className="mb-8 text-center">
            <h2 className="text-4xl font-serif italic mb-4">
              Auberge de Mauroul
            </h2>
            <div className="space-y-1">
              <p className="text-gray-700 tracking-widest text-sm">
                Restaurant traditionnel
              </p>
              <p className="text-gray-700 tracking-widest text-sm">
                Hameau de Mauroul
              </p>
            </div>
          </div>

          {/* Separator */}
          <div className="w-16 h-px bg-gray-300 mb-8"></div>

          {/* Contact Info */}
          <div className="text-center mb-8 space-y-2">
            <p className="text-gray-700">
              <a
                href="tel:0467972773"
                className="hover:text-[#9B8579] transition-colors"
              >
                04 67 97 27 73
              </a>
            </p>
            <p className="text-gray-700">
              <a
                href="tel:0630106915"
                className="hover:text-[#9B8579] transition-colors"
              >
                06 30 10 69 15
              </a>
            </p>
            <div className="mt-4">
              <p className="text-gray-700">Hameau de Mauroul, 34390</p>
              <p className="text-gray-700">Saint - Julien</p>
            </div>
          </div>

          {/* Separator */}
          <div className="w-16 h-px bg-gray-300 mb-8"></div>

          {/* Google Maps */}
          <div className="w-full max-w-2xl mb-8">
            <div
              className="relative w-full"
              style={{ paddingBottom: "56.25%" }}
            >
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2889.9888743658094!2d2.874985376919791!3d43.58594807110539!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x12b191c1ddd7e559%3A0xf51a558d964400f8!2sAuberge%20de%20Mauroul!5e0!3m2!1sfr!2sfr!4v1750077316883!5m2!1sfr!2sfr"
                className="absolute top-0 left-0 w-full h-full rounded-lg shadow-md"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>
          </div>

          {/* Separator */}
          <div className="w-16 h-px bg-gray-300 mb-8"></div>

          {/* Opening Hours */}
          <div className="text-center mb-2">
            <p className="text-gray-700">
              Ouvert tous les jours sauf mercredi et jeudi
            </p>
          </div>

          {/* Payment Methods and Accessibility */}
          <div className="text-center mb-2 space-y-3">
            <div className="flex items-center justify-center gap-2 text-gray-700">
              <span>Moyens de paiement:</span>
              <span>Carte bancaire</span>
              <span>•</span>
              <span>Chèque</span>
              <span>•</span>
              <span>Espèces</span>
            </div>
            <div className="flex items-center justify-center gap-2 text-gray-700">
              <img
                src="/disabled.svg"
                alt="Wheelchair access icon"
                className="w-6 h-6"
              />
              <span>Accès handicapé</span>
            </div>
          </div>

          <a
            href="https://www.atout-france.fr/fr/destination-dexcellence"
            target="_blank"
            rel="noopener noreferrer"
          >
            <div className="mb-4">
              <img
                src="/destination-d-excellence.png"
                alt="Destination d'excellence"
                className="h-20"
              />
            </div>
          </a>

          {/* Separator */}
          <div className="w-16 h-px bg-gray-300 mb-8"></div>

          {/* Social Links */}
          <div className="flex justify-center space-x-8">
            <a
              href="https://www.facebook.com/Auberge-de-Mauroul-108499718115027"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-600 hover:text-[#9B8579] transition-colors relative group"
            >
              Facebook
              <span className="absolute -bottom-1 left-0 w-0 h-px bg-[#9B8579] transition-all group-hover:w-full"></span>
            </a>

            <a
              href="https://www.tripadvisor.fr/Restaurant_Review-g196600-d3487164-Reviews-L_Auberge_de_Mauroul-Beziers_Herault_Occitanie.html"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-600 hover:text-[#9B8579] transition-colors relative group"
            >
              TripAdvisor
              <span className="absolute -bottom-1 left-0 w-0 h-px bg-[#9B8579] transition-all group-hover:w-full"></span>
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
