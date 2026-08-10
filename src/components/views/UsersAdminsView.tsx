import React, { useState } from 'react';
import { Users, Shield, Search, KeyRound, CheckCircle2, UserCheck, Plus } from 'lucide-react';
import { mockUsers, mockAdmins } from '../../data/mockData';

export const UsersAdminsView: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [activeTab, setActiveTab] = useState<'users' | 'admins'>('users');

  const usersList = mockUsers;
  const adminsList = mockAdmins;

  return (
    <div className="space-y-6 text-slate-100">
      <div className="bg-slate-900/90 border border-slate-800 p-4 rounded-2xl shadow-xl flex flex-wrap items-center justify-between gap-4">
        <div>
          <h2 className="text-xl font-bold text-white tracking-tight flex items-center gap-2">
            <Users className="w-5 h-5 text-blue-400" />
            Gestão de Utilizadores e Administradores
          </h2>
          <p className="text-xs text-slate-400 mt-0.5">
            Gerencie perfis, planos de assinatura, permissões de suporte e códigos de emergência associados.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <div className="flex bg-slate-950 p-1 rounded-xl border border-slate-800 text-xs font-bold">
            <button
              onClick={() => setActiveTab('users')}
              className={`px-3 py-1.5 rounded-lg transition-colors ${
                activeTab === 'users' ? 'bg-blue-600 text-white font-bold' : 'text-slate-400'
              }`}
            >
              Utilizadores ({usersList.length})
            </button>
            <button
              onClick={() => setActiveTab('admins')}
              className={`px-3 py-1.5 rounded-lg transition-colors ${
                activeTab === 'admins' ? 'bg-blue-600 text-white font-bold' : 'text-slate-400'
              }`}
            >
              Administradores ({adminsList.length})
            </button>
          </div>
        </div>
      </div>

      <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-4 shadow-xl overflow-x-auto">
        <table className="w-full text-left text-xs">
          <thead className="bg-slate-950 text-slate-400 uppercase font-bold text-[10px]">
            <tr>
              <th className="p-3">Nome / Email</th>
              <th className="p-3">Telefone</th>
              <th className="p-3">Código de Emergência</th>
              <th className="p-3">Plano / Cargo</th>
              <th className="p-3">Ativos</th>
              <th className="p-3">Data Registro</th>
              <th className="p-3 text-right">Ação</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-800">
            {(activeTab === 'users' ? usersList : adminsList).map(u => (
              <tr key={u.id} className="hover:bg-slate-800/50">
                <td className="p-3">
                  <div className="flex items-center gap-2.5">
                    <img src={u.avatar} alt={u.name} className="w-8 h-8 rounded-full object-cover border border-slate-700" />
                    <div>
                      <h4 className="font-bold text-white">{u.name}</h4>
                      <span className="text-[10px] text-slate-400">{u.email}</span>
                    </div>
                  </div>
                </td>
                <td className="p-3 text-slate-300 font-mono">{u.phone}</td>
                <td className="p-3 font-mono text-emerald-400 font-bold">{u.emergencyCode}</td>
                <td className="p-3">
                  <span className="bg-blue-500/10 text-blue-400 border border-blue-500/30 px-2 py-0.5 rounded text-[10px] font-bold">
                    {u.plan}
                  </span>
                </td>
                <td className="p-3 font-bold text-white">{u.assetsCount}</td>
                <td className="p-3 text-slate-400">{u.registeredAt}</td>
                <td className="p-3 text-right">
                  <button
                    onClick={() => alert(`Gerenciando permissões de ${u.name}...`)}
                    className="px-2.5 py-1 bg-slate-800 hover:bg-slate-700 text-slate-200 font-bold rounded-lg text-[10px]"
                  >
                    Editar
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};
