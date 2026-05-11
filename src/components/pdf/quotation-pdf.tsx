"use client";

import {
  Document,
  Page,
  Text,
  View,
  StyleSheet,
  PDFDownloadLink,
} from "@react-pdf/renderer";

const styles =
  StyleSheet.create({

    page: {
      paddingTop: 40,
      paddingBottom: 60,
      paddingHorizontal: 38,
      backgroundColor: "#F8F7F3",
      color: "#222222",
      fontSize: 12,
      fontFamily: "Helvetica",
    },

    hero: {
      marginBottom: 34,
    },

    brand: {
      fontSize: 16,
      letterSpacing: 5,
      marginBottom: 20,
      color: "#1F3A32",
    },

    title: {
      fontSize: 34,
      marginBottom: 12,
      fontWeight: 700,
      lineHeight: 1.3,
    },

    subtitle: {
      fontSize: 13,
      color: "#666666",
      marginBottom: 6,
    },

    guest: {
      fontSize: 22,
      marginTop: 8,
    },

    infoCard: {
      backgroundColor: "#FFFFFF",
      borderRadius: 18,
      padding: 22,
      marginBottom: 30,
    },

    infoLabel: {
      fontSize: 10,
      color: "#888888",
      marginBottom: 4,
      textTransform: "uppercase",
      letterSpacing: 1,
    },

    infoValue: {
      fontSize: 13,
      marginBottom: 14,
      color: "#222222",
    },

    sectionTitle: {
      fontSize: 22,
      color: "#1F3A32",
      marginBottom: 20,
      fontWeight: 700,
    },

    table: {
      marginTop: 10,
      borderRadius: 18,
      overflow: "hidden",
      backgroundColor: "#FFFFFF",
      marginBottom: 30,
    },

    row: {
      flexDirection: "row",
      justifyContent:
        "space-between",
      paddingVertical: 18,
      paddingHorizontal: 20,
      borderBottom:
        "1px solid #EEEEEE",
    },

    rowLeft: {
      width: "70%",
    },

    rowTitle: {
      fontSize: 13,
      marginBottom: 4,
      color: "#222222",
    },

    rowSub: {
      fontSize: 10,
      color: "#888888",
      lineHeight: 1.6,
    },

    rowAmount: {
      fontSize: 13,
      color: "#1F3A32",
      fontWeight: 700,
    },

    totalBox: {
      padding: 28,
      backgroundColor: "#1F3A32",
      borderRadius: 22,
      marginBottom: 26,
    },

    totalLabel: {
      color: "#D8D8D8",
      fontSize: 11,
      marginBottom: 10,
      letterSpacing: 1,
      textTransform: "uppercase",
    },

    totalAmount: {
      color: "#FFFFFF",
      fontSize: 38,
      fontWeight: 700,
      marginBottom: 10,
    },

    gstText: {
      color: "#D8D8D8",
      fontSize: 11,
      lineHeight: 1.8,
    },

    inclusionBox: {
      backgroundColor: "#FFFFFF",
      borderRadius: 18,
      padding: 22,
      marginBottom: 26,
    },

    inclusionTitle: {
      fontSize: 18,
      marginBottom: 16,
      color: "#1F3A32",
      fontWeight: 700,
    },

    inclusionText: {
      fontSize: 11,
      lineHeight: 2,
      color: "#444444",
    },

    termsBox: {
      marginTop: 8,
      backgroundColor: "#FFFFFF",
      borderRadius: 18,
      padding: 22,
    },

    termsTitle: {
      fontSize: 18,
      marginBottom: 16,
      color: "#1F3A32",
      fontWeight: 700,
    },

    termsText: {
      fontSize: 10.5,
      lineHeight: 1.9,
      color: "#555555",
    },

    footer: {
      position: "absolute",
      bottom: 24,
      left: 38,
      right: 38,
      textAlign: "center",
      fontSize: 10,
      color: "#999999",
    },
  });

