import React, { useState } from 'react';
import { Clock, Search, FileText, ShieldCheck, Filter } from 'lucide-react';
import { useApp } from '../../context/AppContext';

export const AuditLogsView: React.FC = () => {
  const { auditLogs } = useApp();
  const [searchTerm, setSearchTerm] = useState<string>('');

  const filteredLogs = auditLogs.filter(
    log =>
      log.actorName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      log.action.toLowerCase().includes(searchTerm.toLowerCase()) ||
      log.target.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-6 text-slate-100">
      <div className="bg-slate-900/90 border border-slate-800 p-4 rounded-2xl shadow-xl flex flex-wrap items-center justify-between gap-4">
        <div>
          <h2 className="text-xl font-bold text-white tracking-tight flex items-center gap-2">
            <Clock className="w-5 h-5 text-blue-400" />
            Auditoria e Registro de Logs Imutáveis
          </h2>
          <p className="text-xs text-slate-400 mt-0.5">
            Trilha de auditoria completa de acessos de emergência, ações administrativas e comandos remotos.
          </p>
        </div>

        <div className="relative">
          <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
          <input
            type="text"
            value={searchTerm}
            onChange={e => setSearchTerm(e.target.value)}
            placeholder="Filtrar ator, ação ou dispositivo..."
            className="bg-slate-950 border border-slate-800 rounded-xl pl-9 pr-3 py-1.5 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-blue-500"
          />
        </div>
      </div>

      <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-4 shadow-xl overflow-x-auto">
        <table className="w-full text-left text-xs">
          <thead className="bg-slate-950 text-slate-400 uppercase font-bold text-[10px]">
            <tr>
              <th className="p-3">Horário</th>
              <th className="p-3">Ator / Usuário</th>
              <th className="p-3">Cargo</th>
              <th className="p-3">Ação Executada</th>
              <th className="p-3">Alvo / Dispositivo</th>
              <th className="p-3">IP de Origem</th>
              <th className="p-3">Status</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-800">
            {filteredLogs.map(log => (
              <tr key={log.id} className="hover:bg-slate-800/50">
                <td className="p-3 font-mono text-slate-400">{log.timestamp}</td>
                <td className="p-3 font-bold text-white">{log.actorName}</td>
                <td className="p-3 text-slate-400">{log.actorRole}</td>
                <td className="p-3 text-slate-200 font-semibold">{log.action}</td>
                <td className="p-3 text-slate-300">{log.target}</td>
                <td className="p-3 font-mono text-slate-500 text-[11px]">{log.ip}</td>
                <td className="p-3">
                  <span
                    className={`font-extrabold text-[10px] px-2 py-0.5 rounded ${
                      log.status === 'Sucesso'
                        ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30'
                        : 'bg-amber-500/20 text-amber-400 border border-amber-500/30'
                    }`}
                  >
                    {log.status}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};
