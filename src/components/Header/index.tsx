import { TractianIcon } from '@/components/icons/TractianIcon';
import { companiesService } from '@/services/companiesService';
import { CompanyButton } from './CompanyButton';

export const dynamic = 'force-dynamic';

export async function Header() {
  const companiesList = await companiesService.getAll();

  return (
    <header className="flex h-header items-center justify-between bg-navbar px-4 text-white">
      <TractianIcon />

      <div className="flex gap-2">
        {companiesList.map((company) => (
          <CompanyButton key={company.id} company={company} />
        ))}
      </div>
    </header>
  );
}
