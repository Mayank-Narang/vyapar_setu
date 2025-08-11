import { useApp } from '../contexts/AppContext';
import { DashboardHeader } from './DashboardHeader';
import { DashboardNav } from './DashboardNav';

export function DashboardPage() {
  const { fontSize } = useApp();

  return (
    <div className='flex flex-col mt-25 w-full items-center justify-center my-20'>
        <DashboardHeader/>
        <DashboardNav/>
    </div>
  );
}
