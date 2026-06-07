import { DosimetriaRequest, DosimetriaResponse } from '../types';

const API_URL = 'https://dosimetria-backend.onrender.com';

export async function calcularDosimetria(payload: DosimetriaRequest): Promise<DosimetriaResponse> {
    const response = await fetch(`${API_URL}/dosimetria/calcular`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
    });

    if (!response.ok) {
        const error = await response.json();
        const msg = Array.isArray(error.detail)
            ? error.detail.map((e: { msg: string }) => e.msg).join('; ')
            : String(error.detail);
        throw new Error(msg);
    }

    return response.json();
}