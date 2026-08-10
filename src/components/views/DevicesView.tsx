import React, { useState } from 'react';
import {
  Smartphone,
  Plus,
  Search,
  Lock,
  Unlock,
  Volume2,
  AlertTriangle,
  MoreVertical,
  CheckCircle2,
  XCircle,
  Car,
  Gauge,
  Battery,
  ShieldAlert,
} from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { Asset, AssetType } from '../../types';

export const DevicesView: React.FC = () => {
  const { assets, toggleEngineBlock, toggleAlarm, toggleLostMode, setSelectedAssetId, setCurrentView } = useApp();

  const [searchTerm, setSearchTerm] = useState<string>('');
  const [showAddModal, setShowAddModal] = useState<boolean>(false);
  const [newDeviceName, setNewDeviceName] = useState<string>('');
  const [newDeviceType, setNewDeviceType] = useState<AssetType>('car');
  const [newDeviceImei, setNewDeviceImei] = useState<string>('');
  const [newDevicePlate, setNewDevicePlate] = useState<string>('');

  const filteredAssets = assets.filter(
    a =>
      a.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      a.imei.includes(searchTerm) ||
      (a.plateNumber && a.plateNumber.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  const handleCreateDevice = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newDeviceName || !newDeviceImei) return;

    alert(`Dispositivo '${newDeviceName}' cadastrado com sucesso! Sincronizando com o módulo GPS GSM...`);
    setShowAddModal(false);
    setNewDeviceName('');
    setNewDeviceImei('');
    setNewDevicePlate('');
  };

  return (
    <div className="space-y-6 text-slate-100">
      {/* Title & Controls */}
      <div className="flex flex-wrap items-center justify-between gap-4 bg-slate-900/90 border border-slate-800 p-4 rounded-2xl shadow-xl">
        <div>
          <h2 className="text-xl font-bold text-white tracking-tight flex items-center gap-2">
            <Smartphone className="w-5 h-5 text-emerald-400" />
            Gestão de Ativos & Dispositivos
          </h2>
          <p className="text-xs text-slate-400 mt-0.5">
            Cadastre, monitore telemetria e envie comandos remotos aos seus dispositivos.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <div className="relative">
            <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
            <input
              type="text"
              value={searchTerm}
              onChange={e => setSearchTerm(e.target.value)}
              placeholder="Buscar por nome, IMEI ou placa..."
              className="bg-slate-950 border border-slate-800 rounded-xl pl-9 pr-3 py-1.5 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-emerald-500"
            />
          </div>

          <button
            onClick={() => setShowAddModal(true)}
            className="px-4 py-2 rounded-xl bg-emerald-500 hover:bg-emerald-600 text-slate-950 font-bold text-xs flex items-center gap-2 shadow-lg shadow-emerald-500/20 transition-all"
          >
            <Plus className="w-4 h-4" />
            Adicionar Ativo
          </button>
        </div>
      </div>

      {/* Grid of Devices Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredAssets.map(asset => (
          <div
            key={asset.id}
            className="bg-slate-900/90 border border-slate-800 hover:border-slate-700 rounded-2xl p-5 shadow-xl flex flex-col justify-between space-y-4 transition-all"
          >
            {/* Top Row Header */}
            <div className="flex items-start justify-between">
              <div className="flex items-center gap-3">
                <div
                  className={`w-11 h-11 rounded-2xl flex items-center justify-center font-bold text-lg shadow-md ${
                    asset.type === 'car'
                      ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30'
                      : asset.type === 'phone'
                      ? 'bg-blue-500/20 text-blue-400 border border-blue-500/30'
                      : asset.type === 'motorcycle'
                      ? 'bg-purple-500/20 text-purple-400 border border-purple-500/30'
                      : 'bg-amber-500/20 text-amber-400 border border-amber-500/30'
                  }`}
                >
                  {asset.type === 'car' && '🚗'}
                  {asset.type === 'phone' && '📱'}
                  {asset.type === 'motorcycle' && '🏍️'}
                  {asset.type === 'backpack' && '🎒'}
                  {asset.type === 'truck' && '🚚'}
                </div>
                <div>
                  <h3 className="font-bold text-sm text-white">{asset.name}</h3>
                  <span className="text-[10px] text-slate-400 font-mono block">IMEI: {asset.imei}</span>
                  {asset.plateNumber && (
                    <span className="inline-block mt-0.5 text-[9px] bg-slate-800 text-slate-300 font-bold px-1.5 py-0.2 rounded border border-slate-700">
                      Placa: {asset.plateNumber}
                    </span>
                  )}
                </div>
              </div>

              <span
                className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-bold ${
                  asset.status === 'online'
                    ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/30'
                    : 'bg-red-500/10 text-red-400 border border-red-500/30'
                }`}
              >
                <span
                  className={`w-1.5 h-1.5 rounded-full ${
                    asset.status === 'online' ? 'bg-emerald-400 animate-pulse' : 'bg-red-400'
                  }`}
                />
                {asset.status === 'online' ? 'Online' : 'Offline'}
              </span>
            </div>

            {/* Middle Stats Bar */}
            <div className="grid grid-cols-3 gap-2 bg-slate-950/70 p-3 rounded-xl border border-slate-800/80 text-center text-xs">
              <div>
                <span className="text-[10px] text-slate-500 block font-semibold">Velocidade</span>
                <span className="font-extrabold text-white">{asset.speed} km/h</span>
              </div>
              <div>
                <span className="text-[10px] text-slate-500 block font-semibold">Bateria</span>
                <span className="font-extrabold text-white">{asset.battery}%</span>
              </div>
              <div>
                <span className="text-[10px] text-slate-500 block font-semibold">Direção</span>
                <span className="font-extrabold text-emerald-400">{asset.direction}</span>
              </div>
            </div>

            {/* Address */}
            <div className="text-xs text-slate-400 bg-slate-950/40 p-2.5 rounded-xl border border-slate-800/50">
              <span className="text-[10px] text-slate-500 font-bold uppercase block">Última Localização:</span>
              <p className="text-slate-200 mt-0.5 truncate">{asset.address}</p>
            </div>

            {/* Bottom Actions Row */}
            <div className="pt-2 border-t border-slate-800 flex items-center justify-between gap-2">
              <button
                onClick={() => {
                  setSelectedAssetId(asset.id);
                  setCurrentView('live_map');
                }}
                className="flex-1 py-1.5 bg-slate-800 hover:bg-slate-700 text-white font-bold text-xs rounded-xl transition-colors text-center"
              >
                Ver no Mapa
              </button>

              <button
                onClick={() => toggleEngineBlock(asset.id)}
                className={`p-2 rounded-xl border transition-colors ${
                  asset.engineBlocked
                    ? 'bg-red-500/20 text-red-400 border-red-500/40'
                    : 'bg-slate-950 text-slate-400 hover:text-white border-slate-800'
                }`}
                title={asset.engineBlocked ? 'Desbloquear Motor' : 'Bloquear Motor'}
              >
                {asset.engineBlocked ? <Lock className="w-4 h-4 text-red-400" /> : <Unlock className="w-4 h-4" />}
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Add Device Modal */}
      {showAddModal && (
        <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 w-full max-w-md shadow-2xl space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-slate-800">
              <h3 className="text-lg font-bold text-white">Cadastrar Novo Ativo</h3>
              <button onClick={() => setShowAddModal(false)} className="text-slate-400 hover:text-white">
                ✕
              </button>
            </div>

            <form onSubmit={handleCreateDevice} className="space-y-3 text-xs">
              <div>
                <label className="text-slate-300 font-bold block mb-1">Nome do Ativo / Veículo</label>
                <input
                  type="text"
                  required
                  value={newDeviceName}
                  onChange={e => setNewDeviceName(e.target.value)}
                  placeholder="Ex: Toyota Corolla / iPhone 15"
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-white focus:outline-none focus:border-emerald-500"
                />
              </div>

              <div>
                <label className="text-slate-300 font-bold block mb-1">Tipo de Ativo</label>
                <select
                  value={newDeviceType}
                  onChange={e => setNewDeviceType(e.target.value as AssetType)}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-white focus:outline-none focus:border-emerald-500"
                >
                  <option value="car">Carro / Veículo</option>
                  <option value="motorcycle">Motocicleta</option>
                  <option value="phone">Smartphone Celular</option>
                  <option value="backpack">Mochila / Objeto</option>
                  <option value="truck">Caminhão / Frota</option>
                </select>
              </div>

              <div>
                <label className="text-slate-300 font-bold block mb-1">IMEI / Identificador do Rastreador</label>
                <input
                  type="text"
                  required
                  value={newDeviceImei}
                  onChange={e => setNewDeviceImei(e.target.value)}
                  placeholder="15 dígitos numéricos (ex: 864291048291038)"
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-white focus:outline-none focus:border-emerald-500 font-mono"
                />
              </div>

              <div>
                <label className="text-slate-300 font-bold block mb-1">Placa do Veículo (Opcional)</label>
                <input
                  type="text"
                  value={newDevicePlate}
                  onChange={e => setNewDevicePlate(e.target.value)}
                  placeholder="Ex: ABC-1234 / LD-00-XX"
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-white focus:outline-none focus:border-emerald-500"
                />
              </div>

              <div className="pt-3 flex items-center justify-end gap-2 border-t border-slate-800">
                <button
                  type="button"
                  onClick={() => setShowAddModal(false)}
                  className="px-4 py-2 rounded-xl bg-slate-800 text-slate-300 hover:text-white font-bold"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 rounded-xl bg-emerald-500 hover:bg-emerald-600 text-slate-950 font-bold shadow-lg"
                >
                  Salvar Ativo
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
