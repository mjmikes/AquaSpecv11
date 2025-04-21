import { View, Text, Image, StyleSheet } from "react-native";

type TankCardProps = {
  imageUri: string;
  tankName: string;
  temperature: number;
  pH: number;
  tds: number;
  lastTested: string;
};

export default function TankCard({
  imageUri,
  tankName,
  temperature,
  pH,
  tds,
  lastTested,
}: TankCardProps) {
  return (
    <View style={styles.card}>
      <Image source={{ uri: imageUri }} style={styles.image} />
      <View style={styles.info}>
        <Text style={styles.tankName}>{tankName}</Text>
        <Text style={styles.paramText}>Temperature: {temperature}°C</Text>
        <Text style={styles.paramText}>pH: {pH}</Text>
        <Text style={styles.paramText}>TDS: {tds} ppm</Text>
        <Text style={styles.lastTested}>Last Tested: {lastTested}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    flexDirection: "row",
    backgroundColor: "#1f2937",
    borderRadius: 12,
    marginBottom: 16,
    overflow: "hidden",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 5,
  },
  image: {
    width: 100,
    height: 100,
    borderRadius: 12,
  },
  info: {
    padding: 12,
    justifyContent: "center",
    flex: 1,
  },
  tankName: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#06b6d4", // cyan-600
    marginBottom: 8,
  },
  paramText: {
    fontSize: 14,
    color: "#f9fafb", // white text
    marginBottom: 4,
  },
  lastTested: {
    fontSize: 12,
    color: "#9ca3af", // gray-400
    marginTop: 8,
  },
});
