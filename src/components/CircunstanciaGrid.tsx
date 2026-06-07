import React, { CSSProperties } from 'react';
import { CircunstanciaJudicial } from '../types';

interface CircItem {
    value: CircunstanciaJudicial;
    label: string;
}

const CIRCUNSTANCIAS: CircItem[] = [
    { value: 'culpabilidade', label: 'Culpabilidade' },
    { value: 'antecedentes', label: 'Antecedentes' },
    { value: 'conduta_social', label: 'Conduta social' },
    { value: 'personalidade', label: 'Personalidade' },
    { value: 'motivos', label: 'Motivos' },
    { value: 'circunstancias', label: 'Circunstâncias' },
    { value: 'consequencias', label: 'Consequências' },
    { value: 'comportamento_vitima', label: 'Comp. da vítima' },
];

interface Props {
    selected: CircunstanciaJudicial[];
    onChange: (next: CircunstanciaJudicial[]) => void;
}

const s: Record<string, CSSProperties> = {
    label: {
        fontSize: '11px',
        fontWeight: 500,
        letterSpacing: '0.07em',
        textTransform: 'uppercase',
        color: 'var(--color-ink-muted)',
        marginBottom: '10px',
        marginTop: '1rem',
        display: 'block',
    },
    grid: {
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fill, minmax(130px, 1fr))',
        gap: '6px',
    },
    dot: {
        width: 6,
        height: 6,
        borderRadius: '50%',
        background: 'currentColor',
        flexShrink: 0,
    },
};

function chipStyle(active: boolean): CSSProperties {
    return {
        display: 'flex',
        alignItems: 'center',
        gap: '7px',
        padding: '8px 10px',
        borderRadius: 'var(--radius-md)',
        border: `1px solid ${active ? 'var(--color-accent)' : 'var(--color-border)'}`,
        background: active ? 'var(--color-accent)' : 'var(--color-surface-subtle)',
        cursor: 'pointer',
        fontSize: '12px',
        color: active ? 'var(--color-accent-fg)' : 'var(--color-ink-soft)',
        fontWeight: active ? 500 : 400,
        transition: 'all 0.12s ease',
        userSelect: 'none',
        lineHeight: 1.3,
    };
}

export function CircunstanciaGrid({ selected, onChange }: Props) {
    function toggle(val: CircunstanciaJudicial) {
        if (selected.includes(val)) {
            onChange(selected.filter((v) => v !== val));
        } else if (selected.length < 8) {
            onChange([...selected, val]);
        }
    }

    return (
        <>
      <span style={s.label}>
        Circunstâncias desfavoráveis — art. 59 ({selected.length}/8)
      </span>
            <div style={s.grid}>
                {CIRCUNSTANCIAS.map((c) => {
                    const active = selected.includes(c.value);
                    return (
                        <div
                            key={c.value}
                            style={chipStyle(active)}
                            onClick={() => toggle(c.value)}
                            role="checkbox"
                            aria-checked={active}
                            tabIndex={0}
                            onKeyDown={(e) => e.key === 'Enter' && toggle(c.value)}
                        >
                            <span style={s.dot} />
                            {c.label}
                        </div>
                    );
                })}
            </div>
        </>
    );
}