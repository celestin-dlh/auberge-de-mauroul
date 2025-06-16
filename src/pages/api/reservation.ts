import type { APIRoute } from "astro";
// import { RESEND_API_KEY } from "astro:env/server";
// import { Resend } from "resend";

// const resend = new Resend(RESEND_API_KEY);

export const prerender = false;

export const POST: APIRoute = async ({ request }) => {
  try {
    const data = await request.json();

    const reservation = {
      date: data.date,
      time: data.time,
      guests: data.guests,
      name: data.name,
      phone: data.phone,
      email: data.email,
      message: data.message,
      timestamp: new Date().toISOString(),
    };

    // await resend.emails.send({
    //   from: "onboarding@resend.dev",
    //   to: "cdelahay@student.42.fr",
    //   subject: "Test",
    //   html: `Nouvelle réservation reçue: 
    //   date: ${reservation.date},
    //   time: ${reservation.time},
    //   guests: ${reservation.guests},
    //   name: ${reservation.name},
    //   phone: ${reservation.phone},
    //   email: ${reservation.email},
    //   message: ${reservation.message}`,
    // });

    console.log("Nouvelle réservation reçue:", reservation);

    return new Response(
      JSON.stringify({
        success: true,
        message:
          "Votre réservation a été reçue. Nous vous contacterons pour confirmer.",
      }),
      {
        status: 200,
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
  } catch (error) {
    console.error("Erreur lors du traitement de la réservation:", error);

    return new Response(
      JSON.stringify({
        success: false,
        message: "Une erreur s'est produite. Veuillez réessayer.",
      }),
      {
        status: 500,
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
  }
};
