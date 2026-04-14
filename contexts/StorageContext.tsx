import AsyncStorage from "@react-native-async-storage/async-storage";
import React, { createContext, useCallback, useContext, useEffect, useState } from "react";
import { useAuth } from "./AuthContext";
 
// StorageContext recebe infos do AuthContext
 
interface ProgressoTrilha {
    trilhaId: string;
    completaEm: string;
    tempoMinutos: number;
}
 
interface StorageContextData {
    favoritos: string[]; // vai receber id das trilhas favoitadas
    progresso: ProgressoTrilha[]; // trilhas completadas offline
    carregando: boolean;
    isFavorito: (id: string) => boolean;
    alternarFavorito: (id: string) => Promise<void>;
    salvarProgresso: (trilhaId: string, tempoMinutos: number) => Promise<void>;
    limparDados: () => Promise<void>; // Promise é para ter uma garantia de resposta
}
 
const StorageContext = createContext<StorageContextData>({} as StorageContextData);
 
export function StorageProvider({children}: {children: React.ReactNode}) {
    const { usuario } = useAuth();
 
    const [favoritos, setFavoritos] = useState<string[]>([]);
    const [progresso, setProgresso] = useState<ProgressoTrilha[]>([]);
    const [carregando, setCarregando] = useState(false);
 
    const chaveFavoritos = usuario ? `@trailnav:favoritos:${usuario.id}` : null;
    const chaveProgresso = usuario ? `@trailnav:progress:${usuario.id}` : null;
 
    useEffect(() => {
        if (!usuario) {
            setFavoritos([]);
            setProgresso([]);
            return;
        }

        async function carregar() {
            setCarregando(true);
            try{
                const [favJson, progJson] = await Promise.all([AsyncStorage.getItem(chaveFavoritos!), AsyncStorage.getItem(chaveProgresso!)]);
                setFavoritos(favJson ? JSON.parse(favJson) : []);
                setProgresso(progJson ? JSON.parse(progJson) : []);
            } catch (e) {
                console.warn("Erro ao carregar dados:", e);
            } finally {
                setCarregando(false);
            }
        }

        carregar();
    }, [usuario?.id]);

    const isFavorito = useCallback((id: string) => favoritos.includes(id), [favoritos]);

    const alternarFavorito = useCallback(async (id: string) => {
        if (!chaveFavoritos) return;

        const novosFavoritos = favoritos.includes(id) ? favoritos.filter(fav => fav !== id) : [...favoritos, id];
        setFavoritos(novosFavoritos);
        await AsyncStorage.setItem(chaveFavoritos, JSON.stringify(novosFavoritos));
    }, [chaveFavoritos, favoritos]);

    const salvarProgresso = useCallback(async (trilhaId: string, tempoMinutos: number) => {
        if (!chaveProgresso) return;
    }, [chaveProgresso, progresso]);
}