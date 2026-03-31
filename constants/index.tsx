import AnimatedGlow, { type PresetConfig } from 'react-native-animated-glow';

// export const COLORS = {}

const COLORS = {
    subtitle: '#555',
    primary: '#84B179',
    secondary: '#A2CB8B',
    tertiary: '#C7EABB',
    quaternary: '#E8F5BD',
    forest: '#2D5016',
    surface: '#F7FFF0',
    white: '#FFFFFF',
    text: '#1A2E0E',
    textMuted: '#6B7F5E',
}

const PRESETS_GLOW: PresetConfig = {
    metadata: {
        textColor: '#FFFFFF', 
        category: 'Custom',
        tags: ['interactive'],
        name: 'Preset', 
    },
    states: [
        {
            name: 'default',
            preset: {
                cornerRadius: 50,
                outlineWidth: 2,
                borderColor: '#E0FFFF',
                glowLayers: [
                  { colors: ['#cdff42', '#4C5C2D', '#84B179'], opacity: 0.5, glowSize: 10 },
                ]
            }
        }
    ]

}

const SHADOWS = {
    card: {
        shadowColor: '#2D5016',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.15,
        shadowRadius: 12,
        elevation: 6,
    },
    sm: {
        shadowColor: '#2D5016',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.10,
        shadowRadius: 6,
        elevation: 3,
    },
}

const USUARIO = {
    trilhasConcluidas: 3,
    tempoGasto: '17h',
    nivelAtual: 7,
};

const ITEMS = [
    { label: 'Perfil', screen: 'perfil' },
    { label: 'Conquistas', screen: 'conquistas' },
    { label: 'Histórico', screen: 'historico' },
    { label: 'Sair', screen: 'sair' },
]

type Dificuldade = 'Fácil' | 'Média' | 'Difícil'

interface Trilha {
    id: number
    nome: string
    dificuldade: Dificuldade
    distancia: string
    duracao: string
    local: string
    nota: number
    gradientColors: [string, string]
}

const TRILHAS_LISTA: Record<string, Trilha> = {
    "Trilha Guarapari": {
        id: 1,
        nome: "Trilha de Guarapari",
        dificuldade: 'Fácil',
        distancia: '4.2 km',
        duracao: '1h 30min',
        local: 'Guarapari, ES',
        nota: 4.7,
        gradientColors: ['#2D5016', '#84B179'],
    },
    "Trilha Guarujá": {
        id: 2,
        nome: "Trilha de Guarujá",
        dificuldade: 'Média',
        distancia: '8.5 km',
        duracao: '3h 00min',
        local: 'Guarujá, SP',
        nota: 4.4,
        gradientColors: ['#1A4A2E', '#5A9E6F'],
    },
    "Trilha Ubatuba": {
        id: 3,
        nome: "Trilha de Ubatuba",
        dificuldade: 'Difícil',
        distancia: '14.0 km',
        duracao: '5h 30min',
        local: 'Ubatuba, SP',
        nota: 4.9,
        gradientColors: ['#0D2C07', '#3D7A2A'],
    },
}

// test

export { COLORS, SHADOWS, TRILHAS_LISTA, PRESETS_GLOW, USUARIO, ITEMS }
export type { Trilha, Dificuldade }