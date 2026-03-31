import { useLocalSearchParams } from 'expo-router';
import { View, Text } from 'react-native';

export default function Trilha() {
    const { id } = useLocalSearchParams<{ id: string }>();

    return (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            <Text>Trilha {id}</Text>
        </View>
    );
}
