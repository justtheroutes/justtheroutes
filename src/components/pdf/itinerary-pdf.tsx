"use client";

import {
  Document,
  Page,
  Text,
  View,
  StyleSheet,
  PDFDownloadLink,
  Image,
} from "@react-pdf/renderer";

const styles =
  StyleSheet.create({

    page: {
      backgroundColor: "#F6F3EE",
      color: "#1F1F1F",
      fontFamily: "Helvetica",
      paddingTop: 38,
      paddingBottom: 38,
      paddingHorizontal: 38,
      position: "relative",
    },

    /* ---------- COVER ---------- */

    coverWrapper: {
      flex: 1,
      borderRadius: 24,
      overflow: "hidden",
      backgroundColor: "#FFFFFF",
    },

    coverImage: {
      width: "100%",
      height: 320,
      objectFit: "cover",
    },

    overlay: {
      position: "absolute",
      top: 0,
      left: 0,
      right: 0,
      height: 320,
      backgroundColor:
        "rgba(0,0,0,0.25)",
    },

    coverContent: {
      position: "absolute",
      top: 58,
      left: 42,
      right: 42,
    },

    brand: {
      color: "#FFFFFF",
      fontSize: 12,
      letterSpacing: 5,
      marginBottom: 24,
    },

    title: {
      color: "#FFFFFF",
      fontSize: 32,
      lineHeight: 1.3,
      width: "72%",
      fontFamily:
        "Helvetica-Bold",
      marginBottom: 14,
    },

    subtitle: {
      color: "#F2F2F2",
      fontSize: 12,
      lineHeight: 1.8,
      width: "70%",
    },

    infoCard: {
      marginHorizontal: 32,
      marginTop: -40,
      backgroundColor: "#FFFFFF",
      borderRadius: 22,
      padding: 26,
      position: "relative",
      zIndex: 5,
    },

    infoGrid: {
      flexDirection: "row",
      justifyContent:
        "space-between",
      marginBottom: 16,
    },

    infoBlock: {
      width: "48%",
    },

    label: {
      fontSize: 9,
      color: "#888888",
      letterSpacing: 1,
      textTransform:
        "uppercase",
      marginBottom: 6,
    },

    value: {
      fontSize: 12,
      color: "#1F1F1F",
      lineHeight: 1.6,
      fontFamily:
        "Helvetica-Bold",
    },

    introText: {
      marginTop: 8,
      fontSize: 11,
      lineHeight: 1.9,
      color: "#555555",
    },

    footer: {
      position: "absolute",
      bottom: 18,
      left: 38,
      right: 38,
      textAlign: "center",
      fontSize: 9,
      color: "#9A9A9A",
    },

    /* ---------- PAGE 2 ---------- */

    sectionTitle: {
      fontSize: 26,
      marginBottom: 26,
      color: "#1F3A32",
      fontFamily:
        "Helvetica-Bold",
    },

    grid: {
      flexDirection: "row",
      flexWrap: "wrap",
      justifyContent:
        "space-between",
    },

    card: {
      width: "48.2%",
      backgroundColor: "#FFFFFF",
      borderRadius: 20,
      overflow: "hidden",
      marginBottom: 18,
    },

    cardImage: {
      width: "100%",
      height: 120,
      objectFit: "cover",
    },

    cardBody: {
      padding: 18,
      minHeight: 200,
    },

    day: {
      fontSize: 15,
      color: "#1F3A32",
      fontFamily:
        "Helvetica-Bold",
      marginBottom: 6,
    },

    stay: {
      fontSize: 10,
      color: "#777777",
      marginBottom: 12,
    },

    narrative: {
      fontSize: 10.5,
      lineHeight: 1.8,
      color: "#444444",
    },

    /* ---------- PAGE 3 ---------- */

    finalGrid: {
      flexDirection: "row",
      justifyContent:
        "space-between",
      marginTop: 10,
    },

    inclusionCard: {
      width: "48.5%",
      backgroundColor: "#FFFFFF",
      borderRadius: 20,
      padding: 24,
      minHeight: 280,
    },

    finalTitle: {
      fontSize: 18,
      color: "#1F3A32",
      marginBottom: 16,
      fontFamily:
        "Helvetica-Bold",
    },

    inclusionText: {
      fontSize: 11,
      lineHeight: 2,
      color: "#444444",
    },

    trustCard: {
      width: "48.5%",
      backgroundColor: "#1F3A32",
      borderRadius: 20,
      padding: 24,
      minHeight: 280,
    },

    trustTitle: {
      fontSize: 18,
      color: "#FFFFFF",
      marginBottom: 16,
      fontFamily:
        "Helvetica-Bold",
    },

    trustText: {
      fontSize: 11,
      lineHeight: 1.9,
      color: "#E8E8E8",
    },

    closingQuote: {
      marginTop: 26,
      backgroundColor: "#FFFFFF",
      borderRadius: 20,
      padding: 24,
      textAlign: "center",
    },

    quoteText: {
      fontSize: 15,
      lineHeight: 1.9,
      color: "#333333",
      textAlign: "center",
      fontFamily:
        "Helvetica-Oblique",
    },
  });

