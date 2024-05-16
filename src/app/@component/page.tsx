'use client';

import { SensorStatus } from '@/components/SensorStatus';
import { ComponentIcon } from '@/components/icons/ComponentIcon';
import { InboxIcon } from '@/components/icons/InboxIcon';
import { RouterIcon } from '@/components/icons/RouterIcon';
import { SensorIcon } from '@/components/icons/SensorIcon';
import { useGlobal } from '@/contexts/GlobalContext';

export default function Component() {
  const { selectedComponent } = useGlobal();

  const componentResponsible =
    selectedComponent &&
    (selectedComponent.sensorType === 'energy' ? 'Elétrica' : 'Mecânica');

  if (!selectedComponent) {
    return (
      <div className="w-full rounded-sm border">
        <div className="mt-32 flex items-center justify-center gap-2">
          <strong className="text-lg font-semibold">
            Selecione um Componente
          </strong>
          <ComponentIcon className="h-8 w-8 text-blue" />
        </div>
      </div>
    );
  }

  console.log('🚀 ~ selectedComponent:', selectedComponent);

  return (
    <section className="flex h-full w-full flex-col overflow-auto rounded-sm border">
      <div className="flex h-14 items-center gap-2 border-b px-4 py-3">
        <h1 className="text-lg font-semibold">{selectedComponent.name}</h1>
        <SensorStatus
          sensorType={selectedComponent.sensorType}
          status={selectedComponent.status}
        />
      </div>

      <div className="flex-1 divide-y-2 overflow-auto p-6">
        <div className="flex h-fit flex-wrap justify-center gap-6 pb-6 xl:h-56 xl:flex-nowrap">
          <div className="flex h-[200px] w-full max-w-[336px] cursor-pointer select-none flex-col items-center justify-center gap-0.5 rounded border-2 border-dashed border-[#55A6FF] bg-[#F2F8FF]">
            <InboxIcon />
            <strong className="font-semibold text-blue">
              Adicionar imagem do Ativo
            </strong>
          </div>

          <div className="my-auto grid w-full min-w-[336px] grid-rows-2 divide-y">
            <div className="pb-6 text-center xl:text-left">
              <strong className="mb-2 block text-base font-semibold">
                Tipo de Equipamento
              </strong>
              <p className="text-slate-400">Motor Elétrico (Trifásico)</p>
            </div>

            <div className="pt-6 text-center xl:text-left">
              <strong className="mb-2 block text-base font-semibold">
                Responsáveis
              </strong>
              <p className="flex items-center justify-center text-slate-400 xl:justify-normal">
                <span className="mr-2 inline-flex h-6 w-6 items-center justify-center rounded-full bg-blue text-sm leading-none text-white">
                  {componentResponsible!.charAt(0)}
                </span>{' '}
                {componentResponsible}
              </p>
            </div>
          </div>
        </div>

        <div className="mb-6 grid h-fit grid-cols-1 justify-items-center gap-4 pt-6 text-center xl:grid-cols-2 xl:justify-items-start xl:gap-0 xl:text-left">
          <div>
            <strong className="mb-2 block text-base font-semibold">
              Sensor
            </strong>

            <div className="flex items-center gap-2">
              <SensorIcon />
              <span className="text-slate-400">
                {selectedComponent.sensorId}
              </span>
            </div>
          </div>

          <div>
            <strong className="mb-2 block text-base font-semibold">
              Receptor
            </strong>

            <div className="flex items-center gap-2">
              <RouterIcon />
              <span className="text-slate-400">
                {selectedComponent.gatewayId}
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
