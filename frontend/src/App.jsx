
import { AppProvider, useApp } from "./contexts/AppContext";
import { NavBar } from "./components/NavBar";
import { DiscoverPage } from "./components/DiscoverPage";
import { DashboardPage } from "./components/DashboardPage";
import { ComplaintPage } from "./components/ComplaintPage";
import { RegisterPage } from "./components/RegisterPage";

function AppContent() {
  const { currentPage } = useApp();

  const renderPage = () => {
    switch (currentPage) {
      case 'discover':
        return <DiscoverPage />;
      case 'dashboard':
        return <DashboardPage />;
      case 'complaint':
        return <ComplaintPage />;
      case 'register':
        return <RegisterPage />;
      default:
        return <DiscoverPage />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <NavBar />
      {renderPage()}
    </div>
  );
}

function App() {
  return (
    <AppProvider>
      <AppContent />
    </AppProvider>
  );
}

export default App;
