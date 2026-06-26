'use client';

import { useRef } from 'react';
import { useUploadThing } from '../utils/uploadthing';

const translations = {
  fr: {
    label:    'Joindre des photos (optionnel)',
    pick:     'Choisir des photos',
    drag:     'ou glisser-déposer',
    types:    'JPEG, PNG, WEBP, HEIC — max 8 Mo — jusqu\'à 6 fichiers',
    progress: 'Téléversement en cours…',
    attached: 'Photos jointes',
    remove:   'Supprimer',
    error:    'Erreur de téléversement',
  },
  en: {
    label:    'Attach photos (optional)',
    pick:     'Choose photos',
    drag:     'or drag & drop',
    types:    'JPEG, PNG, WEBP, HEIC — max 8 MB — up to 6 files',
    progress: 'Uploading…',
    attached: 'Photos attached',
    remove:   'Remove',
    error:    'Upload error',
  },
};

export default function PhotoUpload({ lang = 'fr', uploadedFiles, onUploadComplete, onUploadError, onUploadBegin, isUploading }) {
  const T = translations[lang] || translations.fr;
  const inputRef = useRef(null);

  const { startUpload } = useUploadThing('projectPhotos', {
    onClientUploadComplete: (res) => {
      const urls = res.map((f) => ({ name: f.name, url: f.ufsUrl || f.url }));
      onUploadComplete(urls);
    },
    onUploadError: (err) => {
      onUploadError(err.message || T.error);
    },
    onUploadBegin: () => {
      onUploadBegin();
    },
  });

  const handleFileChange = (e) => {
    const files = Array.from(e.target.files || []);
    if (files.length === 0) return;
    startUpload(files);
    e.target.value = '';
  };

  const handleDrop = (e) => {
    e.preventDefault();
    const files = Array.from(e.dataTransfer.files).filter((f) =>
      ['image/jpeg', 'image/png', 'image/webp', 'image/heic'].includes(f.type)
    );
    if (files.length === 0) return;
    startUpload(files);
  };

  const handleDragOver = (e) => e.preventDefault();

  return (
    <div className="form-group">
      <label>{T.label}</label>

      {/* Drop zone */}
      {!isUploading && (
        <div
          className="photo-upload"
          onClick={() => inputRef.current?.click()}
          onDrop={handleDrop}
          onDragOver={handleDragOver}
          role="button"
          tabIndex={0}
          onKeyDown={(e) => e.key === 'Enter' && inputRef.current?.click()}
        >
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
            <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
            <polyline points="17 8 12 3 7 8" />
            <line x1="12" y1="3" x2="12" y2="15" />
          </svg>
          <span className="photo-upload__cta">{T.pick}</span>
          <span className="photo-upload__sub">{T.drag}</span>
          <span className="photo-upload__hint">{T.types}</span>
          <input
            ref={inputRef}
            type="file"
            accept="image/jpeg,image/png,image/webp,image/heic"
            multiple
            className="photo-upload__input"
            onChange={handleFileChange}
            aria-label={T.label}
          />
        </div>
      )}

      {/* Progress */}
      {isUploading && (
        <div className="photo-upload photo-upload--uploading">
          <span>{T.progress}</span>
          <div className="photo-upload__progress-track">
            <div className="photo-upload__progress-bar" aria-hidden="true" />
          </div>
        </div>
      )}

      {/* Uploaded file list */}
      {uploadedFiles.length > 0 && (
        <div className="photo-upload__file-list">
          <span className="photo-upload__file-list-label">{T.attached} ({uploadedFiles.length})</span>
          {uploadedFiles.map((file, i) => (
            <div key={i} className="photo-upload__file-item">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
                <path d="M21.44 11.05l-9.19 9.19a6 6 0 0 1-8.49-8.49l9.19-9.19a4 4 0 0 1 5.66 5.66l-9.2 9.19a2 2 0 0 1-2.83-2.83l8.49-8.48" />
              </svg>
              <span className="photo-upload__file-name">{file.name}</span>
              <button
                type="button"
                className="photo-upload__remove"
                aria-label={`${T.remove} ${file.name}`}
                onClick={() => onUploadComplete(uploadedFiles.filter((_, j) => j !== i))}
              >
                ×
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
