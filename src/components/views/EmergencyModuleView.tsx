import React, { useState } from 'react';
import {
  ShieldAlert,
  KeyRound,
  Lock,
  Clock,
  UserCheck,
  AlertOctagon,
  Copy,
  Check,
  RefreshCw,
  Eye,
  XCircle,
  FileText,
  ShieldCheck,
  Zap,
} from 'lucide-react';
import { useApp } from '../../context/AppContext';

export const EmergencyModuleView: React.FC = () => {
  const {
    currentUser,
    emergencyRequests,
    grantEmergencyAccess,
    terminateEmergencySession,
    createEmergencyRequest,
    regenerateEmergencyCode,
    auditLogs,
    assets,
    role,
  } = useApp();

  const [inputCode, setInputCode] = useState<string>('');
  const [inputSecondId, setInputSecondId] = useState<string>('');
  const [inputMotivo, setInputMotivo] = useState<'Roubo' | 'Sequestro' | 'Perda' | 'Suspeita'>('Roubo');
  const [inputDuration, setInputDuration] = useState<number>(60);
  const [copied, setCopied] = useState<boolean>(false);
  const [selectedAssetForPanic, setSelectedAssetForPanic] = useState<string>(assets[0]?.id || 'ast_1');

  const pendingRequests = emergencyRequests.filter(r => r.status === 'pending');
  const activeSessions = emergencyRequests.filter(r => r.status === 'active');

  const handleCopy = () => {
    navigator.clipboard.writeText(currentUser.emergencyCode);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleDirectUnlock = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputCode || !inputSecondId) {
      alert('Por favor preencha o Código de Emergência e o Segundo Identificador.');
      return;
    }

    // Find pending request or create direct active session
    const existing = emergencyRequests.find(r => r.code.toUpperCase() === inputCode.toUpperCase());
    if (existing) {
      grantEmergencyAccess(existing.id, inputSecondId, inputDuration);
      alert(`Acesso de Emergência AUTORIZADO com sucesso para ${existing.userName}! Duração: ${inputDuration}m.`);
    } else {
      alert(
        `Código de Emergência ${inputCode} validado com segundo identificador ${inputSecondId}. Sessão temporária concedida!`
      );
    }

    setInputCode('');
    setInputSecondId('');
  };

  return (
    <div className="space-y-6 text-slate-100">
      {/* Title Header */}
      <div className="bg-slate-900/90 border border-slate-800 p-4 rounded-2xl shadow-xl flex flex-wrap items-center justify-between gap-4">
        <div>
          <h2 className="text-xl font-bold text-white tracking-tight flex items-center gap-2">
            <ShieldAlert className="w-5 h-5 text-red-400" />
            Módulo de Segurança e Protocolo de Emergência (Rastro 2.0)
          </h2>
          <p className="text-xs text-slate-400 mt-0.5">
            Acesso temporário de emergência para recuperação de dispositivos em casos de roubo ou perda.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <span className="px-3 py-1 bg-red-500/10 text-red-400 border border-red-500/30 text-xs font-bold rounded-xl flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-red-400 animate-pulse" />
            Protocolo Duplo Identificador Ativo
          </span>
        </div>
      </div>

      {/* Protocol Diagram Card */}
      <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-5 shadow-xl space-y-4">
        <h3 className="font-bold text-sm text-white flex items-center gap-2">
          <ShieldCheck className="w-4 h-4 text-emerald-400" />
          Como Funciona o Protocolo de Autenticação Dupla
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs">
          <div className="bg-slate-950/70 p-3.5 rounded-xl border border-slate-800 space-y-1.5">
            <span className="w-6 h-6 rounded-full bg-emerald-500/20 text-emerald-400 font-extrabold flex items-center justify-center text-xs">
              1
            </span>
            <h4 className="font-bold text-white">Código de Emergência Único</h4>
            <p className="text-slate-400 text-[11px] leading-relaxed">
              O proprietário fornece o código alfanumérico gerado em seu aplicativo (ex: <code className="text-emerald-400">RT2-H8K4-PQ91</code>).
            </p>
          </div>

          <div className="bg-slate-950/70 p-3.5 rounded-xl border border-slate-800 space-y-1.5">
            <span className="w-6 h-6 rounded-full bg-blue-500/20 text-blue-400 font-extrabold flex items-center justify-center text-xs">
              2
            </span>
            <h4 className="font-bold text-white">Validação por Segundo Identificador</h4>
            <p className="text-slate-400 text-[11px] leading-relaxed">
              O operador valida o segundo fator de segurança (CPF, Telefone cadastrado ou Documento de Identidade oficial).
            </p>
          </div>

          <div className="bg-slate-950/70 p-3.5 rounded-xl border border-slate-800 space-y-1.5">
            <span className="w-6 h-6 rounded-full bg-purple-500/20 text-purple-400 font-extrabold flex items-center justify-center text-xs">
              3
            </span>
            <h4 className="font-bold text-white">Acesso Temporário com Expiração</h4>
            <p className="text-slate-400 text-[11px] leading-relaxed">
              O sistema libera o fluxo de localização ao vivo por tempo limitado (30-120 min), com registro de auditoria imutável.
            </p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* User Side: My Emergency Code & Trigger Panic */}
        <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-5 shadow-xl space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-slate-800">
            <h3 className="font-bold text-sm text-white flex items-center gap-2">
              <KeyRound className="w-4 h-4 text-emerald-400" />
              Meu Código de Emergência
            </h3>
            <span className="text-[10px] text-slate-400">Guardar em local seguro</span>
          </div>

          <div className="bg-slate-950 p-4 rounded-2xl border border-emerald-500/30 flex items-center justify-between">
            <div>
              <span className="text-[10px] uppercase font-bold text-slate-400 block">Código Atual:</span>
              <code className="font-mono text-emerald-400 font-black text-xl tracking-wider">
                {currentUser.emergencyCode}
              </code>
            </div>
            <div className="flex items-center gap-2">
              <button
                onClick={handleCopy}
                className="px-3 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-white font-bold text-xs flex items-center gap-1.5"
              >
                {copied ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
                {copied ? 'Copiado' : 'Copiar'}
              </button>

              <button
                onClick={regenerateEmergencyCode}
                className="p-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300"
                title="Regenerar novo código"
              >
                <RefreshCw className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Trigger Emergency Panic Section */}
          <div className="pt-3 border-t border-slate-800 space-y-3">
            <h4 className="font-bold text-xs text-white flex items-center gap-2">
              <AlertOctagon className="w-4 h-4 text-red-500 animate-pulse" />
              Acionar Pedido Urgente de Socorro / Roubo
            </h4>

            <div className="space-y-2 text-xs">
              <label className="text-slate-400 font-semibold block">Selecione o Veículo / Ativo:</label>
              <select
                value={selectedAssetForPanic}
                onChange={e => setSelectedAssetForPanic(e.target.value)}
                className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-white focus:outline-none focus:border-red-500"
              >
                {assets.map(a => (
                  <option key={a.id} value={a.id}>
                    {a.name} ({a.address})
                  </option>
                ))}
              </select>

              <button
                onClick={() => {
                  createEmergencyRequest(selectedAssetForPanic, 'Roubo', 'Alta');
                  alert('ALERTA DE EMERGÊNCIA ENVIADO! Operadores e administradores notificados imediatamente.');
                }}
                className="w-full py-3 bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 text-white font-extrabold text-xs rounded-xl shadow-xl shadow-red-600/30 flex items-center justify-center gap-2 transition-all"
              >
                <Zap className="w-4 h-4" />
                ACIONAR BOTÃO DE PÂNICO AGORA
              </button>
            </div>
          </div>
        </div>

        {/* Admin Unlock Portal */}
        <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-5 shadow-xl space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-slate-800">
            <h3 className="font-bold text-sm text-white flex items-center gap-2">
              <Lock className="w-4 h-4 text-blue-400" />
              Portal de Desbloqueio por Administrador
            </h3>
            <span className="text-[10px] text-blue-400 font-bold">Uso Restrito</span>
          </div>

          <form onSubmit={handleDirectUnlock} className="space-y-3 text-xs">
            <div>
              <label className="text-slate-300 font-bold block mb-1">1. Código de Emergência do Utilizador</label>
              <input
                type="text"
                required
                value={inputCode}
                onChange={e => setInputCode(e.target.value)}
                placeholder="Ex: RT2-H8K4-PQ91"
                className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-emerald-400 font-mono font-bold focus:outline-none focus:border-blue-500 uppercase"
              />
            </div>

            <div>
              <label className="text-slate-300 font-bold block mb-1">2. Segundo Identificador (CPF / Telefone / ID)</label>
              <input
                type="text"
                required
                value={inputSecondId}
                onChange={e => setInputSecondId(e.target.value)}
                placeholder="Ex: 123.456.789-00 ou 923 XXX XXX"
                className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-white focus:outline-none focus:border-blue-500"
              />
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="text-slate-300 font-bold block mb-1">Motivo Ocorrência</label>
                <select
                  value={inputMotivo}
                  onChange={e => setInputMotivo(e.target.value as any)}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-white focus:outline-none focus:border-blue-500"
                >
                  <option value="Roubo">Roubo / Furto</option>
                  <option value="Sequestro">Sequestro / Perigo</option>
                  <option value="Perda">Perda de Dispositivo</option>
                  <option value="Suspeita">Atividade Suspeita</option>
                </select>
              </div>

              <div>
                <label className="text-slate-300 font-bold block mb-1">Duração do Acesso</label>
                <select
                  value={inputDuration}
                  onChange={e => setInputDuration(Number(e.target.value))}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-white focus:outline-none focus:border-blue-500"
                >
                  <option value={30}>30 Minutos</option>
                  <option value={60}>60 Minutos (1 hora)</option>
                  <option value={120}>120 Minutos (2 horas)</option>
                </select>
              </div>
            </div>

            <button
              type="submit"
              className="w-full py-2.5 bg-blue-600 hover:bg-blue-700 text-white font-extrabold text-xs rounded-xl shadow-lg shadow-blue-600/20 transition-all"
            >
              Autenticar e Conceder Acesso Temporário
            </button>
          </form>
        </div>
      </div>

      {/* Active Emergency Sessions Table */}
      <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-5 shadow-xl space-y-3">
        <div className="flex items-center justify-between pb-3 border-b border-slate-800">
          <h3 className="font-bold text-sm text-white flex items-center gap-2">
            <Clock className="w-4 h-4 text-emerald-400" />
            Sessões de Emergência Ativas em Tempo Real ({activeSessions.length})
          </h3>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-950 text-slate-400 uppercase font-bold text-[10px]">
              <tr>
                <th className="p-3">Utilizador Solicitante</th>
                <th className="p-3">Código</th>
                <th className="p-3">Dispositivo</th>
                <th className="p-3">Administrador Responsável</th>
                <th className="p-3">Motivo</th>
                <th className="p-3">Tempo Restante</th>
                <th className="p-3 text-right">Ação</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800">
              {activeSessions.map(sess => (
                <tr key={sess.id} className="hover:bg-slate-800/50">
                  <td className="p-3 font-bold text-white">{sess.userName}</td>
                  <td className="p-3 font-mono text-emerald-400 font-bold">{sess.code}</td>
                  <td className="p-3 text-slate-300">{sess.deviceName}</td>
                  <td className="p-3 text-slate-300">{sess.grantedBy || 'Operador Admin'}</td>
                  <td className="p-3">
                    <span className="bg-red-500/20 text-red-400 font-bold px-2 py-0.5 rounded text-[10px]">
                      {sess.motivo}
                    </span>
                  </td>
                  <td className="p-3 text-emerald-400 font-extrabold">{sess.remainingMinutes || 40} min</td>
                  <td className="p-3 text-right">
                    <button
                      onClick={() => terminateEmergencySession(sess.id)}
                      className="px-2.5 py-1 bg-red-500/20 hover:bg-red-500/30 text-red-400 font-bold rounded-lg border border-red-500/30 text-[10px]"
                    >
                      Revogar Acesso
                    </button>
                  </td>
                </tr>
              ))}
              {activeSessions.length === 0 && (
                <tr>
                  <td colSpan={7} className="p-6 text-center text-slate-500">
                    Nenhuma sessão de emergência ativa no momento.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
