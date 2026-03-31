import { Drawer } from 'expo-router/drawer';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { Text, View } from 'react-native';
import { CustomDrawerContent } from '../../components/CustomDrawerComponents';
import { COLORS } from '@/constants';

const ExplorarLayout = () => {
    return (
        <GestureHandlerRootView style={{ flex: 1 }}>
            <Drawer drawerContent={(props) => <CustomDrawerContent {...props} />} screenOptions={{
                    drawerStyle: { 
                        width: 240,
                        backgroundColor: COLORS.primary
                     },
                     drawerActiveTintColor: '#fff',
                     drawerInactiveTintColor: '#fff',
                     headerStyle: { backgroundColor: COLORS.primary },
                     headerTintColor: '#fff',
                     headerTitleStyle: { fontWeight: 'bold' },
                     drawerLabelStyle: { 
                        fontSize: 16,
                        color: COLORS.text,
                      }
            }}>
                <Drawer.Screen
                    name="perfil"
                    options={{ 
                        title: 'Perfil',
                        drawerLabel: 'Perfil',
                        drawerIcon: () => null,
                     }}

                />

                <Drawer.Screen
                    name="conquistas"
                    options={{ 
                        title: 'Conquistas',
                        drawerLabel: 'Conquistas',
                        drawerIcon: () => null,
                     }}
                />

                <Drawer.Screen
                    name="historico"
                    options={{ 
                        title: 'Histórico',
                        drawerLabel: 'Histórico',
                        drawerIcon: () => null,
                     }}
                />

                <Drawer.Screen
                    name="sair"
                    options={{ 
                        title: 'Sair',
                        drawerLabel: 'Sair',
                        drawerIcon: () => null,
                     }}
                />
                
            </Drawer>
        </GestureHandlerRootView>
    )
}

export default ExplorarLayout