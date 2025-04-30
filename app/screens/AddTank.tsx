import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  Alert,
  ScrollView,
} from "react-native";
import RNPickerSelect from "react-native-picker-select";
import { supabase } from "@/utils/supabase";
import { router } from "expo-router";
import SpeciesSelector from "@/components/SpeciesSelector";


export default function AddTank() {
  const [name, setName] = useState("");
  const [waterType, setWaterType] = useState("");
  const [volumeGallons, setVolumeGallons] = useState("");
  const [species, setSpecies] = useState<{ name: string; quantity: number }[]>([]);
  const [imageUrl, setImageUrl] = useState("");

  const handleAddTank = async () => {
    // 🔒 Validation
    if (!name || name.length > 25) {
      Alert.alert(
        "Error",
        "Tank name is required and must be under 25 characters."
      );
      return;
    }

    if (
      !["freshwater", "brackish", "saltwater"].includes(waterType.toLowerCase())
    ) {
      Alert.alert("Error", "Please select a valid water type.");
      return;
    }

    const volume = parseInt(volumeGallons);
    if (isNaN(volume) || volume <= 0) {
      Alert.alert("Error", "Volume must be a positive number.");
      return;
    }

    try {
      const { error } = await supabase.from("tanks").insert({
        user_id: "d6f22ec2-7a5d-481d-a3a7-33852902758e", // replace with real auth ID later
        name,
        water_type: waterType,
        volume_gallons: parseInt(volumeGallons),
        species, // already a JSON-compatible array
        image_url: imageUrl || null,
      });


      if (error) throw error;

      Alert.alert("Success", "Tank added!");
      router.back();
    } catch (err) {
      Alert.alert(
        "Error",
        "Please check your species formatting and try again."
      );
      console.error("Add tank error:", err);
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Add New Tank</Text>

      <TextInput
        placeholder="Tank Name"
        placeholderTextColor="#9ca3af"
        style={styles.input}
        value={name}
        onChangeText={setName}
      />

      <RNPickerSelect
        onValueChange={setWaterType}
        value={waterType}
        placeholder={{ label: "Select Water Type", value: "" }}
        items={[
          { label: "Freshwater", value: "freshwater" },
          { label: "Brackish", value: "brackish" },
          { label: "Saltwater", value: "saltwater" },
        ]}
        style={{
          inputIOS: styles.input,
          inputAndroid: styles.input,
          placeholder: { color: "#9ca3af" },
        }}
      />

      <TextInput
        placeholder="Volume in gallons"
        placeholderTextColor="#9ca3af"
        style={styles.input}
        keyboardType="numeric"
        value={volumeGallons}
        onChangeText={setVolumeGallons}
      />

      <SpeciesSelector onSpeciesChange={setSpecies} />

      <TextInput
        placeholder="Image URL (optional)"
        placeholderTextColor="#9ca3af"
        style={styles.input}
        value={imageUrl}
        onChangeText={setImageUrl}
      />

      <TouchableOpacity style={styles.button} onPress={handleAddTank}>
        <Text style={styles.buttonText}>Add Tank</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#111827",
    flexGrow: 1,
    padding: 24,
  },
  title: {
    fontSize: 26,
    fontWeight: "bold",
    color: "#06b6d4",
    marginBottom: 24,
    textAlign: "center",
  },
  input: {
    backgroundColor: "#1f2937",
    color: "#f9fafb",
    padding: 16,
    borderRadius: 8,
    marginBottom: 16,
    borderColor: "#374151",
    borderWidth: 1,
  },
  button: {
    backgroundColor: "#06b6d4",
    paddingVertical: 14,
    borderRadius: 8,
    alignItems: "center",
  },
  buttonText: {
    color: "#ffffff",
    fontSize: 18,
    fontWeight: "bold",
  },
});
