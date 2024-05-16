import type { Company } from '@/entities/Company';
import { httpClient } from '../httpClient';

type CompaniesResponse = Array<Company>;

export async function getAll() {
  const { data } = await httpClient.get<CompaniesResponse>('/companies');

  return data.sort((a, b) =>
    a.name.toLowerCase().localeCompare(b.name.toLowerCase())
  );
}
