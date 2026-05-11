export function generateDayNarrative(
  day: any,
  previousDay?: any,
  nextDay?: any,
  tripType?: string
) {

  const explore =
    day.explore;

  const stay =
    day.stay;

  const timing =
    day.transfer_timing;

  const overnight =
    day.overnight;

  const houseboat =
    day.houseboat;

  const tripTone =
    tripType?.toLowerCase() ||
    "";

  const luxuryTone =
    tripTone.includes(
      "luxury"
    );

  const honeymoonTone =
    tripTone.includes(
      "honeymoon"
    );

  // ARRIVAL DAY
  if (!previousDay) {

    return `Welcome to Kashmir. Upon arrival, begin your beautiful journey towards ${stay}. ${
      honeymoonTone
        ? "Enjoy romantic surroundings, peaceful landscapes and relaxed leisure experiences curated for a memorable honeymoon escape."
        : "Enjoy scenic landscapes, refreshing mountain air and relaxed local experiences."
    } Depending on arrival timing, local sightseeing and leisure moments can be explored before overnight stay in ${stay}. ${
      houseboat
        ? "Later experience the charm of Kashmir’s iconic houseboat lifestyle with a peaceful stay over Dal Lake accompanied by a complimentary traditional Shikara ride."
        : ""
    }`;

  }

  // DEPARTURE DAY
  if (!nextDay) {

    return `Enjoy a relaxed morning amidst the beautiful surroundings of ${stay}. Depending on departure timing, optional sightseeing and leisure experiences may be explored before assisted transfer towards airport or railway station for onward journey with wonderful Kashmir memories.`;

  }

  // NO TRANSFER
  if (
    timing === "none"
  ) {

    return `Spend the day exploring the beautiful surroundings of ${explore} with curated sightseeing, local experiences and relaxed leisure moments. ${
      luxuryTone
        ? "Enjoy premium experiences and scenic comfort throughout the day."
        : "Enjoy the region’s breathtaking natural beauty and memorable local experiences."
    } Overnight stay continues in ${stay}. ${
      houseboat
        ? "Enjoy a traditional houseboat stay experience along with a complimentary Shikara ride amidst the peaceful waters of Dal Lake."
        : ""
    }`;

  }

  // MORNING TRANSFER
  if (
    timing === "morning"
  ) {

    return `After breakfast, proceed towards ${explore} and experience breathtaking valleys, scenic landscapes and curated sightseeing experiences. Later continue your picturesque journey towards ${stay} for overnight stay amidst the serene beauty of Kashmir.`;

  }

  // EVENING TRANSFER
  return `Spend the day exploring the beauty of ${explore} with sightseeing, local experiences and leisure activities. By evening, continue towards ${stay} for overnight stay amidst the peaceful surroundings of Kashmir.`;

}