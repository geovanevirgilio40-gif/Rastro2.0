import React, { useState } from 'react';
import {
  LayoutDashboard,
  MapPin,
  Smartphone,
  History,
  Bell,
  Radio,
  FileText,
  Settings,
  HelpCircle,
  User,
  Users,
  Shield,
  ShieldAlert,
  Clock,
  KeyRound,
  Copy,
  Check,
  Server,
  Layers,
  Database,
  LogOut,
  ChevronDown,
  X,
  Sparkles,
} from 'lucide-react';
import { useApp } from '../context/AppContext';

export const Sidebar: React.FC = () => {
  const {
    role,
    setRole,
    currentView,
    setCurrentView,
    currentUser,
    emergencyRequests,
    alerts,
    mobileMenuOpen,
    setMobileMenuOpen,
    logout,
  } = useApp();

  const [copied, setCopied] = useState<boolean>(false);

  const handleCopyCode = () => {
    navigator.clipboard.writeText(currentUser.emergencyCode);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleNav = (view: string) => {
    setCurrentView(view);
    setMobileMenuOpen(false);
  };

  const pendingCount = emergencyRequests.filter(r => r.status === 'pending').length;
  const unreadAlertsCount = alerts.filter(a => !a.read).length;

  // Inner content of the sidebar
  const sidebarContent = (
    <div className="flex flex-col justify-between h-full space-y-6">
      <div className="space-y-5">
        {/* Mobile Header Close */}
        <div className="flex items-center justify-between md:hidden pb-3 border-b border-slate-800">
          <div className="flex items-center gap-2">
            <ShieldAlert className="w-5 h-5 text-emerald-400" />
            <span className="font-extrabold text-white text-base">Menu Rastro 2.0</span>
          </div>
          <button
            onClick={() => setMobileMenuOpen(false)}
            className="p-1.5 rounded-lg bg-slate-900 border border-slate-800 text-slate-400 hover:text-white"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Profile Card Header */}
        <div className="p-3 bg-slate-900/90 rounded-2xl border border-slate-800/80 flex items-center justify-between gap-3 shadow-sm">
          <div className="flex items-center gap-3 overflow-hidden">
            <img
              src={currentUser.avatar}
              alt={currentUser.name}
              className="w-10 h-10 rounded-xl object-cover border border-emerald-500/50 shrink-0"
            />
            <div className="overflow-hidden">
              <h4 className="text-xs font-bold text-white truncate">{currentUser.name}</h4>
              <span className="text-[10px] text-slate-400 truncate block">{currentUser.email}</span>
              <span className="inline-block mt-0.5 bg-emerald-500/10 text-emerald-400 border border-emerald-500/30 text-[9px] font-extrabold px-1.5 py-0.2 rounded-full">
                {currentUser.plan}
              </span>
            </div>
          </div>

          <button
            onClick={logout}
            className="p-2 rounded-xl bg-slate-950 hover:bg-red-500/20 hover:border-red-500/30 border border-slate-800 text-slate-400 hover:text-red-400 transition-all shrink-0"
            title="Sair da Conta"
          >
            <LogOut className="w-4 h-4" />
          </button>
        </div>

        {/* Mobile Quick Role Selector */}
        <div className="md:hidden bg-slate-900/90 p-2 rounded-xl border border-slate-800 text-xs font-semibold space-y-1.5">
          <span className="text-[10px] uppercase font-bold text-slate-500 px-1 tracking-wider block">
            Alternar Perfil:
          </span>
          <div className="grid grid-cols-3 gap-1">
            <button
              onClick={() => {
                setRole('user');
                setMobileMenuOpen(false);
              }}
              className={`p-1.5 rounded-lg text-center text-[10px] font-bold transition-all ${
                role === 'user' ? 'bg-emerald-500 text-slate-950' : 'text-slate-400 bg-slate-950'
              }`}
            >
              Utilizador
            </button>
            <button
              onClick={() => {
                setRole('admin');
                setMobileMenuOpen(false);
              }}
              className={`p-1.5 rounded-lg text-center text-[10px] font-bold transition-all ${
                role === 'admin' ? 'bg-blue-500 text-white' : 'text-slate-400 bg-slate-950'
              }`}
            >
              Admin
            </button>
            <button
              onClick={() => {
                setRole('superadmin');
                setMobileMenuOpen(false);
              }}
              className={`p-1.5 rounded-lg text-center text-[10px] font-bold transition-all ${
                role === 'superadmin' ? 'bg-purple-600 text-white' : 'text-slate-400 bg-slate-950'
              }`}
            >
              Super Admin
            </button>
          </div>
        </div>

        {/* Main Nav Links */}
        <nav className="space-y-1">
          {role === 'user' && (
            <>
              <button
                onClick={() => handleNav('dashboard')}
                className={`w-full flex items-center justify-between px-3 py-2.5 rounded-xl text-xs font-semibold transition-all ${
                  currentView === 'dashboard'
                    ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/30'
                    : 'text-slate-400 hover:text-slate-200 hover:bg-slate-900/60'
                }`}
              >
                <div className="flex items-center gap-3">
                  <LayoutDashboard className="w-4 h-4" />
                  <span>Dashboard</span>
                </div>
              </button>

              <button
                onClick={() => handleNav('live_map')}
                className={`w-full flex items-center justify-between px-3 py-2.5 rounded-xl text-xs font-semibold transition-all ${
                  currentView === 'live_map'
                    ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/30'
                    : 'text-slate-400 hover:text-slate-200 hover:bg-slate-900/60'
                }`}
              >
                <div className="flex items-center gap-3">
                  <MapPin className="w-4 h-4" />
                  <span>Mapa em Tempo Real</span>
                </div>
              </button>

              <button
                onClick={() => handleNav('devices')}
                className={`w-full flex items-center justify-between px-3 py-2.5 rounded-xl text-xs font-semibold transition-all ${
                  currentView === 'devices'
                    ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/30'
                    : 'text-slate-400 hover:text-slate-200 hover:bg-slate-900/60'
                }`}
              >
                <div className="flex items-center gap-3">
                  <Smartphone className="w-4 h-4" />
                  <span>Meus Ativos</span>
                </div>
              </button>

              <button
                onClick={() => handleNav('history')}
                className={`w-full flex items-center justify-between px-3 py-2.5 rounded-xl text-xs font-semibold transition-all ${
                  currentView === 'history'
                    ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/30'
                    : 'text-slate-400 hover:text-slate-200 hover:bg-slate-900/60'
                }`}
              >
                <div className="flex items-center gap-3">
                  <History className="w-4 h-4" />
                  <span>Histórico & Trajetórias</span>
                </div>
              </button>

              <button
                onClick={() => handleNav('alerts')}
                className={`w-full flex items-center justify-between px-3 py-2.5 rounded-xl text-xs font-semibold transition-all ${
                  currentView === 'alerts'
                    ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/30'
                    : 'text-slate-400 hover:text-slate-200 hover:bg-slate-900/60'
                }`}
              >
                <div className="flex items-center gap-3">
                  <Bell className="w-4 h-4" />
                  <span>Central de Alertas</span>
                </div>
                {unreadAlertsCount > 0 && (
                  <span className="bg-amber-500 text-slate-950 font-bold text-[10px] px-1.5 py-0.2 rounded-full">
                    {unreadAlertsCount}
                  </span>
                )}
              </button>

              <button
                onClick={() => handleNav('geofences')}
                className={`w-full flex items-center justify-between px-3 py-2.5 rounded-xl text-xs font-semibold transition-all ${
                  currentView === 'geofences'
                    ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/30'
                    : 'text-slate-400 hover:text-slate-200 hover:bg-slate-900/60'
                }`}
              >
                <div className="flex items-center gap-3">
                  <Radio className="w-4 h-4" />
                  <span>Cercas Geográficas</span>
                </div>
              </button>

              <button
                onClick={() => handleNav('emergency')}
                className={`w-full flex items-center justify-between px-3 py-2.5 rounded-xl text-xs font-semibold transition-all ${
                  currentView === 'emergency'
                    ? 'bg-red-500/10 text-red-400 border border-red-500/30'
                    : 'text-slate-400 hover:text-slate-200 hover:bg-slate-900/60'
                }`}
              >
                <div className="flex items-center gap-3">
                  <ShieldAlert className="w-4 h-4 text-red-400" />
                  <span>Acesso de Emergência</span>
                </div>
              </button>
            </>
          )}

          {role === 'admin' && (
            <>
              <button
                onClick={() => handleNav('dashboard')}
                className={`w-full flex items-center justify-between px-3 py-2.5 rounded-xl text-xs font-semibold transition-all ${
                  currentView === 'dashboard'
                    ? 'bg-blue-500/10 text-blue-400 border border-blue-500/30'
                    : 'text-slate-400 hover:text-slate-200 hover:bg-slate-900/60'
                }`}
              >
                <div className="flex items-center gap-3">
                  <LayoutDashboard className="w-4 h-4" />
                  <span>Painel do Administrador</span>
                </div>
              </button>

              <button
                onClick={() => handleNav('live_map')}
                className={`w-full flex items-center justify-between px-3 py-2.5 rounded-xl text-xs font-semibold transition-all ${
                  currentView === 'live_map'
                    ? 'bg-blue-500/10 text-blue-400 border border-blue-500/30'
                    : 'text-slate-400 hover:text-slate-200 hover:bg-slate-900/60'
                }`}
              >
                <div className="flex items-center gap-3">
                  <MapPin className="w-4 h-4" />
                  <span>Mapa Global</span>
                </div>
              </button>

              <button
                onClick={() => handleNav('users')}
                className={`w-full flex items-center justify-between px-3 py-2.5 rounded-xl text-xs font-semibold transition-all ${
                  currentView === 'users'
                    ? 'bg-blue-500/10 text-blue-400 border border-blue-500/30'
                    : 'text-slate-400 hover:text-slate-200 hover:bg-slate-900/60'
                }`}
              >
                <div className="flex items-center gap-3">
                  <Users className="w-4 h-4" />
                  <span>Gestão de Utilizadores</span>
                </div>
              </button>

              <button
                onClick={() => handleNav('devices')}
                className={`w-full flex items-center justify-between px-3 py-2.5 rounded-xl text-xs font-semibold transition-all ${
                  currentView === 'devices'
                    ? 'bg-blue-500/10 text-blue-400 border border-blue-500/30'
                    : 'text-slate-400 hover:text-slate-200 hover:bg-slate-900/60'
                }`}
              >
                <div className="flex items-center gap-3">
                  <Smartphone className="w-4 h-4" />
                  <span>Ativos da Frota</span>
                </div>
              </button>

              <button
                onClick={() => handleNav('emergency')}
                className={`w-full flex items-center justify-between px-3 py-2.5 rounded-xl text-xs font-semibold transition-all ${
                  currentView === 'emergency'
                    ? 'bg-red-500/10 text-red-400 border border-red-500/30'
                    : 'text-slate-400 hover:text-slate-200 hover:bg-slate-900/60'
                }`}
              >
                <div className="flex items-center gap-3">
                  <ShieldAlert className="w-4 h-4 text-red-400" />
                  <span>Pedidos de Emergência</span>
                </div>
                {pendingCount > 0 && (
                  <span className="bg-red-500 text-white font-bold text-[10px] px-1.5 py-0.2 rounded-full">
                    {pendingCount}
                  </span>
                )}
              </button>

              <button
                onClick={() => handleNav('alerts')}
                className={`w-full flex items-center justify-between px-3 py-2.5 rounded-xl text-xs font-semibold transition-all ${
                  currentView === 'alerts'
                    ? 'bg-blue-500/10 text-blue-400 border border-blue-500/30'
                    : 'text-slate-400 hover:text-slate-200 hover:bg-slate-900/60'
                }`}
              >
                <div className="flex items-center gap-3">
                  <Bell className="w-4 h-4" />
                  <span>Central de Alertas</span>
                </div>
              </button>

              <button
                onClick={() => handleNav('reports')}
                className={`w-full flex items-center justify-between px-3 py-2.5 rounded-xl text-xs font-semibold transition-all ${
                  currentView === 'reports'
                    ? 'bg-blue-500/10 text-blue-400 border border-blue-500/30'
                    : 'text-slate-400 hover:text-slate-200 hover:bg-slate-900/60'
                }`}
              >
                <div className="flex items-center gap-3">
                  <FileText className="w-4 h-4" />
                  <span>Relatórios & Exportação</span>
                </div>
              </button>
            </>
          )}

          {role === 'superadmin' && (
            <>
              <button
                onClick={() => handleNav('dashboard')}
                className={`w-full flex items-center justify-between px-3 py-2.5 rounded-xl text-xs font-semibold transition-all ${
                  currentView === 'dashboard'
                    ? 'bg-purple-500/10 text-purple-400 border border-purple-500/30'
                    : 'text-slate-400 hover:text-slate-200 hover:bg-slate-900/60'
                }`}
              >
                <div className="flex items-center gap-3">
                  <LayoutDashboard className="w-4 h-4" />
                  <span>Painel Super Admin</span>
                </div>
              </button>

              <button
                onClick={() => handleNav('live_map')}
                className={`w-full flex items-center justify-between px-3 py-2.5 rounded-xl text-xs font-semibold transition-all ${
                  currentView === 'live_map'
                    ? 'bg-purple-500/10 text-purple-400 border border-purple-500/30'
                    : 'text-slate-400 hover:text-slate-200 hover:bg-slate-900/60'
                }`}
              >
                <div className="flex items-center gap-3">
                  <MapPin className="w-4 h-4" />
                  <span>Mapa de Frota Global</span>
                </div>
              </button>

              <button
                onClick={() => handleNav('users')}
                className={`w-full flex items-center justify-between px-3 py-2.5 rounded-xl text-xs font-semibold transition-all ${
                  currentView === 'users'
                    ? 'bg-purple-500/10 text-purple-400 border border-purple-500/30'
                    : 'text-slate-400 hover:text-slate-200 hover:bg-slate-900/60'
                }`}
              >
                <div className="flex items-center gap-3">
                  <Users className="w-4 h-4" />
                  <span>Gestão Geral de Contas</span>
                </div>
              </button>

              <button
                onClick={() => handleNav('devices')}
                className={`w-full flex items-center justify-between px-3 py-2.5 rounded-xl text-xs font-semibold transition-all ${
                  currentView === 'devices'
                    ? 'bg-purple-500/10 text-purple-400 border border-purple-500/30'
                    : 'text-slate-400 hover:text-slate-200 hover:bg-slate-900/60'
                }`}
              >
                <div className="flex items-center gap-3">
                  <Smartphone className="w-4 h-4" />
                  <span>Ativos do Sistema</span>
                </div>
              </button>

              <button
                onClick={() => handleNav('emergency')}
                className={`w-full flex items-center justify-between px-3 py-2.5 rounded-xl text-xs font-semibold transition-all ${
                  currentView === 'emergency'
                    ? 'bg-red-500/10 text-red-400 border border-red-500/30'
                    : 'text-slate-400 hover:text-slate-200 hover:bg-slate-900/60'
                }`}
              >
                <div className="flex items-center gap-3">
                  <ShieldAlert className="w-4 h-4 text-red-400" />
                  <span>Chave-Mestra & Emergência</span>
                </div>
                {pendingCount > 0 && (
                  <span className="bg-red-500 text-white font-bold text-[10px] px-1.5 py-0.2 rounded-full">
                    {pendingCount}
                  </span>
                )}
              </button>

              <button
                onClick={() => handleNav('audit_logs')}
                className={`w-full flex items-center justify-between px-3 py-2.5 rounded-xl text-xs font-semibold transition-all ${
                  currentView === 'audit_logs'
                    ? 'bg-purple-500/10 text-purple-400 border border-purple-500/30'
                    : 'text-slate-400 hover:text-slate-200 hover:bg-slate-900/60'
                }`}
              >
                <div className="flex items-center gap-3">
                  <Clock className="w-4 h-4" />
                  <span>Auditoria & Logs</span>
                </div>
              </button>

              <button
                onClick={() => handleNav('reports')}
                className={`w-full flex items-center justify-between px-3 py-2.5 rounded-xl text-xs font-semibold transition-all ${
                  currentView === 'reports'
                    ? 'bg-purple-500/10 text-purple-400 border border-purple-500/30'
                    : 'text-slate-400 hover:text-slate-200 hover:bg-slate-900/60'
                }`}
              >
                <div className="flex items-center gap-3">
                  <FileText className="w-4 h-4" />
                  <span>Relatórios Globais</span>
                </div>
              </button>
            </>
          )}
        </nav>
      </div>

      {/* Bottom Emergency Code Widget */}
      <div className="mt-6 pt-4 border-t border-slate-800/80 space-y-3">
        {role === 'user' && (
          <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-3 text-xs space-y-2">
            <span className="text-[10px] uppercase tracking-wider text-slate-400 font-bold block">
              Código de Emergência
            </span>
            <div className="flex items-center justify-between bg-slate-950 px-3 py-2 rounded-xl border border-emerald-500/30">
              <code className="font-mono text-emerald-400 font-extrabold text-sm tracking-wider">
                {currentUser.emergencyCode}
              </code>
              <button
                onClick={handleCopyCode}
                className="text-slate-400 hover:text-white transition-colors"
                title="Copiar código de emergência"
              >
                {copied ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
              </button>
            </div>
            <p className="text-[10px] text-slate-500 leading-tight">
              Guarde este código em um lugar seguro.
            </p>
          </div>
        )}

        <div className="flex items-center justify-between text-[11px] text-slate-500 px-1 pt-2">
          <span>Versão 2.0.0</span>
          <span className="w-2 h-2 rounded-full bg-emerald-500" title="Servidor WebSocket conectado" />
        </div>
      </div>
    </div>
  );

  return (
    <>
      {/* Desktop Sidebar (hidden on mobile) */}
      <aside className="hidden md:flex w-64 bg-[#0f172a] border-r border-slate-800/80 p-4 flex-col justify-between shrink-0 overflow-y-auto min-h-[calc(100vh-61px)]">
        {sidebarContent}
      </aside>

      {/* Mobile Drawer Overlay */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-50 md:hidden flex">
          {/* Backdrop */}
          <div
            onClick={() => setMobileMenuOpen(false)}
            className="fixed inset-0 bg-slate-950/80 backdrop-blur-sm transition-opacity"
          />

          {/* Sliding Panel */}
          <div className="relative w-72 max-w-[80vw] bg-[#0f172a] border-r border-slate-800 p-4 overflow-y-auto z-10 flex flex-col justify-between shadow-2xl h-full">
            {sidebarContent}
          </div>
        </div>
      )}
    </>
  );
};
