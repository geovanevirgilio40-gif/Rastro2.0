import React from 'react';
import {
  Users,
  Shield,
  Smartphone,
  Zap,
  ArrowUpRight,
  ArrowDownRight,
  Clock,
  Eye,
  CheckCircle2,
  Activity,
  Server,
  Database,
  Filter,
  Maximize2,
  TrendingUp,
  ShieldCheck,
  Percent,
} from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { LeafletMap } from '../LeafletMap';

export const SuperAdminDashboard: React.FC = () => {
  const { emergencyRequests, setCurrentView } = useApp();

  const activeEmergencyAccesses = emergencyRequests.filter(r => r.status === 'active');

  return (
    <div className="space-y-6 text-slate-100">
      {/* Title Header */}
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-black text-white tracking-tight">Painel Principal - Super Admin</h1>
          <p className="text-xs text-slate-400 mt-1">
            Visão geral completa e infraestrutura global do sistema Rastro 2.0
          </p>
        </div>
        <div className="flex items-center gap-2">
          <span className="px-3 py-1 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/30 text-xs font-bold flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            Servidores Operacionais (99.99% Uptime)
          </span>
        </div>
      </div>

      {/* Top 4 KPI Cards with Sparklines (Image 3 match) */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Card 1: Utilizadores Totais */}
        <div className="bento-card p-4 shadow-xl">
          <div className="flex items-center justify-between">
            <div>
              <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">
                Utilizadores Totais
              </span>
              <div className="flex items-baseline gap-2 mt-1">
                <span className="text-2xl font-extrabold text-white">1.254</span>
                <span className="text-xs font-bold text-emerald-400 flex items-center">
                  <ArrowUpRight className="w-3.5 h-3.5" /> 8,2%
                </span>
              </div>
              <span className="text-[10px] text-slate-500 block mt-0.5">+95 esta semana</span>
            </div>
            <div className="w-11 h-11 rounded-full bg-blue-600 flex items-center justify-center text-white shadow-lg shadow-blue-600/30">
              <Users className="w-5 h-5" />
            </div>
          </div>
          {/* Sparkline chart SVG */}
          <div className="mt-3 pt-2 border-t border-slate-800/80">
            <svg className="w-full h-8 text-emerald-500" viewBox="0 0 100 25" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M0 20 Q 25 15, 50 10 T 100 2" />
            </svg>
          </div>
        </div>

        {/* Card 2: Administradores */}
        <div className="bento-card p-4 shadow-xl">
          <div className="flex items-center justify-between">
            <div>
              <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">
                Administradores
              </span>
              <div className="flex items-baseline gap-2 mt-1">
                <span className="text-2xl font-extrabold text-white">28</span>
                <span className="text-xs font-bold text-emerald-400 flex items-center">
                  <ArrowUpRight className="w-3.5 h-3.5" /> 7,7%
                </span>
              </div>
              <span className="text-[10px] text-slate-500 block mt-0.5">+2 esta semana</span>
            </div>
            <div className="w-11 h-11 rounded-full bg-emerald-600 flex items-center justify-center text-slate-950 shadow-lg shadow-emerald-600/30">
              <Shield className="w-5 h-5" />
            </div>
          </div>
          <div className="mt-3 pt-2 border-t border-slate-800/80">
            <svg className="w-full h-8 text-emerald-500" viewBox="0 0 100 25" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M0 18 Q 25 18, 50 12 T 100 5" />
            </svg>
          </div>
        </div>

        {/* Card 3: Ativos Registados */}
        <div className="bento-card p-4 shadow-xl">
          <div className="flex items-center justify-between">
            <div>
              <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">
                Ativos Registados
              </span>
              <div className="flex items-baseline gap-2 mt-1">
                <span className="text-2xl font-extrabold text-white">3.842</span>
                <span className="text-xs font-bold text-emerald-400 flex items-center">
                  <ArrowUpRight className="w-3.5 h-3.5" /> 5,4%
                </span>
              </div>
              <span className="text-[10px] text-slate-500 block mt-0.5">+197 esta semana</span>
            </div>
            <div className="w-11 h-11 rounded-full bg-purple-600 flex items-center justify-center text-white shadow-lg shadow-purple-600/30">
              <Smartphone className="w-5 h-5" />
            </div>
          </div>
          <div className="mt-3 pt-2 border-t border-slate-800/80">
            <svg className="w-full h-8 text-purple-400" viewBox="0 0 100 25" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M0 22 Q 25 15, 50 18 T 100 4" />
            </svg>
          </div>
        </div>

        {/* Card 4: Acessos de Emergência */}
        <div className="bento-card p-4 shadow-xl">
          <div className="flex items-center justify-between">
            <div>
              <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">
                Acessos de Emergência
              </span>
              <div className="flex items-baseline gap-2 mt-1">
                <span className="text-2xl font-extrabold text-white">15</span>
                <span className="text-xs font-bold text-amber-400 flex items-center">
                  <ArrowDownRight className="w-3.5 h-3.5" /> 11,8%
                </span>
              </div>
              <span className="text-[10px] text-slate-500 block mt-0.5">esta semana</span>
            </div>
            <div className="w-11 h-11 rounded-full bg-amber-500 flex items-center justify-center text-slate-950 shadow-lg shadow-amber-500/30">
              <Zap className="w-5 h-5" />
            </div>
          </div>
          <div className="mt-3 pt-2 border-t border-slate-800/80">
            <svg className="w-full h-8 text-amber-500" viewBox="0 0 100 25" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M0 10 Q 25 20, 50 12 T 100 22" />
            </svg>
          </div>
        </div>
      </div>

      {/* Main Row: Luanda Live Map (Left) & Active Emergency Accesses Table (Right) */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Map Column */}
        <div className="lg:col-span-2 space-y-4">
          <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-4 shadow-xl">
            <div className="flex items-center justify-between pb-3 mb-3 border-b border-slate-800">
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse" />
                <h3 className="font-bold text-sm text-white">Monitoramento em Tempo Real (Luanda)</h3>
              </div>
              <div className="flex items-center gap-2">
                <select className="bg-slate-800 text-xs border border-slate-700 rounded-lg px-2.5 py-1 text-slate-200">
                  <option>Todos os ativos</option>
                  <option>Luanda</option>
                  <option>São Paulo</option>
                  <option>Fortaleza</option>
                </select>
                <button
                  onClick={() => setCurrentView('live_map')}
                  className="p-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300"
                >
                  <Maximize2 className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>

            <div className="h-[380px] w-full">
              <LeafletMap center={[-8.8390, 13.2894]} zoom={11} showDetailsOverlay={false} />
            </div>

            {/* Bottom telemetry stats */}
            <div className="mt-3 pt-3 border-t border-slate-800 grid grid-cols-2 sm:grid-cols-4 gap-2 text-center text-xs">
              <div>
                <span className="text-slate-400 font-semibold block">Total Online:</span>
                <span className="font-extrabold text-emerald-400 text-sm">2.987</span>
              </div>
              <div>
                <span className="text-slate-400 font-semibold block">Total Offline:</span>
                <span className="font-extrabold text-red-400 text-sm">855</span>
              </div>
              <div>
                <span className="text-slate-400 font-semibold block">Atualização Média:</span>
                <span className="font-extrabold text-white text-sm">8s</span>
              </div>
              <div>
                <span className="text-slate-400 font-semibold block">Precisão Média:</span>
                <span className="font-extrabold text-blue-400 text-sm">4.2 m</span>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column: Active Emergency Accesses Table (Image 3 match) */}
        <div className="space-y-6">
          <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-4 shadow-xl">
            <div className="flex items-center justify-between pb-3 mb-3 border-b border-slate-800">
              <h3 className="font-bold text-sm text-white">Acessos de Emergência Ativos</h3>
              <button
                onClick={() => setCurrentView('emergency')}
                className="text-xs text-blue-400 font-bold hover:underline"
              >
                Ver todos
              </button>
            </div>

            <div className="space-y-3">
              {activeEmergencyAccesses.map((acc, i) => (
                <div
                  key={acc.id}
                  className="p-3 rounded-xl bg-slate-950/70 border border-slate-800 space-y-2 text-xs"
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <div className="w-7 h-7 rounded-full bg-blue-500/20 text-blue-400 font-bold flex items-center justify-center text-[10px]">
                        👤
                      </div>
                      <div>
                        <h4 className="font-bold text-white">{acc.grantedBy || 'João Pedro'}</h4>
                        <span className="text-[10px] text-emerald-400 font-bold">● Online</span>
                      </div>
                    </div>
                    <span className="bg-red-500/20 text-red-400 border border-red-500/30 font-bold text-[10px] px-2 py-0.5 rounded">
                      {acc.motivo}
                    </span>
                  </div>

                  <div className="flex items-center justify-between text-[11px] text-slate-400">
                    <span>Utilizador: <strong className="text-white">{acc.userName}</strong></span>
                    <span>Início: {acc.grantedAt || '16:20'}</span>
                  </div>

                  <div className="space-y-1 pt-1 border-t border-slate-800">
                    <div className="flex items-center justify-between text-[10px]">
                      <span className="text-slate-400">Duração Restante:</span>
                      <span className="font-extrabold text-emerald-400">{acc.remainingMinutes || 40} min restantes</span>
                    </div>
                    <div className="w-full bg-slate-800 h-1.5 rounded-full overflow-hidden">
                      <div
                        className="bg-emerald-500 h-full rounded-full transition-all"
                        style={{ width: `${((acc.remainingMinutes || 40) / 60) * 100}%` }}
                      />
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <button
              onClick={() => setCurrentView('emergency')}
              className="w-full mt-4 py-2 bg-slate-800 hover:bg-slate-700 text-xs font-bold text-slate-200 rounded-xl transition-colors"
            >
              Ver todos os acessos de emergência
            </button>
          </div>
        </div>
      </div>

      {/* System Performance & Integrity Metrics (Image 3 bottom bar) */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-4 flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-blue-500/20 text-blue-400 flex items-center justify-center font-bold">
            <Clock className="w-5 h-5" />
          </div>
          <div>
            <span className="text-[10px] text-slate-400 font-bold block">Tempo Médio de Resposta (Hoje)</span>
            <div className="flex items-baseline gap-2">
              <span className="text-lg font-extrabold text-white">2m 34s</span>
              <span className="text-[10px] text-emerald-400 font-bold">↓ 8,6%</span>
            </div>
            <span className="text-[10px] text-slate-500 block">Comparado com ontem (2m 48s)</span>
          </div>
        </div>

        <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-4 flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-emerald-500/20 text-emerald-400 flex items-center justify-center font-bold">
            <ShieldCheck className="w-5 h-5" />
          </div>
          <div>
            <span className="text-[10px] text-slate-400 font-bold block">Emergências Concluídas (Hoje)</span>
            <div className="flex items-baseline gap-2">
              <span className="text-lg font-extrabold text-white">7</span>
              <span className="text-[10px] text-emerald-400 font-bold">↑ 40%</span>
            </div>
            <span className="text-[10px] text-slate-500 block">Comparado com ontem (5)</span>
          </div>
        </div>

        <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-4 flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-purple-500/20 text-purple-400 flex items-center justify-center font-bold">
            <Percent className="w-5 h-5" />
          </div>
          <div>
            <span className="text-[10px] text-slate-400 font-bold block">Taxa de Conclusão</span>
            <div className="flex items-baseline gap-2">
              <span className="text-lg font-extrabold text-white">96.5%</span>
              <span className="text-[10px] text-emerald-400 font-bold">↑ 2,1%</span>
            </div>
            <span className="text-[10px] text-slate-500 block">Últimos 30 dias</span>
          </div>
        </div>

        <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-4 flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-emerald-500/20 text-emerald-400 flex items-center justify-center font-bold">
            <Server className="w-5 h-5" />
          </div>
          <div>
            <span className="text-[10px] text-slate-400 font-bold block">Integridade do Sistema</span>
            <div className="flex items-baseline gap-2">
              <span className="text-lg font-extrabold text-emerald-400">100%</span>
            </div>
            <span className="text-[10px] text-emerald-400 block font-semibold">Tudo funcionando normalmente</span>
          </div>
        </div>
      </div>
    </div>
  );
};