function QuoteDocument({
  itinerary,
  inquiry,
  quote,
}: any) {

  const hotel =
    Number(
      quote?.hotel_cost || 0
    );

  const transport =
    Number(
      quote?.transport_cost || 0
    );

  const activities =
    Number(
      quote?.activities_cost || 0
    );

  const markup =
    Number(
      quote?.markup || 0
    );

  const gstPercent =
    Number(
      quote?.gst || 0
    );

  const subtotal =
    hotel +
    transport +
    activities +
    markup;

  const gstAmount =
    subtotal *
    (gstPercent / 100);

  const total =
    subtotal + gstAmount;

  return (
    <Document>

      <Page
        size="A4"
        style={styles.page}
      >

        {/* HERO */}

        <View style={styles.hero}>

          <Text style={styles.brand}>
            J U S T T H E R O U T E S
          </Text>

          <Text style={styles.title}>
            Kashmir Journey Proposal
          </Text>

          <Text style={styles.subtitle}>
            PREPARED EXCLUSIVELY FOR
          </Text>

          <Text style={styles.guest}>
            {inquiry?.name ||
              "Guest"}
          </Text>

        </View>

        {/* INFO CARD */}

        <View
          style={styles.infoCard}
        >

          <Text
            style={styles.infoLabel}
          >
            Travel Style
          </Text>

          <Text
            style={styles.infoValue}
          >
            {inquiry?.travel_style ||
              "Curated Kashmir Journey"}
          </Text>

          <Text
            style={styles.infoLabel}
          >
            Duration
          </Text>

          <Text
            style={styles.infoValue}
          >
            {inquiry?.total_days ||
              inquiry?.custom_trip_days ||
              "5"}{" "}
            Days
          </Text>

          <Text
            style={styles.infoLabel}
          >
            Guests
          </Text>

          <Text
            style={styles.infoValue}
          >
            {inquiry?.travellers ||
              "Private Group"}
          </Text>

          <Text
            style={styles.infoLabel}
          >
            Vehicle
          </Text>

          <Text
            style={styles.infoValue}
          >
            {inquiry?.cab_preference ||
              "Private Chauffeur Vehicle"}
          </Text>

        </View>

        {/* COST BREAKDOWN */}

        <Text
          style={styles.sectionTitle}
        >
          Journey Investment
        </Text>

        <View style={styles.table}>

          <View style={styles.row}>

            <View
              style={styles.rowLeft}
            >

              <Text
                style={
                  styles.rowTitle
                }
              >
                Hotel & Stay
              </Text>

              <Text
                style={
                  styles.rowSub
                }
              >
                Curated stays,
                hotels, resorts &
                overnight
                experiences
              </Text>

            </View>

            <Text
              style={
                styles.rowAmount
              }
            >
              ₹
              {hotel.toLocaleString(
                "en-IN"
              )}
            </Text>

          </View>

          <View style={styles.row}>

            <View
              style={styles.rowLeft}
            >

              <Text
                style={
                  styles.rowTitle
                }
              >
                Transportation
              </Text>

              <Text
                style={
                  styles.rowSub
                }
              >
                Private vehicle,
                transfers,
                sightseeing &
                chauffeur service
              </Text>

            </View>

            <Text
              style={
                styles.rowAmount
              }
            >
              ₹
              {transport.toLocaleString(
                "en-IN"
              )}
            </Text>

          </View>

          <View style={styles.row}>

            <View
              style={styles.rowLeft}
            >

              <Text
                style={
                  styles.rowTitle
                }
              >
                Experiences &
                Activities
              </Text>

              <Text
                style={
                  styles.rowSub
                }
              >
                Local experiences,
                curated activities &
                leisure inclusions
              </Text>

            </View>

            <Text
              style={
                styles.rowAmount
              }
            >
              ₹
              {activities.toLocaleString(
                "en-IN"
              )}
            </Text>

          </View>

          <View style={styles.row}>

            <View
              style={styles.rowLeft}
            >

              <Text
                style={
                  styles.rowTitle
                }
              >
                Service &
                Planning
              </Text>

              <Text
                style={
                  styles.rowSub
                }
              >
                Planning support,
                coordination &
                travel assistance
              </Text>

            </View>

            <Text
              style={
                styles.rowAmount
              }
            >
              ₹
              {markup.toLocaleString(
                "en-IN"
              )}
            </Text>

          </View>

        </View>

        {/* TOTAL */}

        <View
          style={styles.totalBox}
        >

          <Text
            style={
              styles.totalLabel
            }
          >
            Total Investment
          </Text>

          <Text
            style={
              styles.totalAmount
            }
          >
            ₹
            {total.toLocaleString(
              "en-IN"
            )}
          </Text>

          <Text
            style={styles.gstText}
          >

            Includes GST @
            {gstPercent}%{"\n"}

            Final pricing may vary
            depending upon travel
            season, availability &
            customisations.

          </Text>

        </View>

        {/* INCLUSIONS */}

        <View
          style={
            styles.inclusionBox
          }
        >

          <Text
            style={
              styles.inclusionTitle
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

            ✔ Traditional Welcome
            Kahwa{"\n"}

            ✔ Dedicated Travel
            Assistance{"\n"}

            ✔ Shikara Ride
            (if applicable)
            {"\n"}

            ✔ Curated Local
            Experiences{"\n"}

            ✔ Seamless Arrival &
            Departure Assistance
            {"\n"}

            ✔ Journey Coordination
            Support

          </Text>

        </View>

        {/* TERMS */}

        <View
          style={styles.termsBox}
        >

          <Text
            style={
              styles.termsTitle
            }
          >
            Important Information
          </Text>

          <Text
            style={
              styles.termsText
            }
          >

            • Rates are subject to
            availability at the
            time of confirmation.
            {"\n\n"}

            • Any increase in fuel,
            taxes or entrance fees
            may affect final
            pricing.
            {"\n\n"}

            • Additional activities
            not mentioned in the
            proposal are chargeable.
            {"\n\n"}

            • Early check-in / late
            checkout is subject to
            hotel discretion.
            {"\n\n"}

            • Final itinerary may
            adjust depending on
            weather or operational
            conditions.

          </Text>

        </View>

        <Text style={styles.footer}>
          Curated by
          JustTheRoutes ·
          justtheroutes.com
        </Text>

      </Page>

    </Document>
  );
}

export default function QuotationPDF({
  itinerary,
  inquiry,
  quote,
}: any) {

  return (
    <PDFDownloadLink
      document={
        <QuoteDocument
          itinerary={
            itinerary
          }
          inquiry={
            inquiry
          }
          quote={quote}
        />
      }
      fileName={`${inquiry?.name || "guest"}-quotation.pdf`}
    >

      {({
        loading,
      }) => (

        <button className="bg-black text-white px-8 py-4 rounded-full hover:opacity-90 transition">

          {loading
            ? "Preparing Quote..."
            : "Download Quotation PDF"}

        </button>

      )}

    </PDFDownloadLink>
  );
}