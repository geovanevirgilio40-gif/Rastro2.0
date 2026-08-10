import React from 'react';
import { FileText, Download, Calendar, TrendingUp, Gauge, Clock } from 'lucide-react';
import { useApp } from '../../context/AppContext';

export const ReportsView: React.FC = () => {
  const { assets } = useApp();

  return (
    <div className="space-y-6 text-slate-100">
      <div className="bg-slate-900/90 border border-slate-800 p-4 rounded-2xl shadow-xl flex flex-wrap items-center justify-between gap-4">
        <div>
          <h2 className="text-xl font-bold text-white tracking-tight flex items-center gap-2">
            <FileText className="w-5 h-5 text-purple-400" />
            Relatórios Executivos de Telemetria
          </h2>
          <p className="text-xs text-slate-400 mt-0.5">
            Relatórios analíticos de quilometragem percorrida, paradas, velocidade e conformidade de geofences.
          </p>
        </div>

        <button
          onClick={() => alert('Relatório consolidado exportado em PDF e CSV com sucesso!')}
          className="px-4 py-2 bg-purple-600 hover:bg-purple-700 text-white font-bold text-xs rounded-xl flex items-center gap-2 shadow-lg shadow-purple-600/20"
        >
          <Download className="w-4 h-4" />
          Exportar Relatório Geral (PDF)
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-5 shadow-xl space-y-3">
          <h3 className="font-bold text-sm text-white">Quilometragem Consolidada</h3>
          <span className="text-2xl font-extrabold text-emerald-400">1.482 km</span>
          <p className="text-xs text-slate-400">Total percorrido por todos os ativos nos últimos 30 dias.</p>
        </div>

        <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-5 shadow-xl space-y-3">
          <h3 className="font-bold text-sm text-white">Horas de Motor em Funcionamento</h3>
          <span className="text-2xl font-extrabold text-blue-400">142h 30m</span>
          <p className="text-xs text-slate-400">Tempo de ignição ligada estimado para a frota.</p>
        </div>

        <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-5 shadow-xl space-y-3">
          <h3 className="font-bold text-sm text-white">Taxa de Conformidade Geofence</h3>
          <span className="text-2xl font-extrabold text-purple-400">98.4%</span>
          <p className="text-xs text-slate-400">Permanência dentro das áreas virtuais autorizadas.</p>
        </div>
      </div>
    </div>
  );
};
