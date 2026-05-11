type GenerateParams = {
  customerName: string;

  destinations: string[];

  totalDays: number;

  travelStyle?: string;
};

export function generateItinerary({
  customerName,
  destinations,
  totalDays,
  travelStyle,
}: GenerateParams) {

  const days = [];

  let currentDay = 1;

  for (
    let i = 0;
    i < destinations.length;
    i++
  ) {
    const destination =
      destinations[i];

    days.push({
      day: currentDay,

      title: `Explore ${destination}`,

      stay: destination,

      description:
        `Experience the beauty of ${destination} with curated sightseeing, local experiences, and comfortable stays arranged by JustTheRoutes.`,

      activities: [
        `Local sightseeing in ${destination}`,

        `Leisure experiences and free exploration`,
      ],
    });

    currentDay++;
  }

  while (
    currentDay <= totalDays
  ) {
    days.push({
      day: currentDay,

      title:
        "Relaxation & Leisure",

      stay:
        destinations[
          destinations.length - 1
        ],

      description:
        "Enjoy a relaxed day with optional activities and local experiences.",

      activities: [
        "Free time",
        "Optional local experiences",
      ],
    });

    currentDay++;
  }

  return {
    title:
      `${totalDays} Days Kashmir Journey`,

    customerName,

    travelStyle:
      travelStyle ||
      "Curated Kashmir Experience",

    days,
  };
}