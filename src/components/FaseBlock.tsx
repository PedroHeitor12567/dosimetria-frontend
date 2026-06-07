import React, { CSSProperties } from 'react';

interface Props {
    fase: number;
    title: string;
    children: React.ReactNode;
}

const s: Record<string, CSSProperties> = {
    block: {
        background: 'var(--color-surface)',
        border: '1px solid var(--color-border)',
        borderRadius: 'var(--radius-lg)',
        padding: '1.25rem',
        marginBottom: '1rem',
        boxShadow: 'var(--shadow-sm)',
    },
    header: {
        display: 'flex',
        alignItems: 'center',
        gap: '10px',
        marginBottom: '1.1rem',
    },
    badge: {
        fontSize: '11px',
        fontWeight: 500,
        padding: '3px 10px',
        borderRadius: '20px',
        background: 'var(--color-accent)',
        color: 'var(--color-accent-fg)',
        letterSpacing: '0.02em',
        flexShrink: 0,
    },
    title: {
        fontFamily: 'var(--font-display)',
        fontSize: '15px',
        fontWeight: 500,
        color: 'var(--color-ink)',
    },
};

export function FaseBlock({ fase, title, children }: Props) {
    return (
        <div style={s.block}>
            <div style={s.header}>
                <span style={s.badge}>Fase {fase}</span>
                <span style={s.title}>{title}</span>
            </div>
            {children}
        </div>
    );
}