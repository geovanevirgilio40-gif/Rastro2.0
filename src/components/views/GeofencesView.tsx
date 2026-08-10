import React, { useState } from 'react';
import { Radio, Plus, Trash2, CheckCircle2, ShieldAlert, MapPin } from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { LeafletMap } from '../LeafletMap';

export const GeofencesView: React.FC = () => {
  const { geofences, addGeofence, deleteGeofence, assets } = useApp();

  const [showModal, setShowModal] = useState<boolean>(false);
  const [name, setName] = useState<string>('');
  const [radius, setRadius] = useState<number>(500);
  const [color, setColor] = useState<string>('#10b981');

  const handleCreate = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name) return;

    addGeofence({
      name,
      type: 'circle',
      centerLat: -23.5505,
      centerLng: -46.6333,
      radius,
      color,
      assignedAssetIds: [assets[0]?.id || 'ast_1'],
      alertOnEnter: true,
      alertOnExit: true,
      status: 'active',
    });

    setShowModal(false);
    setName('');
  };

  return (
    <div className="space-y-6 text-slate-100">
      {/* Header */}
      <div className="bg-slate-900/90 border border-slate-800 p-4 rounded-2xl shadow-xl flex flex-wrap items-center justify-between gap-4">
        <div>
          <h2 className="text-xl font-bold text-white tracking-tight flex items-center gap-2">
            <Radio className="w-5 h-5 text-emerald-400" />
            Geofences (Cercas Virtuais de Segurança)
          </h2>
          <p className="text-xs text-slate-400 mt-0.5">
            Crie perímetros virtuais no mapa e receba alertas imediatos em caso de entrada ou saída não autorizada.
          </p>
        </div>

        <button
          onClick={() => setShowModal(true)}
          className="px-4 py-2 bg-emerald-500 hover:bg-emerald-600 text-slate-950 font-bold text-xs rounded-xl flex items-center gap-2 shadow-lg shadow-emerald-500/20"
        >
          <Plus className="w-4 h-4" />
          Nova Cerca Virtual
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Geofences List */}
        <div className="space-y-3">
          {geofences.map(geo => (
            <div
              key={geo.id}
              className="bg-slate-900/90 border border-slate-800 rounded-2xl p-4 shadow-xl space-y-3"
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2.5">
                  <div
                    className="w-4 h-4 rounded-full border-2 border-white"
                    style={{ backgroundColor: geo.color }}
                  />
                  <h3 className="font-bold text-sm text-white">{geo.name}</h3>
                </div>
                <button
                  onClick={() => deleteGeofence(geo.id)}
                  className="text-slate-500 hover:text-red-400 transition-colors"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>

              <div className="text-xs text-slate-400 space-y-1 bg-slate-950 p-2.5 rounded-xl border border-slate-800">
                <div className="flex justify-between">
                  <span>Raio de Cobertura:</span>
                  <strong className="text-white">{geo.radius}m</strong>
                </div>
                <div className="flex justify-between">
                  <span>Gatilho Entrada/Saída:</span>
                  <strong className="text-emerald-400">Ativo</strong>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Map View */}
        <div className="lg:col-span-2 h-[500px]">
          <LeafletMap showDetailsOverlay={false} height="100%" />
        </div>
      </div>

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 w-full max-w-md shadow-2xl space-y-4 text-xs">
            <h3 className="text-base font-bold text-white border-b border-slate-800 pb-2">
              Criar Cerca Virtual
            </h3>

            <form onSubmit={handleCreate} className="space-y-3">
              <div>
                <label className="text-slate-300 font-bold block mb-1">Nome da Área</label>
                <input
                  type="text"
                  required
                  value={name}
                  onChange={e => setName(e.target.value)}
                  placeholder="Ex: Garagem Residencial / Zona de Risco"
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-white focus:outline-none focus:border-emerald-500"
                />
              </div>

              <div>
                <label className="text-slate-300 font-bold block mb-1">Raio do Perímetro ({radius}m)</label>
                <input
                  type="range"
                  min={100}
                  max={3000}
                  step={100}
                  value={radius}
                  onChange={e => setRadius(Number(e.target.value))}
                  className="w-full accent-emerald-500"
                />
              </div>

              <div>
                <label className="text-slate-300 font-bold block mb-1">Cor do Destaque no Mapa</label>
                <input
                  type="color"
                  value={color}
                  onChange={e => setColor(e.target.value)}
                  className="w-full h-9 bg-slate-950 border border-slate-800 rounded-xl cursor-pointer"
                />
              </div>

              <div className="pt-3 flex justify-end gap-2 border-t border-slate-800">
                <button
                  type="button"
                  onClick={() => setShowModal(false)}
                  className="px-4 py-2 bg-slate-800 font-bold rounded-xl text-slate-300"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-emerald-500 text-slate-950 font-bold rounded-xl"
                >
                  Salvar Geofence
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
