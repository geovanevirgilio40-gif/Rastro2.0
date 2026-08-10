import React, { useState, useEffect } from 'react';
import {
  History,
  Play,
  Pause,
  RotateCcw,
  Calendar,
  Clock,
  Gauge,
  MapPin,
  TrendingUp,
  Download,
} from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { LeafletMap } from '../LeafletMap';
import { TrajectoryPoint } from '../../types';

export const TrajectoryView: React.FC = () => {
  const { assets, selectedAssetId, setSelectedAssetId } = useApp();

  const [selectedAsset, setSelectedAsset] = useState<string>(selectedAssetId || assets[0]?.id || 'ast_1');
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [currentStep, setCurrentStep] = useState<number>(0);
  const [speedMultiplier, setSpeedMultiplier] = useState<number>(1);
  const [dateFilter, setDateFilter] = useState<string>('2026-08-10');

  const assetObj = assets.find(a => a.id === selectedAsset) || assets[0];
  const points: TrajectoryPoint[] = assetObj?.history || [
    { id: '1', lat: -23.5550, lng: -46.6400, speed: 45, battery: 78, timestamp: '14:00', address: 'Av. Ipiranga, 400 - SP' },
    { id: '2', lat: -23.5530, lng: -46.6370, speed: 52, battery: 77, timestamp: '14:15', address: 'Praça da Sé, 10 - SP' },
    { id: '3', lat: -23.5510, lng: -46.6350, speed: 58, battery: 76, timestamp: '14:30', address: 'Rua Boa Vista, 250 - SP' },
    { id: '4', lat: -23.5505, lng: -46.6333, speed: 60, battery: 75, timestamp: '14:45', address: 'Avenida dos Imigrantes, 1234 - SP' },
  ];

  // Playback timer
  useEffect(() => {
    if (!isPlaying) return;

    const intervalTime = Math.max(200, 1000 / speedMultiplier);
    const timer = setInterval(() => {
      setCurrentStep(prev => {
        if (prev >= points.length - 1) {
          setIsPlaying(false);
          return prev;
        }
        return prev + 1;
      });
    }, intervalTime);

    return () => clearInterval(timer);
  }, [isPlaying, speedMultiplier, points.length]);

  const currentPoint = points[currentStep] || points[0];

  return (
    <div className="space-y-6 text-slate-100">
      {/* Header Controls */}
      <div className="flex flex-wrap items-center justify-between gap-4 bg-slate-900/90 border border-slate-800 p-4 rounded-2xl shadow-xl">
        <div>
          <h2 className="text-xl font-bold text-white tracking-tight flex items-center gap-2">
            <History className="w-5 h-5 text-emerald-400" />
            Histórico de Trajetos & Playback GPS
          </h2>
          <p className="text-xs text-slate-400 mt-0.5">
            Visualize a rota percorrida, paradas, perfil de velocidade e exporte relatórios de rota.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-3 text-xs">
          {/* Asset Select */}
          <select
            value={selectedAsset}
            onChange={e => {
              setSelectedAsset(e.target.value);
              setSelectedAssetId(e.target.value);
              setCurrentStep(0);
              setIsPlaying(false);
            }}
            className="bg-slate-950 border border-slate-800 rounded-xl px-3 py-1.5 text-white focus:outline-none focus:border-emerald-500"
          >
            {assets.map(a => (
              <option key={a.id} value={a.id}>
                {a.name} ({a.type})
              </option>
            ))}
          </select>

          {/* Date Picker */}
          <div className="flex items-center gap-1.5 bg-slate-950 border border-slate-800 px-3 py-1.5 rounded-xl text-slate-300">
            <Calendar className="w-3.5 h-3.5 text-slate-400" />
            <input
              type="date"
              value={dateFilter}
              onChange={e => setDateFilter(e.target.value)}
              className="bg-transparent text-white focus:outline-none"
            />
          </div>

          <button
            onClick={() => alert(`Exportando rota de ${assetObj.name} em formato GPX/KML...`)}
            className="px-3 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 font-bold flex items-center gap-1.5"
          >
            <Download className="w-3 h-3" />
            Exportar GPX
          </button>
        </div>
      </div>

      {/* Main Content: Map & Playback Controls */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Map Column (2 cols) */}
        <div className="lg:col-span-2 space-y-4">
          <div className="h-[460px] w-full bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden shadow-2xl">
            <LeafletMap
              assets={[
                {
                  ...assetObj,
                  lat: currentPoint.lat,
                  lng: currentPoint.lng,
                  speed: currentPoint.speed,
                  address: currentPoint.address,
                  lastUpdate: currentPoint.timestamp,
                },
              ]}
              trajectoryPoints={points}
              showDetailsOverlay={false}
            />
          </div>

          {/* Player Controls Bar */}
          <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-4 shadow-xl space-y-3">
            <div className="flex items-center justify-between text-xs text-slate-300 font-bold">
              <span className="flex items-center gap-1.5">
                <Clock className="w-4 h-4 text-emerald-400" />
                Horário da Rota: <strong className="text-white font-mono">{currentPoint.timestamp}</strong>
              </span>
              <span>
                Velocidade Atual: <strong className="text-emerald-400 font-mono text-sm">{currentPoint.speed} km/h</strong>
              </span>
            </div>

            {/* Timeline Scrubber */}
            <div className="flex items-center gap-3">
              <input
                type="range"
                min={0}
                max={points.length - 1}
                value={currentStep}
                onChange={e => setCurrentStep(Number(e.target.value))}
                className="w-full accent-emerald-500 bg-slate-800 h-2 rounded-lg cursor-pointer"
              />
              <span className="text-xs font-mono text-slate-400 shrink-0">
                {currentStep + 1} / {points.length}
              </span>
            </div>

            {/* Play/Pause & Speed Multiplier */}
            <div className="flex items-center justify-between pt-2 border-t border-slate-800/80">
              <div className="flex items-center gap-2">
                <button
                  onClick={() => setIsPlaying(!isPlaying)}
                  className="w-10 h-10 rounded-xl bg-emerald-500 hover:bg-emerald-600 text-slate-950 font-bold flex items-center justify-center shadow-lg shadow-emerald-500/20"
                >
                  {isPlaying ? <Pause className="w-5 h-5" /> : <Play className="w-5 h-5 fill-slate-950 ml-0.5" />}
                </button>
                <button
                  onClick={() => {
                    setIsPlaying(false);
                    setCurrentStep(0);
                  }}
                  className="p-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300"
                  title="Reiniciar Rota"
                >
                  <RotateCcw className="w-4 h-4" />
                </button>
              </div>

              {/* Speed Pills */}
              <div className="flex items-center gap-1 bg-slate-950 p-1 rounded-xl border border-slate-800 text-xs font-bold">
                {[1, 2, 5, 10].map(mult => (
                  <button
                    key={mult}
                    onClick={() => setSpeedMultiplier(mult)}
                    className={`px-2.5 py-1 rounded-lg transition-colors ${
                      speedMultiplier === mult ? 'bg-emerald-500 text-slate-950 font-black' : 'text-slate-400 hover:text-white'
                    }`}
                  >
                    {mult}x
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Right Stats & Route Points List */}
        <div className="space-y-6">
          {/* Summary Box */}
          <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-4 shadow-xl space-y-3">
            <h3 className="font-bold text-sm text-white border-b border-slate-800 pb-2">
              Resumo da Trajetória ({assetObj.name})
            </h3>

            <div className="grid grid-cols-2 gap-3 text-xs">
              <div className="p-2.5 rounded-xl bg-slate-950/60 border border-slate-800">
                <span className="text-[10px] text-slate-400 font-semibold block">Distância Total</span>
                <span className="text-base font-extrabold text-white">48.2 km</span>
              </div>
              <div className="p-2.5 rounded-xl bg-slate-950/60 border border-slate-800">
                <span className="text-[10px] text-slate-400 font-semibold block">Tempo em Movimento</span>
                <span className="text-base font-extrabold text-white">1h 15m</span>
              </div>
              <div className="p-2.5 rounded-xl bg-slate-950/60 border border-slate-800">
                <span className="text-[10px] text-slate-400 font-semibold block">Velocidade Máxima</span>
                <span className="text-base font-extrabold text-amber-400">85 km/h</span>
              </div>
              <div className="p-2.5 rounded-xl bg-slate-950/60 border border-slate-800">
                <span className="text-[10px] text-slate-400 font-semibold block">Velocidade Média</span>
                <span className="text-base font-extrabold text-emerald-400">42 km/h</span>
              </div>
            </div>
          </div>

          {/* Timeline Points List */}
          <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-4 shadow-xl space-y-3">
            <h3 className="font-bold text-sm text-white border-b border-slate-800 pb-2">
              Pontos de Registro de Posição
            </h3>

            <div className="space-y-2 max-h-[260px] overflow-y-auto pr-1">
              {points.map((pt, idx) => (
                <div
                  key={pt.id}
                  onClick={() => setCurrentStep(idx)}
                  className={`p-2.5 rounded-xl border text-xs cursor-pointer transition-all ${
                    currentStep === idx
                      ? 'bg-slate-800 border-emerald-500 shadow-md'
                      : 'bg-slate-950/50 border-slate-800 hover:border-slate-700'
                  }`}
                >
                  <div className="flex items-center justify-between font-bold text-white">
                    <span>{pt.timestamp}</span>
                    <span className="text-emerald-400 font-mono">{pt.speed} km/h</span>
                  </div>
                  <p className="text-[10px] text-slate-400 mt-0.5 truncate">{pt.address}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
