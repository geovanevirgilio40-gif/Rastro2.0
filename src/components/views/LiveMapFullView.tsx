import React, { useState } from 'react';
import {
  Search,
  Filter,
  Play,
  Pause,
  RotateCcw,
  Zap,
  Lock,
  Unlock,
  Volume2,
  AlertOctagon,
  Smartphone,
  Gauge,
  Battery,
  MapPin,
  Compass,
} from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { LeafletMap } from '../LeafletMap';

export const LiveMapFullView: React.FC = () => {
  const {
    assets,
    selectedAssetId,
    setSelectedAssetId,
    selectedAsset,
    simulationActive,
    setSimulationActive,
    toggleEngineBlock,
    toggleAlarm,
    toggleLostMode,
    triggerPanic,
  } = useApp();

  const [typeFilter, setTypeFilter] = useState<string>('all');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [searchTerm, setSearchTerm] = useState<string>('');

  const filteredAssets = assets.filter(a => {
    const matchesSearch =
      a.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      a.imei.includes(searchTerm) ||
      a.address.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesType = typeFilter === 'all' || a.type === typeFilter;
    const matchesStatus = statusFilter === 'all' || a.status === statusFilter;
    return matchesSearch && matchesType && matchesStatus;
  });

  return (
    <div className="space-y-4 text-slate-100">
      {/* Top Header Controls */}
      <div className="flex flex-wrap items-center justify-between gap-4 bg-slate-900/90 border border-slate-800 p-4 rounded-2xl shadow-xl">
        <div>
          <h2 className="text-xl font-bold text-white tracking-tight flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse" />
            Mapa em Tempo Real & Telemetria
          </h2>
          <p className="text-xs text-slate-400 mt-0.5">
            Rastreamento via satélite GSM/GPS em tempo real com respostas remotas de emergência.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={() => setSimulationActive(!simulationActive)}
            className={`px-3 py-1.5 rounded-xl text-xs font-bold flex items-center gap-2 transition-all ${
              simulationActive
                ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/40 shadow-lg shadow-emerald-500/10'
                : 'bg-slate-800 text-slate-400 border border-slate-700'
            }`}
          >
            {simulationActive ? <Play className="w-3.5 h-3.5 fill-emerald-400" /> : <Pause className="w-3.5 h-3.5" />}
            {simulationActive ? 'GPS ao Vivo (Simulação Ativa)' : 'Simulação Pausada'}
          </button>
        </div>
      </div>

      {/* Main Container: Sidebar Filters (Left) & Map (Right) */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-4">
        {/* Left Control Panel */}
        <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-4 shadow-xl space-y-4">
          {/* Search Box */}
          <div className="relative">
            <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
            <input
              type="text"
              value={searchTerm}
              onChange={e => setSearchTerm(e.target.value)}
              placeholder="Buscar ativo, IMEI, endereço..."
              className="w-full bg-slate-950 border border-slate-800 rounded-xl pl-9 pr-3 py-2 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-emerald-500"
            />
          </div>

          {/* Type Filter Pills */}
          <div>
            <label className="text-[10px] uppercase font-bold text-slate-400 block mb-1.5">
              Tipo de Ativo
            </label>
            <div className="flex flex-wrap gap-1">
              {['all', 'car', 'motorcycle', 'phone', 'backpack', 'truck'].map(type => (
                <button
                  key={type}
                  onClick={() => setTypeFilter(type)}
                  className={`px-2.5 py-1 rounded-lg text-[11px] font-bold capitalize transition-all ${
                    typeFilter === type
                      ? 'bg-emerald-500 text-slate-950 shadow-md'
                      : 'bg-slate-950 text-slate-400 hover:text-white border border-slate-800'
                  }`}
                >
                  {type === 'all'
                    ? 'Todos'
                    : type === 'car'
                    ? '🚗 Carro'
                    : type === 'motorcycle'
                    ? '🏍️ Moto'
                    : type === 'phone'
                    ? '📱 Celular'
                    : type === 'backpack'
                    ? '🎒 Mochila'
                    : '🚚 Caminhão'}
                </button>
              ))}
            </div>
          </div>

          {/* Assets List */}
          <div>
            <div className="flex items-center justify-between mb-2">
              <label className="text-[10px] uppercase font-bold text-slate-400">
                Ativos Encontrados ({filteredAssets.length})
              </label>
            </div>

            <div className="space-y-2 max-h-[340px] overflow-y-auto pr-1">
              {filteredAssets.map(asset => (
                <div
                  key={asset.id}
                  onClick={() => setSelectedAssetId(asset.id)}
                  className={`p-3 rounded-xl border transition-all cursor-pointer flex items-center justify-between ${
                    selectedAssetId === asset.id
                      ? 'bg-slate-800 border-emerald-500 shadow-md'
                      : 'bg-slate-950/60 border-slate-800 hover:border-slate-700'
                  }`}
                >
                  <div className="flex items-center gap-2.5">
                    <span
                      className={`w-2.5 h-2.5 rounded-full ${
                        asset.status === 'online' ? 'bg-emerald-400 animate-pulse' : 'bg-red-400'
                      }`}
                    />
                    <div>
                      <h4 className="text-xs font-bold text-white">{asset.name}</h4>
                      <p className="text-[10px] text-slate-400 truncate max-w-[140px]">{asset.address}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <span className="text-xs font-extrabold text-white block">{asset.speed} km/h</span>
                    <span className="text-[10px] text-slate-500 block">{asset.battery}% bat</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Remote Security Command Center for Selected Asset */}
          {selectedAsset && (
            <div className="pt-3 border-t border-slate-800 space-y-2">
              <h4 className="text-xs font-bold text-white uppercase tracking-wider flex items-center gap-1.5">
                <Zap className="w-3.5 h-3.5 text-amber-400" />
                Comandos de Segurança Remoto
              </h4>
              <div className="grid grid-cols-2 gap-2">
                <button
                  onClick={() => toggleEngineBlock(selectedAsset.id)}
                  className={`p-2 rounded-xl border text-xs font-bold flex items-center justify-center gap-1.5 transition-colors ${
                    selectedAsset.engineBlocked
                      ? 'bg-red-500/20 text-red-400 border-red-500/40'
                      : 'bg-slate-950 border-slate-800 text-slate-300 hover:text-white'
                  }`}
                >
                  {selectedAsset.engineBlocked ? <Lock className="w-3.5 h-3.5 text-red-400" /> : <Unlock className="w-3.5 h-3.5" />}
                  {selectedAsset.engineBlocked ? 'Motor Bloqueado' : 'Bloquear Motor'}
                </button>

                <button
                  onClick={() => triggerPanic(selectedAsset.id)}
                  className="p-2 rounded-xl bg-red-600 hover:bg-red-700 text-white font-bold text-xs flex items-center justify-center gap-1.5 shadow-lg shadow-red-600/20"
                >
                  <AlertOctagon className="w-3.5 h-3.5" />
                  Alerta Pânico
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Right Map Canvas (3 Cols) */}
        <div className="lg:col-span-3 h-[600px]">
          <LeafletMap showDetailsOverlay={true} height="100%" />
        </div>
      </div>
    </div>
  );
};
