import React, { CSSProperties } from 'react';
import { DosimetriaResponse, AjusteLegal, AjusteFase3 } from '../types';

function mesesParaTexto(meses: number): string {
    const anos = Math.floor(meses / 12);
    const m = meses % 12;
    const partes: string[] = [];
    if (anos > 0) partes.push(`${anos} ano${anos > 1 ? 's' : ''}`);
    if (m > 0) partes.push(`${m} ${m > 1 ? 'meses' : 'mês'}`);
    return partes.join(' e ') || '0 meses';
}

interface TimelineStep {
    label: string;
    pena: string;
    detail: string;
}

interface Props {
    data: DosimetriaResponse;
    fase2Items: AjusteLegal[];
    fase3Items: AjusteFase3[];
}

const s: Record<string, CSSProperties> = {
    wrapper: {
        marginTop: '1.5rem',
        border: '1px solid var(--color-border)',
        borderRadius: 'var(--radius-lg)',
        overflow: 'hidden',
        boxShadow: 'var(--shadow-md)',
        animation: 'fadeUp 0.4s ease forwards',
    },
    header: {
        background: 'var(--color-accent)',
        padding: '1rem 1.25rem',
        display: 'flex',
        alignItems: 'center',
        gap: '10px',
    },
    headerIcon: { color: 'var(--color-accent-fg)', fontSize: '18px' },
    headerTitle: {
        fontFamily: 'var(--font-display)',
        fontSize: '16px',
        color: 'var(--color-accent-fg)',
        fontWeight: 500,
    },
    body: { padding: '1.25rem', background: 'var(--color-surface)' },
    metricsGrid: {
        display: 'grid',
        gridTemplateColumns: 'repeat(3, 1fr)',
        gap: '8px',
        marginBottom: '1.5rem',
    },
    metricCard: {
        background: 'var(--color-surface-subtle)',
        borderRadius: 'var(--radius-md)',
        padding: '10px 12px',
        display: 'flex',
        flexDirection: 'column',
        gap: '4px',
    },
    metricLabel: {
        fontSize: '10px',
        color: 'var(--color-ink-muted)',
        textTransform: 'uppercase',
        letterSpacing: '0.05em',
        fontWeight: 500,
    },
    metricValue: {
        fontSize: '15px',
        fontFamily: 'var(--font-display)',
        fontWeight: 600,
        color: 'var(--color-ink)',
        lineHeight: 1.3,
    },
    timeline: { display: 'flex', flexDirection: 'column' },
    step: { display: 'flex', gap: '14px' },
    stepLeft: { display: 'flex', flexDirection: 'column', alignItems: 'center', width: '28px', flexShrink: 0 },
    dot: {
        width: '28px',
        height: '28px',
        borderRadius: '50%',
        background: 'var(--color-accent)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        color: 'var(--color-accent-fg)',
        fontSize: '11px',
        fontWeight: 500,
        flexShrink: 0,
        zIndex: 1,
    },
    line: { flex: 1, width: '1px', background: 'var(--color-border)', margin: '2px 0' },
    content: { paddingBottom: '20px', flex: 1 },
    stepLabel: {
        fontSize: '11px',
        fontWeight: 500,
        textTransform: 'uppercase',
        letterSpacing: '0.06em',
        color: 'var(--color-ink-muted)',
        marginBottom: '4px',
        paddingTop: '5px',
    },
    stepPena: {
        fontFamily: 'var(--font-display)',
        fontSize: '19px',
        fontWeight: 600,
        color: 'var(--color-ink)',
        marginBottom: '4px',
    },
    stepDetail: { fontSize: '12px', color: 'var(--color-ink-muted)', lineHeight: 1.5 },
    finalCard: {
        marginTop: '1.25rem',
        padding: '1rem 1.25rem',
        background: 'var(--color-surface-subtle)',
        borderRadius: 'var(--radius-md)',
        borderLeft: '3px solid var(--color-accent)',
        display: 'flex',
        alignItems: 'baseline',
        justifyContent: 'space-between',
        flexWrap: 'wrap',
        gap: '8px',
    },
    finalLabel: {
        fontSize: '12px',
        color: 'var(--color-ink-muted)',
        fontWeight: 500,
        textTransform: 'uppercase',
        letterSpacing: '0.06em',
    },
    finalValue: {
        fontFamily: 'var(--font-display)',
        fontSize: '22px',
        fontWeight: 700,
        color: 'var(--color-ink)',
    },
};

export function Resultado({ data, fase2Items, fase3Items }: Props) {
    const steps: TimelineStep[] = [
        {
            label: 'Fase 1 — Pena-base',
            pena: mesesParaTexto(data.pena_base_meses),
            detail:
                data.circunstancias_desfavoraveis.length === 0
                    ? 'Todas as circunstâncias favoráveis — pena fixada no mínimo legal.'
                    : `${data.circunstancias_desfavoraveis.length} circunstância(s) desfavorável(is): ${data.circunstancias_desfavoraveis.join(', ')}.`,
        },
        {
            label: 'Fase 2 — Pena intermediária',
            pena: mesesParaTexto(data.pena_intermediaria_meses),
            detail:
                fase2Items.length === 0
                    ? 'Sem agravantes ou atenuantes — pena-base mantida.'
                    : fase2Items.map((a) => `${a.tipo}: ${a.descricao}`).join(' · '),
        },
        {
            label: 'Fase 3 — Pena definitiva',
            pena: mesesParaTexto(data.pena_definitiva_meses),
            detail:
                fase3Items.length === 0
                    ? 'Sem majorantes ou minorantes — pena intermediária mantida.'
                    : fase3Items.map((a) => `${a.aumentar ? '+' : '-'}${a.fracao_numerador}/${a.fracao_denominador}: ${a.descricao}`).join(' · '),
        },
    ];

    return (
        <div style={s.wrapper}>
            <div style={s.header}>
                <i className="ti ti-gavel" style={s.headerIcon} aria-hidden="true" />
                <span style={s.headerTitle}>Resultado — sistema trifásico</span>
            </div>
            <div style={s.body}>
                <div style={s.metricsGrid}>
                    {[
                        { label: 'Pena-base', meses: data.pena_base_meses },
                        { label: 'Intermediária', meses: data.pena_intermediaria_meses },
                        { label: 'Definitiva', meses: data.pena_definitiva_meses },
                    ].map((m) => (
                        <div key={m.label} style={s.metricCard}>
                            <span style={s.metricLabel}>{m.label}</span>
                            <span style={s.metricValue}>{mesesParaTexto(m.meses)}</span>
                        </div>
                    ))}
                </div>

                <div style={s.timeline}>
                    {steps.map((step, i) => (
                        <div key={i} style={s.step}>
                            <div style={s.stepLeft}>
                                <div style={s.dot}>{i + 1}</div>
                                {i < steps.length - 1 && <div style={s.line} />}
                            </div>
                            <div style={{ ...s.content, ...(i === steps.length - 1 ? { paddingBottom: 0 } : {}) }}>
                                <p style={s.stepLabel}>{step.label}</p>
                                <p style={s.stepPena}>{step.pena}</p>
                                <p style={s.stepDetail}>{step.detail}</p>
                            </div>
                        </div>
                    ))}
                </div>

                <div style={s.finalCard}>
                    <span style={s.finalLabel}>Pena definitiva</span>
                    <span style={s.finalValue}>{data.pena_definitiva_formatada}</span>
                </div>
            </div>
        </div>
    );
}