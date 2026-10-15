'use client';

import { useEffect, useState, type FormEvent } from 'react';

interface PriceAlertModalProps {
  open: boolean;
  targetPrice: number | null;
  onClose: () => void;
  onSave: (targetPrice: number) => void;
}

export function PriceAlertModal({ open, targetPrice, onClose, onSave }: PriceAlertModalProps) {
  const [inputValue, setInputValue] = useState('');
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  useEffect(() => {
    if (open) {
      setInputValue(targetPrice === null ? '' : String(targetPrice));
      setErrorMessage(null);
    }
  }, [open, targetPrice]);

  useEffect(() => {
    if (!open) {
      return;
    }

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        onClose();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onClose, open]);

  if (!open) {
    return null;
  }

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const parsedPrice = Number(inputValue);

    if (!inputValue.trim() || !Number.isFinite(parsedPrice) || parsedPrice <= 0) {
      setErrorMessage('Adj meg egy nullánál nagyobb célárat.');
      return;
    }

    onSave(parsedPrice);
    onClose();
  };

  return (
    <div
      className="modal-overlay"
      onMouseDown={(event) => {
        if (event.target === event.currentTarget) {
          onClose();
        }
      }}
    >
      <section
        aria-labelledby="price-alert-title"
        aria-modal="true"
        className="modal-dialog"
        role="dialog"
      >
        <div className="modal-header">
          <div>
            <p className="eyebrow">Árfigyelő</p>
            <h2 id="price-alert-title">Célár beállítása</h2>
          </div>
          <button
            aria-label="Ablak bezárása"
            className="modal-close"
            type="button"
            onClick={onClose}
          >
            ×
          </button>
        </div>

        <form className="modal-form" onSubmit={handleSubmit}>
          <label className="modal-input-label" htmlFor="target-price">
            Értesíts, ha az ár eléri ezt az összeget
            <span className="modal-input-wrapper">
              <input
                aria-describedby={errorMessage ? 'target-price-error' : undefined}
                aria-invalid={errorMessage !== null}
                autoFocus
                id="target-price"
                inputMode="numeric"
                min="1"
                name="targetPrice"
                placeholder="Például 250000"
                required
                step="1"
                type="number"
                value={inputValue}
                onChange={(event) => {
                  setInputValue(event.currentTarget.value);
                  if (errorMessage) {
                    setErrorMessage(null);
                  }
                }}
              />
              <span aria-hidden="true">Ft</span>
            </span>
          </label>

          {errorMessage ? (
            <p className="form-error" id="target-price-error" role="alert">
              {errorMessage}
            </p>
          ) : null}

          <div className="modal-actions">
            <button className="secondary-button" type="button" onClick={onClose}>
              Mégse
            </button>
            <button className="primary-button" type="submit">
              Mentés és értesítés bekapcsolása
            </button>
          </div>
        </form>
      </section>
    </div>
  );
}
