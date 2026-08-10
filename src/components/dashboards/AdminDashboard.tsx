import React, { useState } from 'react';
import {
  Users,
  Smartphone,
  Zap,
  ShieldAlert,
  ArrowUpRight,
  ArrowDownRight,
  Clock,
  Eye,
  CheckCircle2,
  XCircle,
  Filter,
  Maximize2,
  Lock,
  User,
  Shield,
  Activity,
  MoreVertical,
  KeyRound,
} from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { LeafletMap } from '../LeafletMap';

export const AdminDashboard: React.FC = () => {
  const {
    currentUser,
    emergencyRequests,
    grantEmergencyAccess,
    terminateEmergencySession,
    assets,
    auditLogs,
    activityFeed,
    setCurrentView,
  } = useApp();

  const [selectedReqForGrant, setSelectedReqForGrant] = useState<string | null>(null);
  const [secondIdInput, setSecondIdInput] = useState<string>('');
  const [durationInput, setDurationInput] = useState<number>(60);

  const pendingRequests = emergencyRequests.filter(r => r.status === 'pending');
  const activeSessions = emergencyRequests.filter(r => r.status === 'active');

  const handleGrant = (requestId: string) => {
    if (!secondIdInput) {
      const req = emergencyRequests.find(r => r.id === requestId);
      alert(`Por favor preencha o segundo identificador (CPF/Telefone) do utilizador.`);
      return;
    }
    grantEmergencyAccess(requestId, secondIdInput, durationInput);
    setSelectedReqForGrant(null);
    setSecondIdInput('');
  };

  return (
    <div className="space-y-6 text-slate-100">
      {/* Title Header */}
      <div>
        <h1 className="text-2xl font-black text-white tracking-tight flex items-center gap-2">
          Bem-vindo, {currentUser.name} 👋
        </h1>
        <p className="text-xs text-slate-400 mt-1 font-medium">
          Painel de Controle - Gestão de Dispositivos, Clientes e Protocolos de Emergência
        </p>
      </div>

      {/* Top 4 Stats with Sparkline Indicators */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Card 1: Utilizadores */}
        <div className="bento-card p-4 shadow-xl">
          <div className="flex items-center justify-between">
            <div className="w-11 h-11 rounded-xl bg-blue-600 flex items-center justify-center text-white shadow-md shadow-blue-600/30">
              <Users className="w-5 h-5" />
            </div>
            <div className="text-right">
              <span className="text-2xl font-extrabold text-white">128</span>
              <p className="text-xs text-slate-400 font-semibold">Utilizadores</p>
            </div>
          </div>
          <div className="mt-3 flex items-center justify-between text-xs">
            <span className="text-emerald-400 font-bold flex items-center gap-0.5">
              <ArrowUpRight className="w-3.5 h-3.5" /> +12 este mês
            </span>
            {/* Sparkline simulation */}
            <div className="flex items-end gap-1 h-4">
              <div className="w-1.5 bg-blue-500/30 h-2 rounded-t" />
              <div className="w-1.5 bg-blue-500/50 h-3 rounded-t" />
              <div className="w-1.5 bg-blue-500/70 h-2.5 rounded-t" />
              <div className="w-1.5 bg-blue-500 h-4 rounded-t" />
            </div>
          </div>
        </div>

        {/* Card 2: Ativos */}
        <div className="bento-card p-4 shadow-xl">
          <div className="flex items-center justify-between">
            <div className="w-11 h-11 rounded-xl bg-emerald-500 flex items-center justify-center text-slate-950 shadow-md shadow-emerald-500/30">
              <Smartphone className="w-5 h-5" />
            </div>
            <div className="text-right">
              <span className="text-2xl font-extrabold text-white">256</span>
              <p className="text-xs text-slate-400 font-semibold">Ativos Cadastrados</p>
            </div>
          </div>
          <div className="mt-3 flex items-center justify-between text-xs">
            <span className="text-emerald-400 font-bold flex items-center gap-0.5">
              <ArrowUpRight className="w-3.5 h-3.5" /> +18 este mês
            </span>
            <div className="flex items-end gap-1 h-4">
              <div className="w-1.5 bg-emerald-500/30 h-1.5 rounded-t" />
              <div className="w-1.5 bg-emerald-500/50 h-2.5 rounded-t" />
              <div className="w-1.5 bg-emerald-500/70 h-3 rounded-t" />
              <div className="w-1.5 bg-emerald-500 h-4 rounded-t" />
            </div>
          </div>
        </div>

        {/* Card 3: Acessos de Emergência */}
        <div className="bento-card p-4 shadow-xl">
          <div className="flex items-center justify-between">
            <div className="w-11 h-11 rounded-xl bg-purple-600 flex items-center justify-center text-white shadow-md shadow-purple-600/30">
              <Zap className="w-5 h-5" />
            </div>
            <div className="text-right">
              <span className="text-2xl font-extrabold text-white">7</span>
              <p className="text-xs text-slate-400 font-semibold">Acessos Emergência</p>
            </div>
          </div>
          <div className="mt-3 flex items-center justify-between text-xs">
            <span className="text-purple-400 font-bold flex items-center gap-0.5">
              <ArrowUpRight className="w-3.5 h-3.5" /> +3 este mês
            </span>
            <div className="flex items-end gap-1 h-4">
              <div className="w-1.5 bg-purple-500/30 h-2 rounded-t" />
              <div className="w-1.5 bg-purple-500/50 h-2 rounded-t" />
              <div className="w-1.5 bg-purple-500/70 h-3.5 rounded-t" />
              <div className="w-1.5 bg-purple-500 h-4 rounded-t" />
            </div>
          </div>
        </div>

        {/* Card 4: Alertas Críticos */}
        <div className="bento-card p-4 shadow-xl">
          <div className="flex items-center justify-between">
            <div className="w-11 h-11 rounded-xl bg-amber-500 flex items-center justify-center text-slate-950 shadow-md shadow-amber-500/30">
              <ShieldAlert className="w-5 h-5" />
            </div>
            <div className="text-right">
              <span className="text-2xl font-extrabold text-white">3</span>
              <p className="text-xs text-slate-400 font-semibold">Alertas Críticos</p>
            </div>
          </div>
          <div className="mt-3 flex items-center justify-between text-xs">
            <button
              onClick={() => setCurrentView('alerts')}
              className="text-amber-400 font-bold hover:underline"
            >
              Ver todos
            </button>
            <div className="flex items-end gap-1 h-4">
              <div className="w-1.5 bg-amber-500/30 h-3 rounded-t" />
              <div className="w-1.5 bg-amber-500/50 h-2 rounded-t" />
              <div className="w-1.5 bg-amber-500/70 h-3.5 rounded-t" />
              <div className="w-1.5 bg-amber-500 h-2.5 rounded-t" />
            </div>
          </div>
        </div>
      </div>

      {/* Main Row: Fortaleza Live Map (Left) & Emergency Requests + Active Sessions (Right) */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Map Column (2 Cols) */}
        <div className="lg:col-span-2 space-y-4">
          <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-4 shadow-xl">
            <div className="flex items-center justify-between pb-3 mb-3 border-b border-slate-800">
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse" />
                <h3 className="font-bold text-sm text-white">Acessos em Tempo Real (Visão Geral)</h3>
              </div>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => setCurrentView('live_map')}
                  className="px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-xs font-semibold text-slate-200 transition-colors flex items-center gap-1.5"
                >
                  <Filter className="w-3.5 h-3.5" />
                  Filtrar
                </button>
                <button
                  onClick={() => setCurrentView('live_map')}
                  className="p-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300"
                >
                  <Maximize2 className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>

            <div className="h-[380px] w-full">
              <LeafletMap center={[-3.7319, -38.5267]} zoom={11} showDetailsOverlay={false} />
            </div>

            {/* Map Legend & Summary Bar */}
            <div className="mt-3 pt-3 border-t border-slate-800 flex flex-wrap items-center justify-around text-xs gap-4 text-center">
              <div>
                <span className="inline-block w-2 h-2 rounded-full bg-emerald-400 mr-1.5" />
                <span className="text-slate-400 font-semibold">Online: </span>
                <span className="font-bold text-white">182</span>
              </div>
              <div>
                <span className="inline-block w-2 h-2 rounded-full bg-red-400 mr-1.5" />
                <span className="text-slate-400 font-semibold">Offline: </span>
                <span className="font-bold text-white">74</span>
              </div>
              <div>
                <span className="inline-block w-2 h-2 rounded-full bg-amber-400 mr-1.5" />
                <span className="text-slate-400 font-semibold">Alertas: </span>
                <span className="font-bold text-white">5</span>
              </div>
              <div>
                <span className="text-slate-400 font-semibold">Total de Ativos: </span>
                <span className="font-bold text-white">256</span>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column: Pedidos de Emergência (Pendentes) & Acessos Ativos */}
        <div className="space-y-6">
          {/* Pedidos de Emergência (Pendentes) Widget (Image 2 match) */}
          <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-4 shadow-xl">
            <div className="flex items-center justify-between pb-3 mb-3 border-b border-slate-800">
              <div className="flex items-center gap-2">
                <ShieldAlert className="w-4 h-4 text-red-400 animate-pulse" />
                <h3 className="font-bold text-sm text-white">Pedidos de Emergência (Pendentes)</h3>
              </div>
              {pendingRequests.length > 0 && (
                <span className="bg-red-500 text-white font-extrabold text-[10px] px-2 py-0.5 rounded-full">
                  {pendingRequests.length}
                </span>
              )}
            </div>

            <div className="space-y-3 max-h-[260px] overflow-y-auto pr-1">
              {pendingRequests.map(req => (
                <div
                  key={req.id}
                  className="p-3 rounded-xl bg-slate-950/70 border border-slate-800/90 space-y-2 hover:border-red-500/40 transition-colors"
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <div className="w-8 h-8 rounded-full bg-red-500/20 text-red-400 flex items-center justify-center font-bold text-xs">
                        🚨
                      </div>
                      <div>
                        <h4 className="text-xs font-bold text-white">{req.userName}</h4>
                        <span className="text-[10px] text-slate-400 block">
                          Código: <code className="text-emerald-400 font-bold">{req.code}</code>
                        </span>
                      </div>
                    </div>
                    <span
                      className={`text-[10px] font-extrabold px-2 py-0.5 rounded ${
                        req.priority === 'Alta'
                          ? 'bg-red-500/20 text-red-400 border border-red-500/30'
                          : 'bg-amber-500/20 text-amber-400 border border-amber-500/30'
                      }`}
                    >
                      {req.priority}
                    </span>
                  </div>

                  <div className="text-[11px] text-slate-400 flex items-center justify-between pt-1 border-t border-slate-800/60">
                    <span>Dispositivo: <strong className="text-white">{req.deviceName}</strong></span>
                    <span>{req.timeAgo}</span>
                  </div>

                  {/* Grant Modal inline accordion */}
                  {selectedReqForGrant === req.id ? (
                    <div className="mt-2 pt-2 border-t border-slate-800 space-y-2 bg-slate-900 p-2.5 rounded-xl">
                      <label className="text-[10px] text-slate-300 font-semibold block">
                        Segundo Identificador (CPF / Telefone):
                      </label>
                      <input
                        type="text"
                        value={secondIdInput}
                        onChange={e => setSecondIdInput(e.target.value)}
                        placeholder="Ex: 123.456.789-00 ou 923 XXX XXX"
                        className="w-full bg-slate-950 border border-slate-700 rounded-lg px-2.5 py-1 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-emerald-500"
                      />
                      <div className="flex items-center justify-between gap-2 pt-1">
                        <button
                          onClick={() => setSelectedReqForGrant(null)}
                          className="px-2.5 py-1 rounded bg-slate-800 text-slate-400 text-[11px] hover:text-white"
                        >
                          Cancelar
                        </button>
                        <button
                          onClick={() => handleGrant(req.id)}
                          className="px-3 py-1 rounded bg-emerald-500 hover:bg-emerald-600 text-slate-950 font-bold text-xs shadow-md"
                        >
                          Autorizar Acesso
                        </button>
                      </div>
                    </div>
                  ) : (
                    <button
                      onClick={() => {
                        setSelectedReqForGrant(req.id);
                        setSecondIdInput(req.secondIdentifierInput || '');
                      }}
                      className="w-full mt-1 py-1.5 bg-red-500/10 hover:bg-red-500/20 border border-red-500/30 text-red-400 font-bold text-xs rounded-xl flex items-center justify-center gap-1.5 transition-colors"
                    >
                      <KeyRound className="w-3.5 h-3.5" />
                      Liberar Acesso de Emergência
                    </button>
                  )}
                </div>
              ))}

              {pendingRequests.length === 0 && (
                <div className="text-center py-6 text-slate-500 text-xs">
                  Nenhum pedido de emergência pendente no momento.
                </div>
              )}
            </div>

            <button
              onClick={() => setCurrentView('emergency')}
              className="w-full mt-3 py-2 bg-slate-800 hover:bg-slate-700 text-xs font-bold text-slate-200 rounded-xl transition-colors"
            >
              Ver todos os pedidos
            </button>
          </div>

          {/* Acessos Ativos de Administradores Widget (Image 2 match) */}
          <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-4 shadow-xl">
            <div className="flex items-center justify-between pb-3 mb-3 border-b border-slate-800">
              <div className="flex items-center gap-2">
                <Clock className="w-4 h-4 text-blue-400" />
                <h3 className="font-bold text-sm text-white">Acessos Ativos de Administradores</h3>
              </div>
              <span className="text-xs text-blue-400 font-bold">{activeSessions.length} ativos</span>
            </div>

            <div className="space-y-3">
              {activeSessions.map(session => (
                <div
                  key={session.id}
                  className="p-3 rounded-xl bg-slate-950/70 border border-slate-800 flex items-center justify-between gap-3"
                >
                  <div className="flex items-center gap-2.5">
                    <div className="w-8 h-8 rounded-full bg-blue-500/20 border border-blue-500/40 flex items-center justify-center font-bold text-xs text-blue-400">
                      🛡️
                    </div>
                    <div>
                      <h4 className="text-xs font-bold text-white">{session.grantedBy || 'Administrador'}</h4>
                      <span className="text-[10px] text-slate-400 block">
                        Utilizador: <strong className="text-slate-200">{session.userName}</strong>
                      </span>
                    </div>
                  </div>

                  <div className="text-right">
                    <span className="text-[10px] text-red-400 font-bold bg-red-500/10 px-1.5 py-0.5 rounded border border-red-500/30">
                      {session.remainingMinutes || 40} min restantes
                    </span>
                    <button
                      onClick={() => terminateEmergencySession(session.id)}
                      className="text-[10px] text-slate-400 hover:text-red-400 underline block mt-1"
                    >
                      Encerrar
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Activity Feed & User Tables Row */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Administradores Table */}
        <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-4 shadow-xl">
          <div className="flex items-center justify-between pb-3 mb-3 border-b border-slate-800">
            <h3 className="font-bold text-sm text-white">Administradores</h3>
            <button
              onClick={() => setCurrentView('users')}
              className="text-xs text-blue-400 font-bold hover:underline"
            >
              Ver todos
            </button>
          </div>

          <div className="space-y-2.5">
            {[
              { name: 'João Pedro', phone: '923 XXX XXX', last: '16:20' },
              { name: 'Maria Silva', phone: '929 XXX XXX', last: '16:18' },
              { name: 'António Lima', phone: '928 XXX XXX', last: '15:55' },
            ].map((adm, i) => (
              <div
                key={i}
                className="p-2.5 rounded-xl bg-slate-950/50 border border-slate-800/80 flex items-center justify-between text-xs"
              >
                <div className="flex items-center gap-2.5">
                  <div className="w-7 h-7 rounded-full bg-blue-500/20 text-blue-400 font-bold flex items-center justify-center text-[10px]">
                    {adm.name[0]}
                  </div>
                  <div>
                    <h4 className="font-bold text-white">{adm.name}</h4>
                    <span className="text-[10px] text-slate-500">{adm.phone}</span>
                  </div>
                </div>
                <div className="text-right">
                  <span className="text-[10px] text-emerald-400 font-bold">● {adm.last}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Utilizadores Table */}
        <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-4 shadow-xl">
          <div className="flex items-center justify-between pb-3 mb-3 border-b border-slate-800">
            <h3 className="font-bold text-sm text-white">Utilizadores Recentes</h3>
            <button
              onClick={() => setCurrentView('users')}
              className="text-xs text-blue-400 font-bold hover:underline"
            >
              Ver todos
            </button>
          </div>

          <div className="space-y-2.5">
            {[
              { name: 'Geovane Virgílio', assets: 5, date: '12/05/2024' },
              { name: 'Carlos Mendes', assets: 3, date: '18/03/2024' },
              { name: 'Ana Paula Silva', assets: 2, date: '02/06/2024' },
            ].map((u, i) => (
              <div
                key={i}
                className="p-2.5 rounded-xl bg-slate-950/50 border border-slate-800/80 flex items-center justify-between text-xs"
              >
                <div>
                  <h4 className="font-bold text-white">{u.name}</h4>
                  <span className="text-[10px] text-slate-400">{u.assets} ativos associados</span>
                </div>
                <span className="text-[10px] text-slate-500">{u.date}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Atividade Recente Feed (Image 2 match) */}
        <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-4 shadow-xl">
          <div className="flex items-center justify-between pb-3 mb-3 border-b border-slate-800">
            <h3 className="font-bold text-sm text-white">Atividade Recente</h3>
            <button
              onClick={() => setCurrentView('audit_logs')}
              className="text-xs text-blue-400 font-bold hover:underline"
            >
              Ver todos
            </button>
          </div>

          <div className="space-y-3">
            {activityFeed.slice(0, 4).map(act => (
              <div key={act.id} className="flex items-start gap-3 text-xs">
                <div className="w-2 h-2 rounded-full bg-emerald-400 mt-1.5 shrink-0" />
                <div className="flex-1">
                  <h5 className="font-bold text-white leading-tight">{act.title}</h5>
                  <p className="text-[11px] text-slate-400">{act.subtitle}</p>
                </div>
                <span className="text-[10px] text-slate-500 shrink-0">{act.timestamp}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Bottom Emergency Metrics Stats Bar (Image 2 match) */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-3.5 flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-red-500/20 text-red-400 flex items-center justify-center font-bold">
            🚨
          </div>
          <div>
            <span className="text-[10px] text-slate-400 font-bold block">Acessos de Emergência (Hoje)</span>
            <div className="flex items-center gap-2">
              <span className="text-lg font-extrabold text-white">3</span>
              <span className="text-[10px] text-red-400 font-bold flex items-center">
                <ArrowDownRight className="w-3 h-3" /> 25% vs ontem
              </span>
            </div>
          </div>
        </div>

        <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-3.5 flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-emerald-500/20 text-emerald-400 flex items-center justify-center font-bold">
            🚗
          </div>
          <div>
            <span className="text-[10px] text-slate-400 font-bold block">Ativos Online</span>
            <div className="flex items-center gap-2">
              <span className="text-lg font-extrabold text-white">182</span>
              <span className="text-[10px] text-emerald-400 font-bold flex items-center">
                <ArrowUpRight className="w-3 h-3" /> 9% vs ontem
              </span>
            </div>
          </div>
        </div>

        <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-3.5 flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-purple-500/20 text-purple-400 flex items-center justify-center font-bold">
            ✓
          </div>
          <div>
            <span className="text-[10px] text-slate-400 font-bold block">Alertas Resolvidos</span>
            <div className="flex items-center gap-2">
              <span className="text-lg font-extrabold text-white">12</span>
              <span className="text-[10px] text-emerald-400 font-bold flex items-center">
                <ArrowUpRight className="w-3 h-3" /> 20% vs ontem
              </span>
            </div>
          </div>
        </div>

        <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-3.5 flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-blue-500/20 text-blue-400 flex items-center justify-center font-bold">
            ⏱️
          </div>
          <div>
            <span className="text-[10px] text-slate-400 font-bold block">Tempo Médio de Resposta</span>
            <div className="flex items-center gap-2">
              <span className="text-lg font-extrabold text-white">3m 42s</span>
              <span className="text-[10px] text-emerald-400 font-bold flex items-center">
                <ArrowDownRight className="w-3 h-3" /> 15% vs ontem
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
