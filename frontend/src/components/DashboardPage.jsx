import { useApp } from '../contexts/AppContext';
import { DashboardHeader } from './DashboardHeader';

export function DashboardPage() {
  const { fontSize } = useApp();

  return (
    <div className='flex h-screen w-screen items-center justify-center'>
        <DashboardHeader/>
        {/* <DashboardNav/>
        <DashboardStats/>
        <DashboardActivity/> */}
    </div>
  );
}
