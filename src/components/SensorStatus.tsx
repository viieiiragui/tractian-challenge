import { AssetSensorTypeEnum, AssetStatusEnum } from '@/entities/Asset';
import { cn } from '@/utils/cn';
import { LightningIcon } from './icons/LightningIcon';

interface SensorStatusProps {
  sensorType: AssetSensorTypeEnum | null;
  status: AssetStatusEnum | null;
}

export function SensorStatus({ sensorType, status }: SensorStatusProps) {
  const isAlertStatus = status === AssetStatusEnum.ALERT;

  if (sensorType === AssetSensorTypeEnum.ENERGY) {
    return <LightningIcon className={cn(isAlertStatus && 'text-red-500')} />;
  }

  return (
    <span
      className={cn(
        'h-2 w-2 rounded-full bg-green',
        isAlertStatus && 'bg-red-500'
      )}
    />
  );
}
