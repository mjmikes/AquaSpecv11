import React, { useState, useEffect } from "react";
import { ScrollView, View, StyleSheet, Text, Alert } from "react-native";
import { supabase } from "../../utils/supabase"; // Import the Supabase client
import TankCard from "@/components/TankCard"; // Your TankCard component

export default function HomeScreen() {
  const [tanks, setTanks] = useState<any[]>([]); // State to hold the tank data

  useEffect(() => {
    const getTanksWithReadings = async () => {
      try {
        // Fetch tanks from the 'tanks' table
        const { data: tanksData, error: tanksError } = await supabase
          .from("tanks")
          .select("id, name, image_url"); // Fetch basic tank info

        if (tanksError) {
          console.error("Error fetching tanks:", tanksError.message);
          return;
        }

        if (tanksData && tanksData.length > 0) {
          // Fetch the most recent sensor readings for each tank
          const tanksWithReadings = await Promise.all(
            tanksData.map(async (tank) => {
              const { data: readings, error: readingsError } = await supabase
                .from("sensor_readings")
                .select("temperature, ph, tds, recorded_at")
                .eq("tank_id", tank.id)
                .order("recorded_at", { ascending: false }) // Order by latest recorded_at
                .limit(1); // Get the most recent reading

              if (readingsError) {
                console.error(
                  `Error fetching readings for tank ${tank.id}:`,
                  readingsError.message
                );
              }

              return {
                ...tank,
                sensor_readings: readings ? readings[0] : null, // Add the latest readings
              };
            })
          );

          setTanks(tanksWithReadings); // Update state with merged data
        }
      } catch (error) {
        console.error("Unexpected error fetching tanks with readings:", error);
        Alert.alert(
          "Error",
          "An unexpected error occurred while fetching data."
        );
      }
    };

    getTanksWithReadings(); // Fetch data when the component mounts
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Your Tanks</Text>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        {tanks.map((tank) => (
          <TankCard
            key={tank.id} // Unique key for FlatList optimization
            imageUri={tank.imageUri} // Image URL from Supabase
            tankName={tank.name} // Tank name from Supabase
            temperature={tank.sensor_readings?.temperature || "N/A"} // Temperature from Supabase
            pH={tank.sensor_readings?.ph || "N/A"} // pH from Supabase
            tds={tank.sensor_readings?.tds || "N/A"} // TDS from Supabase
            lastTested={tank.sensor_readings?.recorded_at || "N/A"} // Last tested date from Supabase
          />
        ))}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#111827", // Dark background
    padding: 16,
  },
  title: {
    fontSize: 28,
    color: "#06b6d4", // Cyan color
    fontWeight: "bold",
    marginBottom: 16,
    textAlign: "center",
  },
  scrollContainer: {
    paddingBottom: 32,
  },
});
