import { View, Text } from "react-native";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { RootStackParamList } from "../../types/navigation";

type Props = NativeStackScreenProps<RootStackParamList, "TankDetail">;

export default function TankDetailScreen({ route }: Props) {
  const { tankId } = route.params || {};

  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <Text>Tank Detail Screen</Text>
      {tankId && <Text>Tank ID: {tankId}</Text>}
    </View>
  );
}
