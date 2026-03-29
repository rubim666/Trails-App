import {
    DrawerContentComponentProps,
    DrawerContentScrollView,
    DrawerItem,
} from '@react-navigation/drawer';
import { router } from 'expo-router';
import { View, Text } from 'react-native';

const ITEMS = [
    { label: 'Perfil', screen: 'perfil' },
    { label: 'Conquistas', screen: 'conquistas' },
    { label: 'Histórico', screen: 'historico' },
    { label: 'Sair', screen: 'sair' },
]

export function CustomDrawerContent(props: DrawerContentComponentProps) {
    const { navigation } = props;

    return (
        <DrawerContentScrollView {...props} contentContainerStyle={{ paddingTop: 0 }}>
            <View style={{ paddingHorizontal: 16, paddingVertical: 20 }}>
                <Text style={{ fontSize: 18, fontWeight: '700' }}>Explorar</Text>
            </View>

            {ITEMS.map((item) => (
                <View key={item.screen}>
                    <DrawerItem
                        label={item.label}
                        onPress={() => {
                            if (item.screen === 'sair') {
                                router.replace('/');
                                return;
                            }
// 
                            navigation.navigate(item.screen as never);
                        }}
                    />
                </View>

                

            ))}
        </DrawerContentScrollView>
    )
}