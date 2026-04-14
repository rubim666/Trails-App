import AsyncStorage from "@react-native-async-storage/async-storage";
import { createContext, ReactNode, useCallback, useContext, useEffect, useState } from "react";
 
// AuthContext lida com quem está autenticado, valida usuário
 
// tipagem de dados normalmente é feita quando vai trabalhar com os dados
export interface Usuario {
    id: string;
    nome: string;
    email: string;
    fotoPerfil: string | null;
    trilhasCompletas: number;
    kmTotal: number;
    conquistas: number;
}
 
export interface AuthContextData {
    usuario: Usuario | null;
    logado: boolean;
    carregando: boolean;
    login: (email: string, senha: string) => Promise<{sucesso: boolean, erro?: string}>;
    cadastrar: (nome: string, email: string, senha: string) => Promise<{sucesso: boolean, erro?: string}>;
    logout: () => Promise<void>;
    atualizarFoto: (uri: string) => Promise<void>;
}
 
const CONTAS_MOCK: Array<{email: string; senha: string; usuario: Usuario}> = [
    {
        email: "paulo@email.com",
        senha: "12345",
        usuario: {
            id: "u1",
            nome: "Paulo",
            email: "paulo@email.com",
            fotoPerfil: null,
            trilhasCompletas: 13,
            kmTotal: 82.4,
            conquistas: 3,
        },
    },
    {
        email: "fran@email.com",
        senha: "12345",
        usuario: {
            id: "u2",
            nome: "Francieli",
            email: "fran@email.com",
            fotoPerfil: null,
            trilhasCompletas: 4,
            kmTotal: 37.4,
            conquistas: 1,
        },
    },
];
 
const STORAGE_KEY_USUARIO = "@trailnav:usuario";
const STORAGE_KEY_CONTAS = "@trailnav:contas";
 
// AuthContext está implementando/recebendo a interface AuthContextData (contexto que armazena tudo)
const AuthContext = createContext<AuthContextData>({} as AuthContextData);
 
// children é para indicar que a function vai ser renderizada em outros componentes (?)
export default function AuthProvider({ children }: { children: ReactNode }) {
 
    const [usuario, setUsuario] = useState<Usuario | null>(null);
    const [carregando, setCarregando] = useState(true);
 
    // try catch para tentar restaurar sessão
    useEffect(() => {
 
        async function restaurarSessao() {
            try {
                const json = await AsyncStorage.getItem(STORAGE_KEY_USUARIO);
 
                if (json) setUsuario(JSON.parse(json));
            } catch(e) {
                console.warn("Erro ao restaurar sessão:", e);
            } finally {
                setCarregando(false);
            }
        }
 
        restaurarSessao();
    }, []); // array vazio vai obrigar a primeira execução
 
    async function carregarContas() {
        try {
            const json = await AsyncStorage.getItem(STORAGE_KEY_CONTAS);
 
            // se existir conta, formata em json, se não retorna array vazio
            const extras: typeof CONTAS_MOCK = json ? JSON.parse(json) : [];
            // para retornar contas que já existem e as extras
            return [...CONTAS_MOCK, ...extras];
        } catch {
            return CONTAS_MOCK;
        }
    }
 
    const login = useCallback(async (email: string, senha: string) => {
        const contas = await carregarContas();
        const conta = contas.find(
            (c) => c.email.toLocaleLowerCase() === email.toLocaleLowerCase() && c.senha === senha
        );
 
        if (!conta) {
            return { sucesso: false, erro: "E-mail ou senha incorretos."};
        }
 
        try {
            const fotoSalva = await AsyncStorage.getItem(`@trailnav:foto:${conta.usuario.id}`);
 
            if (fotoSalva) conta.usuario.fotoPerfil = fotoSalva
        } catch {}
 
        await AsyncStorage.setItem(STORAGE_KEY_USUARIO, JSON.stringify(conta.usuario));
        setUsuario(conta.usuario);
        return {sucesso: true};
    }, []);
 
    const cadastrar = useCallback(async (nome: string, email: string, senha: string) => {
        const contas = await carregarContas();
        const jaExiste = contas.some((c) => c.email.toLocaleLowerCase() === c.email.toLocaleLowerCase());
 
        if (jaExiste) return {sucesso: false, erro: "Já existe uma conta com esse email."}
 
        const novoUsuario: Usuario = {
            id: `u${Date.now()}`,
            nome,
            email,
            fotoPerfil: null,
            trilhasCompletas: 0,
            kmTotal: 0,
            conquistas: 0,
        };
 
        const novaConta = {email, senha, usuario: novoUsuario};
 
        const extrasJson = await AsyncStorage.getItem(STORAGE_KEY_CONTAS);
 
        const extras: typeof CONTAS_MOCK = extrasJson ? JSON.parse(extrasJson) : [];
 
        await AsyncStorage.setItem(STORAGE_KEY_CONTAS, JSON.stringify([...extras, novaConta]));
 
        await AsyncStorage.setItem(STORAGE_KEY_USUARIO, JSON.stringify(novoUsuario));
 
        setUsuario(novoUsuario);
 
        return {sucesso: true};
    }, []);
 
    const logout = useCallback(async () => {
        await AsyncStorage.removeItem(STORAGE_KEY_USUARIO);
        setUsuario(null);
    }, []);
 
    const atualizarFoto = useCallback(async (uri: string) => {
        if (!usuario) return;
 
        const atualizado = {...usuario, fotoPerfil: uri};
 
        await AsyncStorage.setItem(`@trailnav:foto${usuario.id}`, uri);
 
        await AsyncStorage.setItem(STORAGE_KEY_USUARIO, JSON.stringify(atualizado));
 
        setUsuario(atualizado);
    }, [usuario]); // precisa passar usuario aqui para nao ter que digitrar qual é o usuário, que é o que aconteceria se passasse usuario como parâmetro lá em cima
 
    return (
        <AuthContext.Provider
            value={{
                usuario,
                logado: !!usuario,
                carregando,
                login,
                cadastrar,
                logout,
                atualizarFoto,
            }}
        >
            {children}
        </AuthContext.Provider>
    );
}
 
export function useAuth() {
    const ctx = useContext(AuthContext);
    if (!ctx) throw new Error("useAuth deve ser usado dentro de um <AuthProvider>");
 
    return ctx;
}