import { router } from "expo-router";
import { View, Text, Button, StyleSheet } from  "react-native";

export default function Inicio() {
    return(
        <View>
            <Text>Início</Text>
            <Button title="Ir para Sobre" onPress={() => router.push("/sobre")} />
            <Button title="Produto 1" onPress={() => router.push("/produto/1")} /> {/* A navegação pode ser feita por caminhos, passando parâmetros, nesse caso por ser dinâmico o id é diferente */}
            <Button title="Produto 2" onPress={() => router.push("/produto/2")} />
        </View>
    )
}

// text strings must be rendered within a <Text> component