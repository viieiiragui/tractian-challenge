'use client';

import { useGlobal } from '@/contexts/GlobalContext';
import type { Company } from '@/entities/Company';
import { Button } from '../Button';
import { GoldIcon } from '../icons/GoldIcon';

interface CompanyButtonProps {
  company: Company;
}

export function CompanyButton({ company }: CompanyButtonProps) {
  const { selectedCompany, handleChangeCompany } = useGlobal();

  return (
    <Button
      className="bg-blue-dark text-white"
      type="button"
      variant="small"
      noBorder
      icon={<GoldIcon />}
      onClick={() => handleChangeCompany(company)}
      isSelected={company.id === selectedCompany?.id}
    >
      {company.name}
    </Button>
  );
}
