import React, { CSSProperties, useState } from 'react';
import { AjusteLegal, AjusteFase3, TipoAjuste } from '../types';

type TipoKey = 'agravante' | 'atenuante' | 'aumento' | 'reducao';

const TIPO_STYLES: Record<TipoKey, CSSProperties> = {
    agravante: { background: '#fcebeb', color: '#a32d2d' },
    atenuante: { background: '#eaf3de', color: '#3b6d11' },
    aumento:   { background: '#faeedf', color: '#854f0b' },
    reducao:   { background: '#e1f5ee', color: '#0f6e56' },
};

const s: Record<string, CSSProperties> = {
    list: { display: 'flex', flexDirection: 'column', gap: '6px', marginBottom: '10px' },
    item: {
        display: 'flex',
        alignItems: 'center',
        gap: '8px',
        padding: '8px 10px',
        borderRadius: 'var(--radius-md)',
        border: '1px solid var(--color-border)',
        background: 'var(--color-surface-subtle)',
        fontSize: '13px',
        flexWrap: 'nowrap',
    },
    tipo: {
        fontSize: '10px',
        fontWeight: 500,
        padding: '2px 8px',
        borderRadius: '10px',
        flexShrink: 0,
        letterSpacing: '0.02em',
        whiteSpace: 'nowrap',
    },
    desc: { flex: 1, color: 'var(--color-ink)', minWidth: 0, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' },
    fracao: { fontSize: '12px', color: 'var(--color-ink-muted)', fontVariantNumeric: 'tabular-nums', flexShrink: 0 },
    removeBtn: {
        background: 'none',
        border: 'none',
        cursor: 'pointer',
        color: 'var(--color-ink-faint)',
        padding: '2px',
        display: 'flex',
        borderRadius: '4px',
        flexShrink: 0,
        fontSize: '14px',
        lineHeight: 1,
    },
    addRow: {
        display: 'flex',
        gap: '6px',
        alignItems: 'center',
        flexWrap: 'wrap',
        marginTop: '8px',
    },
    textInput: {
        flex: '1 1 120px',
        minWidth: '100px',
        height: 'var(--field-height)',
        borderRadius: 'var(--radius-md)',
        border: '1px solid var(--color-border-strong)',
        background: 'var(--color-surface)',
        color: 'var(--color-ink)',
        padding: '0 10px',
        fontSize: '13px',
        outline: 'none',
    },
    select: {
        height: 'var(--field-height)',
        borderRadius: 'var(--radius-md)',
        border: '1px solid var(--color-border-strong)',
        background: 'var(--color-surface)',
        color: 'var(--color-ink)',
        padding: '0 8px',
        fontSize: '12px',
        outline: 'none',
        cursor: 'pointer',
        flexShrink: 0,
    },
    numInput: {
        width: '52px',
        height: 'var(--field-height)',
        borderRadius: 'var(--radius-md)',
        border: '1px solid var(--color-border-strong)',
        background: 'var(--color-surface)',
        color: 'var(--color-ink)',
        padding: '0 6px',
        fontSize: '13px',
        textAlign: 'center',
        outline: 'none',
        flexShrink: 0,
    },
    sep: { fontSize: '14px', color: 'var(--color-ink-muted)', flexShrink: 0 },
    addBtn: {
        height: 'var(--field-height)',
        padding: '0 12px',
        borderRadius: 'var(--radius-md)',
        border: '1px solid var(--color-border-strong)',
        background: 'var(--color-surface)',
        color: 'var(--color-ink)',
        fontSize: '13px',
        cursor: 'pointer',
        display: 'flex',
        alignItems: 'center',
        gap: '4px',
        whiteSpace: 'nowrap',
        flexShrink: 0,
    },
};

interface Fase2Props {
    items: AjusteLegal[];
    onChange: (next: AjusteLegal[]) => void;
}

export function AjusteFase2List({ items, onChange }: Fase2Props) {
    const [desc, setDesc] = useState('');
    const [tipo, setTipo] = useState<TipoAjuste>('agravante');

    function add() {
        if (!desc.trim()) return;
        onChange([...items, { tipo, descricao: desc.trim() }]);
        setDesc('');
    }

    function remove(i: number) {
        onChange(items.filter((_, idx) => idx !== i));
    }

    return (
        <>
            <div style={s.list}>
                {items.map((item, i) => (
                    <div key={i} style={s.item}>
                        <span style={{ ...s.tipo, ...TIPO_STYLES[item.tipo] }}>{item.tipo}</span>
                        <span style={s.desc}>{item.descricao}</span>
                        <button style={s.removeBtn} onClick={() => remove(i)} aria-label="Remover">
                            <i className="ti ti-x" />
                        </button>
                    </div>
                ))}
            </div>
            <div style={s.addRow}>
                <input
                    style={s.textInput}
                    type="text"
                    placeholder="Descrição (ex: Reincidência)"
                    value={desc}
                    onChange={(e) => setDesc(e.target.value)}
                    onKeyDown={(e) => e.key === 'Enter' && add()}
                />
                <select style={s.select} value={tipo} onChange={(e) => setTipo(e.target.value as TipoAjuste)}>
                    <option value="agravante">Agravante</option>
                    <option value="atenuante">Atenuante</option>
                </select>
                <button style={s.addBtn} onClick={add}>
                    <i className="ti ti-plus" aria-hidden="true" /> Adicionar
                </button>
            </div>
        </>
    );
}

interface Fase3Props {
    items: AjusteFase3[];
    onChange: (next: AjusteFase3[]) => void;
}

export function AjusteFase3List({ items, onChange }: Fase3Props) {
    const [desc, setDesc] = useState('');
    const [num, setNum] = useState(1);
    const [den, setDen] = useState(3);
    const [aumentar, setAumentar] = useState(true);

    function add() {
        if (!desc.trim()) return;
        onChange([...items, { descricao: desc.trim(), fracao_numerador: num, fracao_denominador: den, aumentar }]);
        setDesc('');
    }

    function remove(i: number) {
        onChange(items.filter((_, idx) => idx !== i));
    }

    return (
        <>
            <div style={s.list}>
                {items.map((item, i) => {
                    const tipoKey: TipoKey = item.aumentar ? 'aumento' : 'reducao';
                    return (
                        <div key={i} style={s.item}>
                            <span style={{ ...s.tipo, ...TIPO_STYLES[tipoKey] }}>{item.aumentar ? 'aumento' : 'redução'}</span>
                            <span style={s.desc}>{item.descricao}</span>
                            <span style={s.fracao}>{item.fracao_numerador}/{item.fracao_denominador}</span>
                            <button style={s.removeBtn} onClick={() => remove(i)} aria-label="Remover">
                                <i className="ti ti-x" />
                            </button>
                        </div>
                    );
                })}
            </div>
            <div style={s.addRow}>
                <input
                    style={s.textInput}
                    type="text"
                    placeholder="Descrição (ex: Tentativa)"
                    value={desc}
                    onChange={(e) => setDesc(e.target.value)}
                    onKeyDown={(e) => e.key === 'Enter' && add()}
                />
                <input style={s.numInput} type="number" min={1} max={10} value={num} onChange={(e) => setNum(Number(e.target.value))} title="Numerador" />
                <span style={s.sep}>/</span>
                <input style={s.numInput} type="number" min={1} max={10} value={den} onChange={(e) => setDen(Number(e.target.value))} title="Denominador" />
                <select style={s.select} value={String(aumentar)} onChange={(e) => setAumentar(e.target.value === 'true')}>
                    <option value="true">Aumentar</option>
                    <option value="false">Reduzir</option>
                </select>
                <button style={s.addBtn} onClick={add}>
                    <i className="ti ti-plus" aria-hidden="true" /> Adicionar
                </button>
            </div>
        </>
    );
}