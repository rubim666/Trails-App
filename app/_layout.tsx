import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { COLORS } from "../constants/index";

const RootLayout = () => {
    return (
        <>
            <Stack
                initialRouteName="index"
                screenOptions={{
                    headerStyle: {backgroundColor: COLORS.primary},
                    headerTintColor: '#fff',
                    headerTitleStyle: {fontWeight: 'bold'},
                    animation: "slide_from_right",
                    headerShown: false,
                }}
            >

                {/* Root screen */}

                <Stack.Screen
                    name="index"
                    options={{
                        headerShown: false,
                    }}
                />

                <Stack.Screen
                    name="abas"
                    options={{
                        headerShown: false,
                    }}
                />

            </Stack>
            <StatusBar style="light" />
        </>
    )
}

export default RootLayout;

