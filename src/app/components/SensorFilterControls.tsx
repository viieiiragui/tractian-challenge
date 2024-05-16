'use client';

import { Button } from '@/components/Button';
import { ExclamationCircleIcon } from '@/components/icons/ExclamationCircleIcon';
import { ThunderboltIcon } from '@/components/icons/ThunderboltIcon';
import { useGlobal } from '@/contexts/GlobalContext';
import { AssetSensorTypeEnum, AssetStatusEnum } from '@/entities/Asset';

const FILTERS = [
  {
    value: AssetSensorTypeEnum.ENERGY,
    label: 'Sensor de Energia',
    icon: (
      <ThunderboltIcon className="transition-colors group-hover:text-white group-data-[selected=yes]:text-white" />
    ),
  },
  {
    value: AssetStatusEnum.ALERT,
    label: 'Crítico',
    icon: (
      <ExclamationCircleIcon className="transition-colors group-hover:text-white group-data-[selected=yes]:text-white" />
    ),
  },
];

export function SensorFilterControls() {
  const { selectedFilter, handleChangeFilter } = useGlobal();

  return (
    <div className="flex gap-2">
      {FILTERS.map((filter) => (
        <Button
          key={filter.value}
          type="button"
          icon={filter.icon}
          onClick={() => handleChangeFilter(filter.value)}
          isSelected={filter.value === selectedFilter}
        >
          {filter.label}
        </Button>
      ))}
    </div>
  );
}
