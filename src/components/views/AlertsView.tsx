import React from 'react';
import { Bell, ShieldAlert, CheckCircle2, Trash2, Filter } from 'lucide-react';
import { useApp } from '../../context/AppContext';

export const AlertsView: React.FC = () => {
  const { alerts, resolveAlert, clearAllAlerts } = useApp();

  return (
    <div className="space-y-6 text-slate-100">
      <div className="bg-slate-900/90 border border-slate-800 p-4 rounded-2xl shadow-xl flex flex-wrap items-center justify-between gap-4">
        <div>
          <h2 className="text-xl font-bold text-white tracking-tight flex items-center gap-2">
            <Bell className="w-5 h-5 text-amber-400" />
            Central de Alertas & Notificações
          </h2>
          <p className="text-xs text-slate-400 mt-0.5">
            Historico completo de ocorrências de velocidade, geofences, bateria e botão de pânico.
          </p>
        </div>

        <button
          onClick={clearAllAlerts}
          className="px-3 py-1.5 bg-slate-800 hover:bg-slate-700 font-bold text-xs rounded-xl text-slate-300"
        >
          Marcar Todos como Lidos
        </button>
      </div>

      <div className="space-y-3">
        {alerts.map(alert => (
          <div
            key={alert.id}
            className={`p-4 rounded-2xl border transition-all flex items-start justify-between gap-4 ${
              alert.resolved
                ? 'bg-slate-950/40 border-slate-800/80 opacity-70'
                : alert.severity === 'critical'
                ? 'bg-red-500/10 border-red-500/30'
                : 'bg-amber-500/10 border-amber-500/30'
            }`}
          >
            <div className="flex items-start gap-3">
              <div
                className={`p-2.5 rounded-xl mt-0.5 ${
                  alert.severity === 'critical' ? 'bg-red-500/20 text-red-400' : 'bg-amber-500/20 text-amber-400'
                }`}
              >
                <ShieldAlert className="w-5 h-5" />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <h3 className="font-bold text-sm text-white">{alert.title}</h3>
                  <span className="text-[10px] text-slate-400">({alert.assetName})</span>
                </div>
                <p className="text-xs text-slate-300 mt-1">{alert.message}</p>
                <span className="text-[10px] text-slate-500 block mt-2">{alert.timeAgo}</span>
              </div>
            </div>

            {!alert.resolved && (
              <button
                onClick={() => resolveAlert(alert.id)}
                className="px-3 py-1.5 bg-slate-800 hover:bg-slate-700 text-xs font-bold text-emerald-400 rounded-xl flex items-center gap-1.5 shrink-0"
              >
                <CheckCircle2 className="w-4 h-4" />
                Resolver
              </button>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};
