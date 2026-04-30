'use client';

import { StepLayout } from '../components/step-layout';
import { StepButtons } from '../components/step-buttons';
import { SearchableChecklist } from '../components/searchable-checklist';

export const medicalHistoryConditions = [
  // Cardiovascular
  { id: 'hypertension', label: 'High blood pressure', category: 'Cardiovascular' },
  { id: 'heart_disease', label: 'Heart disease / CAD', category: 'Cardiovascular' },
  { id: 'high_cholesterol', label: 'High cholesterol', category: 'Cardiovascular' },
  { id: 'atrial_fib', label: 'Atrial fibrillation', category: 'Cardiovascular' },
  { id: 'stroke', label: 'Stroke / TIA', category: 'Cardiovascular' },
  { id: 'blood_clots', label: 'Blood clots / DVT', category: 'Cardiovascular' },
  // Endocrine
  { id: 'diabetes_1', label: 'Type 1 diabetes', category: 'Endocrine' },
  { id: 'diabetes_2', label: 'Type 2 diabetes', category: 'Endocrine' },
  { id: 'prediabetes', label: 'Prediabetes', category: 'Endocrine' },
  { id: 'hypothyroid', label: 'Hypothyroidism', category: 'Endocrine' },
  { id: 'hyperthyroid', label: 'Hyperthyroidism', category: 'Endocrine' },
  { id: 'pcos', label: 'PCOS', category: 'Endocrine' },
  // Respiratory
  { id: 'asthma', label: 'Asthma', category: 'Respiratory' },
  { id: 'copd', label: 'COPD', category: 'Respiratory' },
  { id: 'sleep_apnea', label: 'Sleep apnea', category: 'Respiratory' },
  // Gastrointestinal
  { id: 'gerd', label: 'GERD / acid reflux', category: 'Gastrointestinal' },
  { id: 'ibs', label: 'Irritable bowel syndrome', category: 'Gastrointestinal' },
  { id: 'crohns', label: "Crohn's disease", category: 'Gastrointestinal' },
  { id: 'celiac', label: 'Celiac disease', category: 'Gastrointestinal' },
  { id: 'liver_disease', label: 'Liver disease', category: 'Gastrointestinal' },
  // Mental health
  { id: 'depression', label: 'Depression', category: 'Mental Health' },
  { id: 'anxiety', label: 'Anxiety disorder', category: 'Mental Health' },
  { id: 'bipolar', label: 'Bipolar disorder', category: 'Mental Health' },
  { id: 'adhd', label: 'ADHD', category: 'Mental Health' },
  { id: 'ptsd', label: 'PTSD', category: 'Mental Health' },
  // Other
  { id: 'arthritis', label: 'Arthritis', category: 'Musculoskeletal' },
  { id: 'osteoporosis', label: 'Osteoporosis', category: 'Musculoskeletal' },
  { id: 'migraines', label: 'Migraines', category: 'Neurological' },
  { id: 'epilepsy', label: 'Epilepsy', category: 'Neurological' },
  { id: 'kidney_disease', label: 'Kidney disease', category: 'Other' },
  { id: 'anemia', label: 'Anemia', category: 'Other' },
  { id: 'cancer', label: 'Cancer (any type)', category: 'Other' },
  { id: 'autoimmune', label: 'Autoimmune condition', category: 'Other' },
];

interface MedicalHistoryData {
  conditions: string[];
}

interface MedicalHistoryStepProps {
  data: MedicalHistoryData;
  onChange: (data: MedicalHistoryData) => void;
  onNext: () => void;
  onBack: () => void;
  onSkip: () => void;
  direction: 1 | -1;
}

export function MedicalHistoryStep({ data, onChange, onNext, onBack, onSkip, direction }: MedicalHistoryStepProps) {
  const toggle = (id: string) => {
    const next = data.conditions.includes(id)
      ? data.conditions.filter((c) => c !== id)
      : [...data.conditions, id];
    onChange({ conditions: next });
  };

  return (
    <StepLayout
      stepKey="medical-history"
      direction={direction}
      title="Medical history"
      subtitle="Select any conditions you've been diagnosed with, past or present."
      why="Why? Knowing your conditions helps us surface relevant lab insights and flag interactions."
      wide
      footer={
        <StepButtons
          onNext={onNext}
          onBack={onBack}
          onSkip={onSkip}
          showSkip
        />
      }
    >
      <SearchableChecklist
        items={medicalHistoryConditions}
        selected={data.conditions}
        onToggle={toggle}
        placeholder="Search conditions..."
        maxHeight="360px"
      />
    </StepLayout>
  );
}

export type { MedicalHistoryData };
