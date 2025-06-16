export const translations = {
  fr: {
    nav: {
      restaurant: "LE RESTAURANT",
      menu: "MENU",
      book: "RÉSERVER",
    },
    home: {
      title: "Auberge de Mauroul",
      subtitle: "Restaurant gastronomique",
      hero: {
        title: "Bienvenue à l'Auberge de Mauroul",
        description: "Une expérience culinaire unique au cœur de la nature",
      },
    },
    menu: {
      title: "Notre Menu",
      subtitle: "Découvrez nos créations culinaires",
      categories: {
        starters: {
          title: "Entrées",
          subtitle: "Nos entrées",
        },
        mainCourses: {
          title: "Plats",
          subtitle: "Nos plats",
        },
        desserts: {
          title: "Fromages & Desserts",
          subtitle: "Nos desserts",
        },
      },
      footer: "L'ensemble du repas ainsi que le pain sont faits maison.",
    },
    book: {
      title: "Réserver une table",
      form: {
        name: "Nom",
        email: "Email",
        phone: "Téléphone",
        date: "Date",
        time: "Heure",
        guests: "Nombre de convives",
        message: "Message",
        submit: "Réserver",
      },
      success: "Votre réservation a été enregistrée avec succès",
      error: "Une erreur est survenue lors de la réservation",
    },
    footer: {
      title: "Auberge de Mauroul",
      subtitle: "RESTAURANT TRADITIONNEL FRANÇAIS",
      subtitle2: "PLATS FAIT MAISON ET LOCAUX",
      phone1: "04 67 97 27 73",
      phone2: "06 30 10 69 15",
      address: {
        line1: "Hameau de Mauroul, 34390",
        line2: "Saint - Julien",
      },
      opening: "Ouvert tous les jours sauf mercredi et jeudi",
      payments: {
        title: "Paiements acceptés :",
        card: "Carte bancaire",
        check: "Chèque",
        cash: "Espèces",
      },
      accessibility: "Accès PMR",
      social: {
        facebook: "Facebook",
        tripadvisor: "Trip Advisor",
      },
    },
    reservation: {
      title: "Réserver une table",
      form: {
        date: "Date",
        time: "Heure",
        guests: "Nombre de personnes",
        name: "Nom",
        phone: "Téléphone",
        email: "Email",
        message: "Message (optionnel)",
        submit: "Réserver",
        timeOptions: {
          "11:30": "11:30",
          "12:00": "12:00",
          "12:30": "12:30",
          "13:00": "13:00",
          "19:00": "19:00",
          "19:30": "19:30",
          "20:00": "20:00",
          "20:30": "20:30",
          "21:00": "21:00",
        },
        guestsOptions: {
          "1": "1 personne",
          "2": "2 personnes",
          "3": "3 personnes",
          "4": "4 personnes",
          "5": "5 personnes",
          "6": "6 personnes",
          "7": "7 personnes",
          "8": "8 personnes",
        },
      },
    },
  },
  en: {
    nav: {
      restaurant: "THE RESTAURANT",
      menu: "MENU",
      book: "BOOK",
    },
    home: {
      title: "Auberge de Mauroul",
      subtitle: "Gastronomic Restaurant",
      hero: {
        title: "Welcome to Auberge de Mauroul",
        description: "A unique culinary experience in the heart of nature",
      },
    },
    menu: {
      title: "Our Menu",
      subtitle: "Discover our culinary creations",
      categories: {
        starters: {
          title: "Starters",
          subtitle: "Our starters",
        },
        mainCourses: {
          title: "Main Courses",
          subtitle: "Our main courses",
        },
        desserts: {
          title: "Cheeses & Desserts",
          subtitle: "Our desserts",
        },
      },
      footer: "All meals and bread are homemade.",
    },
    book: {
      title: "Book a Table",
      form: {
        name: "Name",
        email: "Email",
        phone: "Phone",
        date: "Date",
        time: "Time",
        guests: "Number of guests",
        message: "Message",
        submit: "Book",
      },
      success: "Your reservation has been successfully registered",
      error: "An error occurred while booking",
    },
    footer: {
      title: "Auberge de Mauroul",
      subtitle: "TRADITIONAL FRENCH RESTAURANT",
      subtitle2: "HOMEMADE AND LOCAL DISHES",
      phone1: "04 67 97 27 73",
      phone2: "06 30 10 69 15",
      address: {
        line1: "Hameau de Mauroul, 34390",
        line2: "Saint - Julien",
      },
      opening: "Open every day except Wednesday and Thursday",
      payments: {
        title: "Accepted payments:",
        card: "Credit card",
        check: "Check",
        cash: "Cash",
      },
      accessibility: "PMR Access",
      social: {
        facebook: "Facebook",
        tripadvisor: "Trip Advisor",
      },
    },
    reservation: {
      title: "Book a Table",
      form: {
        date: "Date",
        time: "Time",
        guests: "Number of guests",
        name: "Name",
        phone: "Phone",
        email: "Email",
        message: "Message (optional)",
        submit: "Book",
        timeOptions: {
          "11:30": "11:30",
          "12:00": "12:00",
          "12:30": "12:30",
          "13:00": "13:00",
          "19:00": "19:00",
          "19:30": "19:30",
          "20:00": "20:00",
          "20:30": "20:30",
          "21:00": "21:00",
        },
        guestsOptions: {
          "1": "1 person",
          "2": "2 people",
          "3": "3 people",
          "4": "4 people",
          "5": "5 people",
          "6": "6 people",
          "7": "7 people",
          "8": "8 people",
        },
      },
    },
  },
} as const;

export type TranslationKey = keyof typeof translations.fr;
export type TranslationPath = {
  [K in TranslationKey]: keyof (typeof translations.fr)[K];
};
