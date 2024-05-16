import { CompanyNameDisplay } from './components/CompanyNameDisplay';
import { SensorFilterControls } from './components/SensorFilterControls';

export default function Home() {
  return (
    <header className="flex h-9 items-center justify-between">
      <div>
        <strong className="text-xl font-semibold">Ativos</strong>{' '}
        <CompanyNameDisplay />
      </div>

      <SensorFilterControls />
    </header>
  );
}
