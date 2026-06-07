export type TipoAjuste = 'agravante' | 'atenuante';

export type CircunstanciaJudicial =
    | 'culpabilidade'
    | 'antecedentes'
    | 'conduta_social'
    | 'personalidade'
    | 'motivos'
    | 'circunstancias'
    | 'consequencias'
    | 'comportamento_vitima';

export interface AjusteLegal {
    tipo: TipoAjuste;
    descricao: string;
}

export interface AjusteFase3 {
    descricao: string;
    fracao_numerador: number;
    fracao_denominador: number;
    aumentar: boolean;
}

export interface DosimetriaRequest {
    pena_minima_anos: number;
    pena_maxima_anos: number;
    circunstancias_desfavoraveis: CircunstanciaJudicial[];
    ajustes_fase2: AjusteLegal[];
    ajustes_fase3: AjusteFase3[];
}

export interface DosimetriaResponse {
    pena_minima_meses: number;
    pena_maxima_meses: number;
    circunstancias_desfavoraveis: string[];
    pena_base_meses: number;
    pena_intermediaria_meses: number;
    pena_definitiva_meses: number;
    pena_definitiva_anos: number;
    pena_definitiva_formatada: string;
}