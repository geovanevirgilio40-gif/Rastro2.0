import React from 'react';
import {
  Smartphone,
  Wifi,
  WifiOff,
  Bell,
  ArrowRight,
  Filter,
  Maximize2,
  Car,
  MoreVertical,
  Gauge,
  Clock,
  Compass,
  AlertTriangle,
  Battery,
  ShieldAlert,
  TrendingUp,
} from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { LeafletMap } from '../LeafletMap';

export const UserDashboard: React.FC = () => {
  const { assets, selectedAssetId, setSelectedAssetId, alerts, setCurrentView, currentUser } = useApp();

  const totalAssets = assets.filter(a => a.assignedUserId === currentUser.id || currentUser.role !== 'user').length;
  const onlineAssets = assets.filter(a => (a.assignedUserId === currentUser.id || currentUser.role !== 'user') && a.status === 'online').length;
  const offlineAssets = assets.filter(a => (a.assignedUserId === currentUser.id || currentUser.role !== 'user') && a.status === 'offline').length;
  const activeAlerts = alerts.filter(a => !a.resolved).length;

  const userAssets = assets.filter(a => a.assignedUserId === currentUser.id || currentUser.role !== 'user');

  return (
    <div className="space-y-6 text-slate-100">
      {/* Page Title Header */}
      <div>
        <h1 className="text-2xl font-black text-white tracking-tight">Dashboard</h1>
        <p className="text-xs text-slate-400 mt-1 flex items-center gap-1">
          Bem-vindo de volta, <span className="font-bold text-white">{currentUser.name.split(' ')[0]}</span>! 👋
        </p>
      </div>

      {/* Top 4 Stat Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Card 1: Total de Ativos */}
        <div
          onClick={() => setCurrentView('devices')}
          className="bento-card p-5 shadow-xl hover:border-blue-500/50 cursor-pointer group flex flex-col justify-between"
        >
          <div className="flex items-center justify-between">
            <div className="w-12 h-12 rounded-xl bg-blue-600 flex items-center justify-center text-white shadow-lg shadow-blue-600/30">
              <Smartphone className="w-6 h-6" />
            </div>
            <div className="text-right">
              <span className="text-3xl font-black text-white tracking-tight">{totalAssets}</span>
              <p className="text-xs text-slate-400 font-semibold mt-0.5">Total de Ativos</p>
            </div>
          </div>
          <div className="mt-4 pt-3 border-t border-slate-800/80 flex items-center justify-between text-xs text-blue-400 font-bold group-hover:translate-x-1 transition-transform">
            <span>Ver todos os dispositivos</span>
            <ArrowRight className="w-4 h-4" />
          </div>
        </div>

        {/* Card 2: Online */}
        <div
          onClick={() => setCurrentView('devices')}
          className="bento-card p-5 shadow-xl hover:border-emerald-500/50 cursor-pointer group flex flex-col justify-between"
        >
          <div className="flex items-center justify-between">
            <div className="w-12 h-12 rounded-xl bg-emerald-500 flex items-center justify-center text-slate-950 shadow-lg shadow-emerald-500/30">
              <Wifi className="w-6 h-6" />
            </div>
            <div className="text-right">
              <span className="text-3xl font-black text-white tracking-tight">{onlineAssets}</span>
              <p className="text-xs text-slate-400 font-semibold mt-0.5">Ativos Online</p>
            </div>
          </div>
          <div className="mt-4 pt-3 border-t border-slate-800/80 flex items-center justify-between text-xs text-emerald-400 font-bold group-hover:translate-x-1 transition-transform">
            <span>Ver mapa ativo</span>
            <ArrowRight className="w-4 h-4" />
          </div>
        </div>

        {/* Card 3: Offline */}
        <div
          onClick={() => setCurrentView('devices')}
          className="bento-card p-5 shadow-xl hover:border-red-500/50 cursor-pointer group flex flex-col justify-between"
        >
          <div className="flex items-center justify-between">
            <div className="w-12 h-12 rounded-xl bg-red-500/90 flex items-center justify-center text-white shadow-lg shadow-red-500/30">
              <WifiOff className="w-6 h-6" />
            </div>
            <div className="text-right">
              <span className="text-3xl font-black text-white tracking-tight">{offlineAssets}</span>
              <p className="text-xs text-slate-400 font-semibold mt-0.5">Ativos Offline</p>
            </div>
          </div>
          <div className="mt-4 pt-3 border-t border-slate-800/80 flex items-center justify-between text-xs text-red-400 font-bold group-hover:translate-x-1 transition-transform">
            <span>Verificar sinal</span>
            <ArrowRight className="w-4 h-4" />
          </div>
        </div>

        {/* Card 4: Alertas Ativos */}
        <div
          onClick={() => setCurrentView('alerts')}
          className="bento-card p-5 shadow-xl hover:border-amber-500/50 cursor-pointer group flex flex-col justify-between"
        >
          <div className="flex items-center justify-between">
            <div className="w-12 h-12 rounded-xl bg-amber-500 flex items-center justify-center text-slate-950 shadow-lg shadow-amber-500/30">
              <Bell className="w-6 h-6" />
            </div>
            <div className="text-right">
              <span className="text-3xl font-black text-white tracking-tight">{activeAlerts}</span>
              <p className="text-xs text-slate-400 font-semibold mt-0.5">Alertas Pendentes</p>
            </div>
          </div>
          <div className="mt-4 pt-3 border-t border-slate-800/80 flex items-center justify-between text-xs text-amber-400 font-bold group-hover:translate-x-1 transition-transform">
            <span>Central de Alertas</span>
            <ArrowRight className="w-4 h-4" />
          </div>
        </div>
      </div>

      {/* Main Grid: Live Map (Left 2 cols) & Assets/Alerts (Right col) */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column: Interactive Live Map */}
        <div className="lg:col-span-2 space-y-4">
          <div className="bento-card p-4 shadow-xl">
            <div className="flex items-center justify-between pb-3 mb-3 border-b border-slate-800/80">
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse" />
                <h3 className="font-bold text-sm text-white">Mapa em Tempo Real</h3>
              </div>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => setCurrentView('live_map')}
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-800/90 hover:bg-slate-700 text-xs font-semibold text-slate-200 transition-colors"
                >
                  <Filter className="w-3.5 h-3.5" />
                  Filtrar
                </button>
                <button
                  onClick={() => setCurrentView('live_map')}
                  className="p-1.5 rounded-lg bg-slate-800/90 hover:bg-slate-700 text-slate-300 transition-colors"
                  title="Expandir Mapa"
                >
                  <Maximize2 className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>

            {/* Map Canvas */}
            <div className="h-[430px] w-full rounded-xl overflow-hidden">
              <LeafletMap showDetailsOverlay={true} />
            </div>
          </div>

          {/* Resumo do Dia Bottom Bar */}
          <div className="bento-card p-4 shadow-lg">
            <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-3">
              Resumo do Dia
            </h4>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              <div className="flex items-center gap-3 p-2.5 rounded-xl bg-slate-950/80 border border-slate-800/80">
                <div className="w-10 h-10 rounded-xl bg-blue-500/20 text-blue-400 flex items-center justify-center font-bold">
                  <Gauge className="w-5 h-5" />
                </div>
                <div>
                  <span className="text-[10px] text-slate-400 block font-semibold">Distância Percorrida</span>
                  <span className="text-sm font-extrabold text-white">128 km</span>
                </div>
              </div>

              <div className="flex items-center gap-3 p-2.5 rounded-xl bg-slate-950/80 border border-slate-800/80">
                <div className="w-10 h-10 rounded-xl bg-emerald-500/20 text-emerald-400 flex items-center justify-center font-bold">
                  <Clock className="w-5 h-5" />
                </div>
                <div>
                  <span className="text-[10px] text-slate-400 block font-semibold">Tempo de Uso</span>
                  <span className="text-sm font-extrabold text-white">3h 45m</span>
                </div>
              </div>

              <div className="flex items-center gap-3 p-2.5 rounded-xl bg-slate-950/80 border border-slate-800/80">
                <div className="w-10 h-10 rounded-xl bg-purple-500/20 text-purple-400 flex items-center justify-center font-bold">
                  <TrendingUp className="w-5 h-5" />
                </div>
                <div>
                  <span className="text-[10px] text-slate-400 block font-semibold">Velocidade Média</span>
                  <span className="text-sm font-extrabold text-white">48 km/h</span>
                </div>
              </div>

              <div className="flex items-center gap-3 p-2.5 rounded-xl bg-slate-950/80 border border-slate-800/80">
                <div className="w-10 h-10 rounded-xl bg-amber-500/20 text-amber-400 flex items-center justify-center font-bold">
                  <Compass className="w-5 h-5" />
                </div>
                <div>
                  <span className="text-[10px] text-slate-400 block font-semibold">Paradas</span>
                  <span className="text-sm font-extrabold text-white">6</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column: Meus Ativos & Alertas Recentes */}
        <div className="space-y-6">
          {/* Meus Ativos Widget */}
          <div className="bento-card p-4 shadow-xl">
            <div className="flex items-center justify-between pb-3 mb-3 border-b border-slate-800/80">
              <h3 className="font-bold text-sm text-white">Meus Ativos</h3>
              <button
                onClick={() => setCurrentView('devices')}
                className="text-xs text-blue-400 font-bold hover:underline"
              >
                Ver todos
              </button>
            </div>

            <div className="space-y-2.5">
              {userAssets.slice(0, 5).map(asset => (
                <div
                  key={asset.id}
                  onClick={() => setSelectedAssetId(asset.id)}
                  className={`p-2.5 rounded-xl border transition-all flex items-center justify-between cursor-pointer ${
                    selectedAssetId === asset.id
                      ? 'bg-slate-800/90 border-emerald-500/50 shadow-md'
                      : 'bg-slate-950/50 border-slate-800/80 hover:border-slate-700'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <div
                      className={`w-9 h-9 rounded-xl flex items-center justify-center font-bold ${
                        asset.type === 'car'
                          ? 'bg-emerald-500/20 text-emerald-400'
                          : asset.type === 'phone'
                          ? 'bg-blue-500/20 text-blue-400'
                          : asset.type === 'motorcycle'
                          ? 'bg-purple-500/20 text-purple-400'
                          : 'bg-amber-500/20 text-amber-400'
                      }`}
                    >
                      {asset.type === 'car' && '🚗'}
                      {asset.type === 'phone' && '📱'}
                      {asset.type === 'motorcycle' && '🏍️'}
                      {asset.type === 'backpack' && '🎒'}
                    </div>
                    <div>
                      <h4 className="text-xs font-bold text-white">{asset.name}</h4>
                      <div className="flex items-center gap-1.5 mt-0.5">
                        <span
                          className={`w-2 h-2 rounded-full ${
                            asset.status === 'online' ? 'bg-emerald-400 animate-pulse' : 'bg-red-400'
                          }`}
                        />
                        <span className="text-[10px] text-slate-400 font-medium capitalize">
                          {asset.status === 'online' ? 'Online' : 'Offline'}
                        </span>
                      </div>
                    </div>
                  </div>

                  <div className="text-right">
                    <span className="text-[10px] text-slate-500 block">{asset.lastUpdate}</span>
                    <button className="text-slate-500 hover:text-white mt-1">
                      <MoreVertical className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Alertas Recentes Widget */}
          <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-4 shadow-xl">
            <div className="flex items-center justify-between pb-3 mb-3 border-b border-slate-800">
              <h3 className="font-bold text-sm text-white">Alertas Recentes</h3>
              <button
                onClick={() => setCurrentView('alerts')}
                className="text-xs text-blue-400 font-bold hover:underline"
              >
                Ver todos
              </button>
            </div>

            <div className="space-y-3">
              {alerts.slice(0, 3).map(alert => (
                <div
                  key={alert.id}
                  className="p-3 rounded-xl bg-slate-950/60 border border-slate-800/80 flex items-start gap-3"
                >
                  <div
                    className={`p-2 rounded-xl shrink-0 mt-0.5 ${
                      alert.severity === 'critical'
                        ? 'bg-red-500/20 text-red-400'
                        : 'bg-amber-500/20 text-amber-400'
                    }`}
                  >
                    {alert.severity === 'critical' ? (
                      <ShieldAlert className="w-4 h-4" />
                    ) : (
                      <AlertTriangle className="w-4 h-4" />
                    )}
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center justify-between">
                      <h4 className="text-xs font-bold text-white">{alert.title}</h4>
                      <span className="text-[10px] text-slate-500">{alert.timeAgo}</span>
                    </div>
                    <p className="text-[11px] text-slate-400 mt-1 leading-snug">{alert.message}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
