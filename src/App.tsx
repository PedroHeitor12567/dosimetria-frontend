import React, { CSSProperties, useRef, useState } from 'react';
import { FaseBlock } from './components/FaseBlock';
import { CircunstanciaGrid } from './components/CircunstanciaGrid';
import { AjusteFase2List, AjusteFase3List } from './components/AjusteList';
import { Resultado } from './components/Resultado';
import { useDosimetria } from './hooks/useDosimetria';
import { AjusteLegal, AjusteFase3, CircunstanciaJudicial } from './types';

const s: Record<string, CSSProperties> = {
  page: {
    minHeight: '100vh',
    background: 'var(--color-surface-raised)',
    padding: '2.5rem var(--page-padding)',
  },
  container: {
    maxWidth: '680px',
    margin: '0 auto',
  },
  header: {
    display: 'flex',
    alignItems: 'flex-end',
    gap: '1rem',
    marginBottom: '2rem',
    paddingBottom: '1.5rem',
    borderBottom: '1px solid var(--color-border)',
  },
  headerIcon: {
    width: '50px',
    height: '50px',
    background: 'var(--color-accent)',
    borderRadius: 'var(--radius-md)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    flexShrink: 0,
  },
  headerIconI: { fontSize: '22px', color: 'var(--color-accent-fg)' },
  h1: {
    fontFamily: 'var(--font-display)',
    fontSize: 'clamp(18px, 4vw, 24px)',
    fontWeight: 600,
    letterSpacing: '-0.3px',
    color: 'var(--color-ink)',
    lineHeight: 1.2,
  },
  sub: {
    fontSize: 'clamp(11px, 2.5vw, 13px)',
    color: 'var(--color-ink-muted)',
    marginTop: '3px',
  },
  fieldRow: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(140px, 1fr))',
    gap: '12px',
    marginBottom: '4px',
  },
  field: { display: 'flex', flexDirection: 'column', gap: '5px' },
  fieldLabel: { fontSize: '12px', color: 'var(--color-ink-muted)' },
  fieldInput: {
    height: 'var(--field-height)',
    borderRadius: 'var(--radius-md)',
    border: '1px solid var(--color-border-strong)',
    background: 'var(--color-surface)',
    color: 'var(--color-ink)',
    padding: '0 10px',
    fontSize: '14px',
    outline: 'none',
    transition: 'border-color 0.15s',
    fontFamily: 'var(--font-body)',
    width: '100%',
  },
  calcBtn: {
    width: '100%',
    height: '46px',
    marginTop: '1.5rem',
    borderRadius: 'var(--radius-md)',
    border: 'none',
    background: 'var(--color-accent)',
    color: 'var(--color-accent-fg)',
    fontSize: '15px',
    fontWeight: 500,
    cursor: 'pointer',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '8px',
    transition: 'opacity 0.15s',
    fontFamily: 'var(--font-body)',
    letterSpacing: '0.01em',
  },
  errorMsg: {
    marginTop: '1rem',
    padding: '10px 14px',
    background: 'var(--color-danger-bg)',
    borderRadius: 'var(--radius-md)',
    fontSize: '13px',
    color: 'var(--color-danger-text)',
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
  },
};

export default function App() {
  const [penaMin, setPenaMin] = useState<number>(6);
  const [penaMax, setPenaMax] = useState<number>(20);
  const [circs, setCircs] = useState<CircunstanciaJudicial[]>([]);
  const [fase2, setFase2] = useState<AjusteLegal[]>([]);
  const [fase3, setFase3] = useState<AjusteFase3[]>([]);
  const { loading, resultado, error, calcular } = useDosimetria();
  const resultadoRef = useRef<HTMLDivElement>(null);

  async function handleCalcular() {
    await calcular({
      pena_minima_anos: penaMin,
      pena_maxima_anos: penaMax,
      circunstancias_desfavoraveis: circs,
      ajustes_fase2: fase2,
      ajustes_fase3: fase3,
    });
    setTimeout(() => resultadoRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' }), 100);
  }

  return (
      <div style={s.page}>
        <div style={s.container}>
          <header style={s.header}>
            <div style={s.headerIcon}>
              <i className="ti ti-scale" style={s.headerIconI} aria-hidden="true" />
            </div>
            <div>
              <h1 style={s.h1}>Dosimetria da Pena</h1>
              <p style={s.sub}>Sistema trifásico — art. 59 do Código Penal Brasileiro</p>
            </div>
          </header>

          <FaseBlock fase={1} title="Pena-base e circunstâncias judiciais">
            <div style={s.fieldRow}>
              <div style={s.field}>
                <label style={s.fieldLabel}>Pena mínima (anos)</label>
                <input
                    style={s.fieldInput}
                    type="number"
                    min={0}
                    step={0.5}
                    value={penaMin}
                    onChange={(e) => setPenaMin(Number(e.target.value))}
                />
              </div>
              <div style={s.field}>
                <label style={s.fieldLabel}>Pena máxima (anos)</label>
                <input
                    style={s.fieldInput}
                    type="number"
                    min={0}
                    step={0.5}
                    value={penaMax}
                    onChange={(e) => setPenaMax(Number(e.target.value))}
                />
              </div>
            </div>
            <CircunstanciaGrid selected={circs} onChange={setCircs} />
          </FaseBlock>

          <FaseBlock fase={2} title="Agravantes e atenuantes">
            <AjusteFase2List items={fase2} onChange={setFase2} />
          </FaseBlock>

          <FaseBlock fase={3} title="Majorantes e minorantes">
            <AjusteFase3List items={fase3} onChange={setFase3} />
          </FaseBlock>

          <button
              style={{ ...s.calcBtn, opacity: loading ? 0.6 : 1, cursor: loading ? 'not-allowed' : 'pointer' }}
              onClick={handleCalcular}
              disabled={loading}
          >
            {loading ? (
                <>
                  <i className="ti ti-loader" style={{ animation: 'spin 0.8s linear infinite' }} aria-hidden="true" />
                  Calculando...
                </>
            ) : (
                <>
                  <i className="ti ti-calculator" aria-hidden="true" />
                  Calcular dosimetria
                </>
            )}
          </button>

          {error && (
              <div style={s.errorMsg} role="alert">
                <i className="ti ti-alert-circle" aria-hidden="true" />
                {error}
              </div>
          )}

          {resultado && (
              <div ref={resultadoRef}>
                <Resultado data={resultado} fase2Items={fase2} fase3Items={fase3} />
              </div>
          )}
        </div>
      </div>
  );
}