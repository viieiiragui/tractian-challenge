'use client';

import { useGlobal } from '@/contexts/GlobalContext';

export function CompanyNameDisplay() {
  const { selectedCompany } = useGlobal();

  if (!selectedCompany) {
    return null;
  }

  return (
    <span className="text-sm text-neutral-400">/ {selectedCompany.name}</span>
  );
}
