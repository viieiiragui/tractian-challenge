import type { Location } from '@/entities/Location';
import { httpClient } from '../httpClient';

type CompanyLocationsResponse = Array<Location>;

export async function getCompanyLocations(companyId: string) {
  const { data } = await httpClient.get<CompanyLocationsResponse>(
    `/companies/${companyId}/locations`
  );

  return data;
}
