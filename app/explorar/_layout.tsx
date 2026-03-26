import { Drawer } from 'expo-router/drawer';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { CustomDrawerContent } from '../../components/CustomDrawerComponents';

const ExplorarLayout = () => {
    return (
        <GestureHandlerRootView style={{ flex: 1 }}>
            <Drawer drawerContent={(props) => <CustomDrawerContent {...props} />}>
                <Drawer.Screen
                    name="perfil"
                    options={{ 
                        title: 'Perfil',
                        drawerLabel: 'Perfil',
                        drawerIcon: () => null, // Placeholder for drawer icon
                     }}
                />

                <Drawer.Screen
                    name="conquistas"
                    options={{ 
                        title: 'Conquistas',
                        drawerLabel: 'Conquistas',
                        drawerIcon: () => null, // Placeholder for drawer icon
                     }}
                />

                <Drawer.Screen
                    name="historico"
                    options={{ 
                        title: 'Histórico',
                        drawerLabel: 'Histórico',
                        drawerIcon: () => null, // Placeholder for drawer icon
                     }}
                />

                <Drawer.Screen
                    name="sair"
                    options={{ 
                        title: 'Sair',
                        drawerLabel: 'Sair',
                        drawerIcon: () => null, // Placeholder for drawer icon
                     }}
                />
                
            </Drawer>
        </GestureHandlerRootView>
    )
}