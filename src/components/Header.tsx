import React, { useState, useEffect } from 'react';
import {
  Bell,
  Sun,
  Moon,
  Search,
  Shield,
  ShieldAlert,
  UserCheck,
  CheckCircle2,
  Copy,
  Clock,
  Sparkles,
  Menu,
  LogOut,
  User,
} from 'lucide-react';
import { useApp } from '../context/AppContext';
import { Role } from '../types';

export const Header: React.FC = () => {
  const {
    role,
    setRole,
    theme,
    toggleTheme,
    currentUser,
    notificationsCount,
    searchQuery,
    setSearchQuery,
    emergencyRequests,
    mobileMenuOpen,
    setMobileMenuOpen,
    logout,
  } = useApp();

  const [timeStr, setTimeStr] = useState<string>('');
  const [copiedCode, setCopiedCode] = useState<boolean>(false);
  const [showNotificationsDropdown, setShowNotificationsDropdown] = useState<boolean>(false);

  useEffect(() => {
    const updateClock = () => {
      const now = new Date();
      setTimeStr(
        now.toLocaleDateString('pt-BR', { day: '2-digit', month: 'long', year: 'numeric' }) +
          ' ' +
          now.toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit', second: '2-digit' })
      );
    };
    updateClock();
    const interval = setInterval(updateClock, 1000);
    return () => clearInterval(interval);
  }, []);

  const pendingRequests = emergencyRequests.filter(r => r.status === 'pending');

  return (
    <header className="sticky top-0 z-30 bg-[#0f172a]/95 backdrop-blur-md border-b border-slate-800/80 px-3 sm:px-4 py-2.5 sm:py-3 text-slate-100 flex flex-wrap items-center justify-between gap-2 sm:gap-4">
      {/* Left section: Mobile Hamburger + App Brand & Role Switcher */}
      <div className="flex items-center gap-3">
        {/* Mobile Hamburger Button */}
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="md:hidden p-2 rounded-xl bg-slate-900 border border-slate-800 text-slate-300 hover:text-white transition-colors"
          title="Abrir Menu Principal"
        >
          <Menu className="w-5 h-5 text-emerald-400" />
        </button>

        <div className="flex items-center gap-2.5">
          <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-emerald-600 to-teal-400 flex items-center justify-center shadow-lg shadow-emerald-500/20 text-slate-950 font-black shrink-0">
            <ShieldAlert className="w-5 h-5 text-slate-950" />
          </div>
          <div>
            <div className="flex items-center gap-1.5">
              <span className="font-extrabold text-lg sm:text-xl tracking-tight text-white">Rastro</span>
              <span className="bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 font-bold text-[10px] sm:text-xs px-1.5 py-0.5 rounded">
                2.0
              </span>
            </div>
            <span className="text-[10px] text-slate-400 font-medium tracking-wide block -mt-0.5">
              {role === 'user' && 'Painel do Utilizador'}
              {role === 'admin' && 'Painel do Administrador'}
              {role === 'superadmin' && 'PAINEL SUPER ADMIN'}
            </span>
          </div>
        </div>

        {/* View Mode Switcher Pills */}
        <div className="hidden xl:flex items-center bg-slate-900/90 p-1 rounded-xl border border-slate-800 text-xs font-semibold ml-2">
          <span className="text-[10px] uppercase font-bold text-slate-500 px-2 tracking-wider">Modo:</span>
          <button
            onClick={() => setRole('user')}
            className={`px-2.5 py-1 rounded-lg transition-all flex items-center gap-1.5 ${
              role === 'user'
                ? 'bg-emerald-500 text-slate-950 font-bold shadow-md shadow-emerald-500/20'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            <UserCheck className="w-3.5 h-3.5" />
            Utilizador
          </button>
          <button
            onClick={() => setRole('admin')}
            className={`px-2.5 py-1 rounded-lg transition-all flex items-center gap-1.5 ${
              role === 'admin'
                ? 'bg-blue-500 text-white font-bold shadow-md shadow-blue-500/20'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            <Shield className="w-3.5 h-3.5" />
            Administrador
          </button>
          <button
            onClick={() => setRole('superadmin')}
            className={`px-2.5 py-1 rounded-lg transition-all flex items-center gap-1.5 ${
              role === 'superadmin'
                ? 'bg-purple-600 text-white font-bold shadow-md shadow-purple-600/20'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            <Sparkles className="w-3.5 h-3.5" />
            Super Admin
          </button>
        </div>
      </div>

      {/* Middle: Search input bar */}
      <div className="flex-1 max-w-sm hidden lg:block">
        <div className="relative">
          <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
          <input
            type="text"
            value={searchQuery}
            onChange={e => setSearchQuery(e.target.value)}
            placeholder="Pesquisar ativos, pessoas, códigos..."
            className="w-full bg-slate-900/90 border border-slate-800 rounded-xl pl-9 pr-12 py-1.5 text-xs text-slate-200 placeholder-slate-500 focus:outline-none focus:border-emerald-500 transition-colors"
          />
        </div>
      </div>

      {/* Right controls: Modo Seguro, Clock, Notifications, Theme, User badge, Logout */}
      <div className="flex items-center gap-2 sm:gap-3">
        {role !== 'user' && (
          <div className="hidden sm:flex items-center gap-1.5 bg-emerald-500/10 text-emerald-400 border border-emerald-500/30 px-2.5 py-1 rounded-lg text-xs font-semibold">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            Modo Seguro
          </div>
        )}

        <div className="hidden 2xl:flex items-center gap-1.5 text-xs text-slate-400 font-mono bg-slate-900 px-2.5 py-1 rounded-lg border border-slate-800">
          <Clock className="w-3.5 h-3.5 text-slate-500" />
          <span>{timeStr}</span>
        </div>

        {/* Notifications Dropdown */}
        <div className="relative">
          <button
            onClick={() => setShowNotificationsDropdown(!showNotificationsDropdown)}
            className="relative p-2 rounded-xl bg-slate-900 hover:bg-slate-800 border border-slate-800 text-slate-300 hover:text-white transition-colors"
            title="Notificações"
          >
            <Bell className="w-4 h-4" />
            {notificationsCount > 0 && (
              <span className="absolute -top-1 -right-1 bg-red-500 text-white font-bold text-[10px] w-4 h-4 rounded-full flex items-center justify-center animate-bounce">
                {notificationsCount}
              </span>
            )}
          </button>

          {showNotificationsDropdown && (
            <div className="absolute right-0 mt-2 w-72 sm:w-80 bg-slate-900 border border-slate-800 rounded-xl shadow-2xl p-3 z-50 text-xs">
              <div className="flex items-center justify-between pb-2 mb-2 border-b border-slate-800">
                <span className="font-bold text-white">Notificações e Alertas</span>
                <span className="text-[10px] bg-red-500/20 text-red-400 px-1.5 py-0.5 rounded font-bold">
                  {notificationsCount} pendentes
                </span>
              </div>
              <div className="space-y-2 max-h-60 overflow-y-auto pr-1">
                {pendingRequests.map(req => (
                  <div key={req.id} className="p-2 rounded bg-slate-800/80 border border-amber-500/30 flex flex-col gap-1">
                    <div className="flex items-center justify-between font-bold text-amber-400">
                      <span>Emergência: {req.motivo}</span>
                      <span>{req.timeAgo}</span>
                    </div>
                    <p className="text-slate-300 text-[11px]">
                      {req.userName} solicitou acesso para {req.deviceName}. Código: <code className="text-emerald-400">{req.code}</code>
                    </p>
                  </div>
                ))}
                {pendingRequests.length === 0 && (
                  <p className="text-slate-500 text-center py-4">Sem notificações urgentes pendentes.</p>
                )}
              </div>
            </div>
          )}
        </div>

        {/* Theme Toggle */}
        <button
          onClick={toggleTheme}
          className="p-2 rounded-xl bg-slate-900 hover:bg-slate-800 border border-slate-800 text-slate-300 hover:text-white transition-colors"
          title="Alternar Modo Escuro / Claro"
        >
          {theme === 'dark' ? <Sun className="w-4 h-4 text-amber-400" /> : <Moon className="w-4 h-4 text-slate-400" />}
        </button>

        {/* User Profile Badge & Logout Button */}
        <div className="flex items-center gap-2 pl-2 border-l border-slate-800">
          <img
            src={currentUser.avatar}
            alt={currentUser.name}
            className="w-8 h-8 rounded-full object-cover border border-emerald-500/50 shrink-0"
          />
          <div className="hidden sm:block text-left">
            <span className="block text-xs font-bold text-white leading-tight truncate max-w-[110px]">
              {currentUser.name}
            </span>
            <span className="text-[10px] text-slate-400 block capitalize">
              {currentUser.role === 'superadmin' ? 'Super Admin' : currentUser.role}
            </span>
          </div>

          {/* Logout Button */}
          <button
            onClick={logout}
            className="p-2 rounded-xl bg-slate-900 hover:bg-red-500/20 hover:border-red-500/30 border border-slate-800 text-slate-400 hover:text-red-400 transition-all ml-1"
            title="Sair / Terminar Sessão"
          >
            <LogOut className="w-4 h-4" />
          </button>
        </div>
      </div>
    </header>
  );
};
