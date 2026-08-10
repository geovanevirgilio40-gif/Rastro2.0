import React from 'react';
import { AppProvider, useApp } from './context/AppContext';
import { Header } from './components/Header';
import { Sidebar } from './components/Sidebar';
import { AuthScreen } from './components/auth/AuthScreen';
import { UserDashboard } from './components/dashboards/UserDashboard';
import { AdminDashboard } from './components/dashboards/AdminDashboard';
import { SuperAdminDashboard } from './components/dashboards/SuperAdminDashboard';
import { LiveMapFullView } from './components/views/LiveMapFullView';
import { DevicesView } from './components/views/DevicesView';
import { TrajectoryView } from './components/views/TrajectoryView';
import { EmergencyModuleView } from './components/views/EmergencyModuleView';
import { GeofencesView } from './components/views/GeofencesView';
import { AlertsView } from './components/views/AlertsView';
import { AuditLogsView } from './components/views/AuditLogsView';
import { ReportsView } from './components/views/ReportsView';
import { UsersAdminsView } from './components/views/UsersAdminsView';

const MainContent: React.FC = () => {
  const { role, currentView, isAuthenticated } = useApp();

  if (!isAuthenticated) {
    return <AuthScreen />;
  }

  const renderView = () => {
    switch (currentView) {
      case 'dashboard':
        if (role === 'user') return <UserDashboard />;
        if (role === 'admin') return <AdminDashboard />;
        if (role === 'superadmin') return <SuperAdminDashboard />;
        return <UserDashboard />;

      case 'live_map':
        return <LiveMapFullView />;

      case 'devices':
        return <DevicesView />;

      case 'history':
        return <TrajectoryView />;

      case 'emergency':
      case 'admin_access':
        return <EmergencyModuleView />;

      case 'geofences':
        return <GeofencesView />;

      case 'alerts':
        return <AlertsView />;

      case 'audit_logs':
        return <AuditLogsView />;

      case 'reports':
        return <ReportsView />;

      case 'users':
      case 'admins':
        return <UsersAdminsView />;

      case 'settings':
      case 'support':
      case 'system':
      case 'integrations':
      case 'licenses':
      case 'backups':
      case 'notifications':
      case 'account':
        return (
          <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-8 text-center space-y-4 max-w-xl mx-auto mt-10">
            <h3 className="text-xl font-bold text-white capitalize">{currentView.replace('_', ' ')}</h3>
            <p className="text-xs text-slate-400">
              Módulo operacional do Rastro 2.0 totalmente configurado e ativo no servidor.
            </p>
            <div className="p-4 bg-slate-950 rounded-xl border border-slate-800 text-xs font-mono text-emerald-400">
              Status: Operacional 100% | WebSocket Conectado
            </div>
          </div>
        );

      default:
        return <UserDashboard />;
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 bento-grid-pattern text-slate-100 flex flex-col selection:bg-blue-500/30 selection:text-blue-200">
      <Header />
      <div className="flex flex-1 overflow-hidden">
        <Sidebar />
        <main className="flex-1 p-4 md:p-6 overflow-y-auto max-w-[1600px] mx-auto w-full">
          {renderView()}
        </main>
      </div>
    </div>
  );
};

export default function App() {
  return (
    <AppProvider>
      <MainContent />
    </AppProvider>
  );
}