const getImage =
  (destination: string) => {

    const name =
      destination?.toLowerCase() ||
      "";

    if (
      name.includes(
        "gulmarg"
      )
    ) {
      return "/pdf/gulmarg.jpg";
    }

    if (
      name.includes(
        "pahalgam"
      )
    ) {
      return "/pdf/pahalgam.jpg";
    }

    if (
      name.includes(
        "sonmarg"
      )
    ) {
      return "/pdf/sonmarg.jpg";
    }

    if (
      name.includes(
        "houseboat"
      )
    ) {
      return "/pdf/houseboat.jpg";
    }

    return "/pdf/srinagar.jpg";
  };

function ItineraryDocument({
  itinerary,
  inquiry,
}: any) {

  const days =
    itinerary?.days || [];

  return (
    <Document>

      {/* ---------------- COVER PAGE ---------------- */}

      <Page
        size="A4"
        style={styles.page}
      >

        <View
          style={
            styles.coverWrapper
          }
        >

          <Image
            src="/pdf/kashmir-cover.jpg"
            style={
              styles.coverImage
            }
          />

          <View
            style={styles.overlay}
          />

          <View
            style={
              styles.coverContent
            }
          >

            <Text
              style={styles.brand}
            >
              JUSTTHEROUTES
            </Text>

            <Text
              style={styles.title}
            >
              Curated Kashmir
              Journey
            </Text>

            <Text
              style={
                styles.subtitle
              }
            >
              Thoughtfully
              designed travel
              experiences blending
              scenic landscapes,
              curated stays and
              seamless moments
              across Kashmir.
            </Text>

          </View>

          <View
            style={
              styles.infoCard
            }
          >

            <View
              style={
                styles.infoGrid
              }
            >

              <View
                style={
                  styles.infoBlock
                }
              >

                <Text
                  style={
                    styles.label
                  }
                >
                  Guest
                </Text>

                <Text
                  style={
                    styles.value
                  }
                >
                  {inquiry?.name ||
                    "Guest"}
                </Text>

              </View>

              <View
                style={
                  styles.infoBlock
                }
              >

                <Text
                  style={
                    styles.label
                  }
                >
                  Duration
                </Text>

                <Text
                  style={
                    styles.value
                  }
                >
                  {inquiry?.total_days ||
                    inquiry?.custom_trip_days ||
                    "5"}{" "}
                  Days
                </Text>

              </View>

            </View>

            <View
              style={
                styles.infoGrid
              }
            >

              <View
                style={
                  styles.infoBlock
                }
              >

                <Text
                  style={
                    styles.label
                  }
                >
                  Travel Style
                </Text>

                <Text
                  style={
                    styles.value
                  }
                >
                  {inquiry?.travel_style ||
                    "Luxury Kashmir Escape"}
                </Text>

              </View>

              <View
                style={
                  styles.infoBlock
                }
              >

                <Text
                  style={
                    styles.label
                  }
                >
                  Vehicle
                </Text>

                <Text
                  style={
                    styles.value
                  }
                >
                  {inquiry?.cab_preference ||
                    "Private Vehicle"}
                </Text>

              </View>

            </View>

            <Text
              style={
                styles.introText
              }
            >
              Every moment of this
              journey has been
              designed to create a
              balanced Kashmir
              experience combining
              comfort, scenery,
              local culture and
              memorable travel
              moments.
            </Text>

          </View>

        </View>

        <Text style={styles.footer}>
          Curated by
          JustTheRoutes ·
          justtheroutes.com
        </Text>

      </Page>

      {/* ---------------- PAGE 2 ---------------- */}

      <Page
        size="A4"
        style={styles.page}
      >

        <Text
          style={
            styles.sectionTitle
          }
        >
          Journey Overview
        </Text>

        <View style={styles.grid}>

          {days.map(
            (
              day: any,
              index: number
            ) => (

              <View
                key={index}
                wrap={false}
                style={styles.card}
              >

                <Image
                  src={getImage(
                    day.explore
                  )}
                  style={
                    styles.cardImage
                  }
                />

                <View
                  style={
                    styles.cardBody
                  }
                >

                  <Text
                    style={
                      styles.day
                    }
                  >
                    Day{" "}
                    {index + 1}
                  </Text>

                  <Text
                    style={
                      styles.stay
                    }
                  >
                    Overnight:
                    {" "}
                    {day.stay ||
                      "Srinagar"}
                  </Text>

                  <Text
                    style={
                      styles.narrative
                    }
                  >
                    {
                      day.narrative
                    }
                  </Text>

                </View>

              </View>
            )
          )}

        </View>

        <Text style={styles.footer}>
          Luxury Kashmir
          Experiences Curated for
          You
        </Text>

      </Page>

      {/* ---------------- PAGE 3 ---------------- */}

      <Page
        size="A4"
        style={styles.page}
      >

        <Text
          style={
            styles.sectionTitle
          }
        >
          Travel Experience
        </Text>

        <View
          style={styles.finalGrid}
        >

          <View
            style={
              styles.inclusionCard
            }
          >

            <Text
              style={
                styles.finalTitle
              }
            >
              Complimentary
              Inclusions
            </Text>

            <Text
              style={
                styles.inclusionText
              }
            >

              ✔ Traditional
              Welcome Kahwa{"\n"}

              ✔ Dedicated Travel
              Assistance{"\n"}

              ✔ Complimentary
              Shikara Ride
              (if applicable)
              {"\n"}

              ✔ Curated Local
              Experiences{"\n"}

              ✔ Seamless Arrival &
              Departure
              Coordination{"\n"}

              ✔ Personalized
              Journey Support

            </Text>

          </View>

          <View
            style={styles.trustCard}
          >

            <Text
              style={
                styles.trustTitle
              }
            >
              Why
              JustTheRoutes
            </Text>

            <Text
              style={
                styles.trustText
              }
            >

              We focus on creating
              thoughtfully curated
              Kashmir journeys
              instead of generic
              travel packages.

              {"\n\n"}

              Every itinerary is
              designed around route
              flow, comfort,
              destination timing
              and meaningful local
              experiences.

              {"\n\n"}

              From scenic stays to
              smooth coordination,
              the goal is to create
              journeys that feel
              effortless, elegant
              and memorable.

            </Text>

          </View>

        </View>

        <View
          style={
            styles.closingQuote
          }
        >

          <Text
            style={
              styles.quoteText
            }
          >

            “Travel is not simply
            about destinations.
            It’s about how every
            moment feels along the
            journey.”

          </Text>

        </View>

        <Text style={styles.footer}>
          JUSTTHEROUTES ·
          Curated Kashmir
          Experiences
        </Text>

      </Page>

    </Document>
  );
}

export default function ItineraryPDF({
  itinerary,
  inquiry,
}: any) {

  return (
    <PDFDownloadLink
      document={
        <ItineraryDocument
          itinerary={
            itinerary
          }
          inquiry={
            inquiry
          }
        />
      }
      fileName={`${inquiry?.name || "guest"}-itinerary.pdf`}
    >

      {({
        loading,
      }) => (

        <button className="bg-[#1F3A32] text-white px-8 py-4 rounded-full hover:opacity-90 transition">

          {loading
            ? "Preparing PDF..."
            : "Download Itinerary PDF"}

        </button>

      )}

    </PDFDownloadLink>
  );
}