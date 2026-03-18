'use client';

import { useState, useCallback } from 'react';
import { ALLOWED_MIME_TYPES, MAX_FILE_SIZE } from '@openvitals/common';
import { ImportJobRow, ImportJobHeader } from '@/components/health/import-job-row';

export default function UploadsPage() {
  const [dragActive, setDragActive] = useState(false);
  const [files, setFiles] = useState<File[]>([]);
  const [error, setError] = useState('');

  const handleDrag = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === 'dragenter' || e.type === 'dragover') setDragActive(true);
    else if (e.type === 'dragleave') setDragActive(false);
  }, []);

  const validateFile = useCallback((file: File): string | null => {
    if (!(ALLOWED_MIME_TYPES as readonly string[]).includes(file.type)) return `Unsupported file type: ${file.type}`;
    if (file.size > MAX_FILE_SIZE) return `File too large: ${(file.size / 1024 / 1024).toFixed(1)}MB (max 50MB)`;
    return null;
  }, []);

  const handleFiles = useCallback((newFiles: FileList | null) => {
    if (!newFiles) return;
    setError('');
    for (const file of Array.from(newFiles)) {
      const err = validateFile(file);
      if (err) { setError(err); return; }
    }
    setFiles((prev) => [...prev, ...Array.from(newFiles)]);
  }, [validateFile]);

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    handleFiles(e.dataTransfer.files);
  }, [handleFiles]);

  return (
    <div>
      <div className="mb-7">
        <h1 className="text-[26px] font-medium tracking-[-0.025em] text-neutral-900" style={{ fontFamily: 'var(--font-display)' }}>
          Upload Documents
        </h1>
        <p className="mt-1 text-sm text-neutral-500" style={{ fontFamily: 'var(--font-body)' }}>
          Upload lab reports, health records, or data exports to process and analyze.
        </p>
      </div>

      {error && <div className="mb-4 rounded-lg bg-[var(--color-health-critical-bg)] border border-[var(--color-health-critical-border)] p-3 text-sm text-[var(--color-health-critical)]">{error}</div>}

      <div
        onDragEnter={handleDrag} onDragLeave={handleDrag} onDragOver={handleDrag} onDrop={handleDrop}
        className={`rounded-xl border-2 border-dashed bg-white p-12 text-center transition-colors ${dragActive ? 'border-accent-500 bg-accent-50' : 'border-neutral-300 hover:border-neutral-400'}`}
      >
        <p className="text-sm font-medium text-neutral-900" style={{ fontFamily: 'var(--font-body)' }}>Drop files here</p>
        <p className="mt-1 text-sm text-neutral-500">or</p>
        <label className="mt-2 inline-block cursor-pointer rounded-lg border border-neutral-200 bg-white px-4 py-2 text-sm font-medium text-neutral-700 hover:bg-neutral-50">
          Browse files
          <input type="file" multiple accept={ALLOWED_MIME_TYPES.join(',')} onChange={(e) => handleFiles(e.target.files)} className="hidden" />
        </label>
        <p className="mt-2 text-[11px] text-neutral-400" style={{ fontFamily: 'var(--font-mono)' }}>PDF, CSV, JPEG, PNG, JSON — up to 50MB</p>
      </div>

      {files.length > 0 && (
        <div className="mt-6">
          <h2 className="text-sm font-medium text-neutral-900 mb-2">Queued files</h2>
          <ul className="divide-y divide-neutral-200 rounded-xl border border-neutral-200 bg-white overflow-hidden">
            {files.map((file, i) => (
              <li key={i} className="flex items-center justify-between px-5 py-3">
                <div>
                  <p className="text-sm font-medium text-neutral-900">{file.name}</p>
                  <p className="text-[11px] text-neutral-400" style={{ fontFamily: 'var(--font-mono)' }}>{file.type} — {(file.size / 1024).toFixed(0)} KB</p>
                </div>
                <button onClick={() => setFiles((p) => p.filter((_, idx) => idx !== i))} className="text-sm text-neutral-500 hover:text-red-600">Remove</button>
              </li>
            ))}
          </ul>
          <button className="mt-4 rounded-lg bg-accent-600 px-6 py-2.5 text-sm font-medium text-white hover:bg-accent-700 transition-colors">
            Upload {files.length} file{files.length > 1 ? 's' : ''}
          </button>
        </div>
      )}

      {/* Recent imports */}
      <div className="mt-10">
        <h2 className="mb-4 text-lg font-medium tracking-[-0.015em] text-neutral-900" style={{ fontFamily: 'var(--font-display)' }}>
          Recent imports
        </h2>
        <div className="overflow-hidden rounded-xl border border-neutral-200 bg-white">
          <ImportJobHeader />
          <ImportJobRow fileName="quest_labs_mar2026.pdf" status="completed" docType="Lab report" confidence="0.96" extractions="18" time="2 min ago" />
          <ImportJobRow fileName="physical_notes.pdf" status="parsing" docType="Encounter note" confidence="0.84" extractions="—" time="Just now" />
          <ImportJobRow fileName="dental_xray_summary.pdf" status="review_needed" docType="Dental record" confidence="0.62" extractions="7" time="5 min ago" />
        </div>
      </div>
    </div>
  );
}
