import type { Asset } from '@/entities/Asset';
import { httpClient } from '../httpClient';

type CompanyAssetsResponse = Array<Asset>;

export async function getCompanyAssets(companyId: string) {
  const { data } = await httpClient.get<CompanyAssetsResponse>(
    `/companies/${companyId}/assets`
  );

  return data;
}
