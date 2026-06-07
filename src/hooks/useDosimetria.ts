import { useState } from 'react';
import { calcularDosimetria } from '../services/api';
import { DosimetriaRequest, DosimetriaResponse } from '../types';

interface UseDosimetriaReturn {
    loading: boolean;
    resultado: DosimetriaResponse | null;
    error: string | null;
    calcular: (payload: DosimetriaRequest) => Promise<void>;
}

export function useDosimetria(): UseDosimetriaReturn {
    const [loading, setLoading] = useState(false);
    const [resultado, setResultado] = useState<DosimetriaResponse | null>(null);
    const [error, setError] = useState<string | null>(null);

    async function calcular(payload: DosimetriaRequest): Promise<void> {
        setLoading(true);
        setError(null);
        setResultado(null);
        try {
            const data = await calcularDosimetria(payload);
            setResultado(data);
        } catch (e) {
            setError(e instanceof Error ? e.message : 'Erro desconhecido.');
        } finally {
            setLoading(false);
        }
    }

    return { loading, resultado, error, calcular };
}