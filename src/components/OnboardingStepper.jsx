import React, { useState, useEffect } from 'react';
import { useSaveSlots } from '../state/useSaveSlots';
import { WTEOnboarding } from '../onboardingConfig';

export default function OnboardingStepper({ wteId, onDone }) {
  const { current, saveState } = useSaveSlots();

  if (!current) return null;

  const steps = WTEOnboarding[wteId] || [];
  const total = steps.length;
  const doneSoFar = current.setupProgressByWTE?.[wteId] || 0;

  const [choice, setChoice] = useState(
    steps[doneSoFar]?.kind === 'pickMany' ? [] : ''
  );

  useEffect(() => {
    if (doneSoFar >= total) onDone?.();
  }, [doneSoFar, total, onDone]);

  useEffect(() => {
    const html = document.documentElement;
    html.classList.add('overflow-hidden');
    return () => html.classList.remove('overflow-hidden');
  }, []);

  if (doneSoFar >= total) return null;

  const step = steps[doneSoFar];

  const awardBonus = () => {
    const earned = { ...(current.monthlyEarnedByWTE || {}) };
    earned[wteId] = (earned[wteId] || 0) + 50;

    saveState({
      monthlyEarnedByWTE: earned,
      currentPtsBalance: (current.currentPtsBalance || 0) + 50,
    });
  };

  function advance() {
    saveState({
      setupProgressByWTE: {
        ...current.setupProgressByWTE,
        [wteId]: doneSoFar + 1,
      },
    });

    const isLast = doneSoFar + 1 === total;
    if (isLast) awardBonus();

    setChoice(steps[doneSoFar + 1]?.kind === 'pickMany' ? [] : '');
  }

  const disableNext =
    (step.kind === 'pickOne' && !choice) ||
    (step.kind === 'survey' && !choice) ||
    (step.kind === 'pickMany' && step.required && choice.length === 0);

  const externalLinkSurvey =
    step.kind === 'survey' &&
    step.externalLinkIf &&
    step.externalLinkIf.match === choice;

  return (
    <div
      className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center"
      onClick={(e) => {
        if (e.target === e.currentTarget) onDone();
      }}
    >
      <div className="bg-white max-w-md w-full mx-4 rounded-lg p-6 space-y-6 shadow-xl max-h-[90vh] overflow-y-auto">
        <h2 className="text-xl font-bold">{step.title}</h2>

        {step.kind === 'info' && (
          <>
            {step.imageSrc && (
              <img
                src={step.imageSrc}
                alt=""
                className="w-full mb-4 object-contain"
              />
            )}
            <p className="text-sm">{step.body}</p>
          </>
        )}

        {step.kind === 'pickOne' && (
          <div className="space-y-2">
            {step.choices.map((opt) => (
              <label key={opt} className="flex items-center space-x-2">
                <input
                  type="radio"
                  name={`step-${wteId}-${doneSoFar}`}
                  value={opt}
                  checked={choice === opt}
                  onChange={() => setChoice(opt)}
                  className="accent-red-600"
                />
                <span>{opt}</span>
              </label>
            ))}
          </div>
        )}

        {step.kind === 'pickMany' && (
          <div className="space-y-2">
            {step.choices.map((opt) => {
              const checked = choice.includes(opt);
              return (
                <label key={opt} className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    value={opt}
                    checked={checked}
                    onChange={() => {
                      const next = checked
                        ? choice.filter((x) => x !== opt)
                        : [...choice, opt];
                      setChoice(next);
                    }}
                    className="accent-red-600"
                  />
                  <span>{opt}</span>
                </label>
              );
            })}
          </div>
        )}

        {step.kind === 'survey' && (
          <div className="space-y-2">
            <p className="text-sm mb-2">{step.question}</p>
            {step.options.map((opt) => (
              <button
                key={opt}
                onClick={() => setChoice(opt)}
                className={`block w-full text-left px-3 py-2 border rounded ${
                  choice === opt
                    ? 'border-red-600 bg-red-50'
                    : 'border-gray-300'
                }`}
              >
                {opt}
              </button>
            ))}

            {externalLinkSurvey && (
              <div className="text-right pt-2">
                <button
                  onClick={() => {
                    window.open(step.externalLinkIf.url, '_blank');
                    advance();
                    onDone();
                  }}
                  className="px-4 py-2 bg-red-600 text-white rounded inline-flex items-center gap-1"
                >
                  <span>{step.externalLinkIf.label}</span>
                  <span className="text-lg">▶</span>
                </button>
              </div>
            )}
          </div>
        )}

        {step.kind === 'externalLink' && (
          <>
            {step.imageSrc && (
              <img
                src={step.imageSrc}
                alt=""
                className="w-full mb-4 object-contain"
              />
            )}
            <p className="text-sm">{step.body}</p>
            <div className="text-right">
              <button
                onClick={() => {
                  window.open(step.url, '_blank');
                  advance();
                  onDone();
                }}
                className="px-4 py-2 bg-red-600 text-white rounded inline-flex items-center gap-1"
              >
                <span>{step.label}</span>
                <span className="text-lg">▶</span>
              </button>
            </div>
          </>
        )}

        {!['externalLink'].includes(step.kind) && !externalLinkSurvey && (
          <div className="text-right">
            <button
              onClick={advance}
              disabled={disableNext}
              className="px-4 py-2 bg-red-600 text-white rounded disabled:opacity-50"
            >
              {doneSoFar + 1 === total ? 'Finish' : 'Next'}
            </button>
          </div>
        )}
      </div>
    </div>
  );
}