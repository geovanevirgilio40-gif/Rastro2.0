import React, { useState } from 'react';
import {
  Shield,
  ShieldAlert,
  UserCheck,
  KeyRound,
  Lock,
  Mail,
  User,
  Phone,
  FileText,
  ArrowRight,
  Sparkles,
  Eye,
  EyeOff,
  CheckCircle2,
  AlertCircle,
  HelpCircle,
  Smartphone,
  MapPin,
  Globe,
  Radio,
  Zap,
} from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { Role } from '../../types';

export const AuthScreen: React.FC = () => {
  const { users, login, registerUser, role, setRole } = useApp();

  const [activeTab, setActiveTab] = useState<'login' | 'register'>('login');
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [forgotPasswordModal, setForgotPasswordModal] = useState<boolean>(false);
  const [resetEmail, setResetEmail] = useState<string>('');
  const [resetSent, setResetSent] = useState<boolean>(false);

  // Login Form state
  const [loginEmail, setLoginEmail] = useState<string>('joao.silva@rastro.io');
  const [loginPassword, setLoginPassword] = useState<string>('••••••••');
  const [rememberMe, setRememberMe] = useState<boolean>(true);
  const [loginError, setLoginError] = useState<string>('');
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

  // Register Form state
  const [regName, setRegName] = useState<string>('');
  const [regEmail, setRegEmail] = useState<string>('');
  const [regPhone, setRegPhone] = useState<string>('');
  const [regCpf, setRegCpf] = useState<string>('');
  const [regRole, setRegRole] = useState<Role>('user');
  const [regPassword, setRegPassword] = useState<string>('');
  const [regConfirmPassword, setRegConfirmPassword] = useState<string>('');
  const [acceptTerms, setAcceptTerms] = useState<boolean>(true);
  const [regError, setRegError] = useState<string>('');

  const handleLoginSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoginError('');

    if (!loginEmail.trim() || !loginPassword.trim()) {
      setLoginError('Por favor preencha o e-mail e a palavra-passe.');
      return;
    }

    setIsSubmitting(true);
    setTimeout(() => {
      // Find matching user by email or pick user based on email domain/match
      const matched = users.find(u => u.email.toLowerCase() === loginEmail.toLowerCase().trim());
      if (matched) {
        login(matched);
      } else {
        // Fallback to active role user or first user
        const defaultUser = users.find(u => u.role === role) || users[0];
        login({
          ...defaultUser,
          email: loginEmail,
          name: loginEmail.split('@')[0].replace('.', ' '),
        });
      }
      setIsSubmitting(false);
    }, 600);
  };

  const handleRegisterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setRegError('');

    if (!regName.trim() || !regEmail.trim() || !regPassword.trim()) {
      setRegError('Por favor preencha os campos obrigatórios (Nome, Email e Palavra-passe).');
      return;
    }

    if (regPassword !== regConfirmPassword) {
      setRegError('As palavras-passe não coincidem. Verifique e tente novamente.');
      return;
    }

    if (!acceptTerms) {
      setRegError('Deverá aceitar os Termos de Serviço para continuar.');
      return;
    }

    setIsSubmitting(true);
    setTimeout(() => {
      registerUser({
        name: regName,
        email: regEmail,
        phone: regPhone || '+351 912 345 678',
        cpfOrId: regCpf || 'NIF-998877665',
        role: regRole,
        avatar:
          regRole === 'admin'
            ? 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80'
            : regRole === 'superadmin'
            ? 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=150&auto=format&fit=crop&q=80'
            : 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80',
        plan: regRole === 'user' ? 'Plano Pessoal' : 'Plano Empresarial Pro',
      });
      setIsSubmitting(false);
    }, 800);
  };

  const handleDemoLogin = (targetRole: Role) => {
    setRole(targetRole);
    const targetUser = users.find(u => u.role === targetRole) || users[0];
    login(targetUser);
  };

  const handleResetPassword = (e: React.FormEvent) => {
    e.preventDefault();
    if (!resetEmail) return;
    setResetSent(true);
    setTimeout(() => {
      setForgotPasswordModal(false);
      setResetSent(false);
      setResetEmail('');
    }, 2500);
  };

  return (
    <div className="min-h-screen bg-slate-950 bento-grid-pattern text-slate-100 flex flex-col justify-center items-center p-4 md:p-8 relative overflow-hidden">
      {/* Background Glow Accents */}
      <div className="absolute top-1/4 left-10 w-96 h-96 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-10 right-10 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl pointer-events-none" />

      {/* Header Brand */}
      <div className="mb-6 text-center space-y-2 z-10">
        <div className="inline-flex items-center gap-2.5 bg-slate-900/90 border border-slate-800 px-4 py-2 rounded-2xl shadow-xl backdrop-blur-md">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-emerald-500 to-teal-400 flex items-center justify-center shadow-lg shadow-emerald-500/30 text-slate-950 font-black">
            <ShieldAlert className="w-6 h-6 text-slate-950" />
          </div>
          <div className="text-left">
            <div className="flex items-center gap-1.5">
              <span className="font-extrabold text-2xl tracking-tight text-white">Rastro</span>
              <span className="bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 font-bold text-xs px-2 py-0.5 rounded-full">
                2.0
              </span>
            </div>
            <p className="text-[11px] text-slate-400 font-medium">
              Plataforma IoT de Rastreamento & Acesso de Emergência
            </p>
          </div>
        </div>
      </div>

      {/* Main Container Card */}
      <div className="w-full max-w-5xl grid grid-cols-1 lg:grid-cols-12 gap-6 z-10">
        {/* Left Bento Column: Auth Form Box (7 cols) */}
        <div className="lg:col-span-7 bento-card p-6 md:p-8 shadow-2xl flex flex-col justify-between">
          <div>
            {/* Auth Mode Toggle Tabs */}
            <div className="grid grid-cols-2 bg-slate-950 p-1.5 rounded-xl border border-slate-800/80 mb-6">
              <button
                onClick={() => {
                  setActiveTab('login');
                  setLoginError('');
                }}
                className={`py-2.5 rounded-lg text-xs font-bold transition-all flex items-center justify-center gap-2 ${
                  activeTab === 'login'
                    ? 'bg-emerald-500 text-slate-950 shadow-lg shadow-emerald-500/20'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                <KeyRound className="w-4 h-4" />
                Entrar na Conta
              </button>
              <button
                onClick={() => {
                  setActiveTab('register');
                  setRegError('');
                }}
                className={`py-2.5 rounded-lg text-xs font-bold transition-all flex items-center justify-center gap-2 ${
                  activeTab === 'register'
                    ? 'bg-emerald-500 text-slate-950 shadow-lg shadow-emerald-500/20'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                <UserCheck className="w-4 h-4" />
                Criar Nova Conta
              </button>
            </div>

            {/* TAB 1: LOGIN FORM */}
            {activeTab === 'login' && (
              <form onSubmit={handleLoginSubmit} className="space-y-4">
                <div>
                  <label className="block text-xs font-bold text-slate-300 mb-1.5">
                    E-mail ou Utilizador
                  </label>
                  <div className="relative">
                    <Mail className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
                    <input
                      type="text"
                      value={loginEmail}
                      onChange={e => setLoginEmail(e.target.value)}
                      placeholder="seu.email@rastro.io"
                      className="w-full bg-slate-950 border border-slate-800 rounded-xl pl-10 pr-4 py-2.5 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-emerald-500 transition-colors"
                      required
                    />
                  </div>
                </div>

                <div>
                  <div className="flex items-center justify-between mb-1.5">
                    <label className="text-xs font-bold text-slate-300">Palavra-passe</label>
                    <button
                      type="button"
                      onClick={() => setForgotPasswordModal(true)}
                      className="text-[11px] font-semibold text-emerald-400 hover:underline"
                    >
                      Esqueceu a palavra-passe?
                    </button>
                  </div>
                  <div className="relative">
                    <Lock className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
                    <input
                      type={showPassword ? 'text' : 'password'}
                      value={loginPassword}
                      onChange={e => setLoginPassword(e.target.value)}
                      placeholder="••••••••"
                      className="w-full bg-slate-950 border border-slate-800 rounded-xl pl-10 pr-10 py-2.5 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-emerald-500 transition-colors"
                      required
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-white"
                    >
                      {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                    </button>
                  </div>
                </div>

                <div className="flex items-center justify-between pt-1">
                  <label className="flex items-center gap-2 text-xs text-slate-400 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={rememberMe}
                      onChange={e => setRememberMe(e.target.checked)}
                      className="w-4 h-4 rounded border-slate-800 bg-slate-950 text-emerald-500 focus:ring-emerald-500"
                    />
                    <span>Manter sessão iniciada neste dispositivo</span>
                  </label>
                </div>

                {loginError && (
                  <div className="p-3 rounded-xl bg-red-500/10 border border-red-500/30 text-red-400 text-xs flex items-center gap-2">
                    <AlertCircle className="w-4 h-4 shrink-0" />
                    <span>{loginError}</span>
                  </div>
                )}

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full py-3 px-4 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-400 text-slate-950 font-black text-xs hover:brightness-110 active:scale-[0.99] transition-all shadow-lg shadow-emerald-500/20 flex items-center justify-center gap-2 mt-2"
                >
                  {isSubmitting ? (
                    <span className="animate-pulse">A autenticar...</span>
                  ) : (
                    <>
                      <span>Entrar no Portal Rastro 2.0</span>
                      <ArrowRight className="w-4 h-4" />
                    </>
                  )}
                </button>
              </form>
            )}

            {/* TAB 2: REGISTER FORM */}
            {activeTab === 'register' && (
              <form onSubmit={handleRegisterSubmit} className="space-y-3">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-bold text-slate-300 mb-1">
                      Nome Completo *
                    </label>
                    <div className="relative">
                      <User className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                      <input
                        type="text"
                        value={regName}
                        onChange={e => setRegName(e.target.value)}
                        placeholder="Ex: Maria Fernandes"
                        className="w-full bg-slate-950 border border-slate-800 rounded-xl pl-9 pr-3 py-2 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-emerald-500"
                        required
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-300 mb-1">
                      Endereço de E-mail *
                    </label>
                    <div className="relative">
                      <Mail className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                      <input
                        type="email"
                        value={regEmail}
                        onChange={e => setRegEmail(e.target.value)}
                        placeholder="maria@empresa.pt"
                        className="w-full bg-slate-950 border border-slate-800 rounded-xl pl-9 pr-3 py-2 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-emerald-500"
                        required
                      />
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-bold text-slate-300 mb-1">
                      Telefone de Contacto
                    </label>
                    <div className="relative">
                      <Phone className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                      <input
                        type="text"
                        value={regPhone}
                        onChange={e => setRegPhone(e.target.value)}
                        placeholder="+351 912 345 678"
                        className="w-full bg-slate-950 border border-slate-800 rounded-xl pl-9 pr-3 py-2 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-emerald-500"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-300 mb-1">
                      Documento NIF / CPF
                    </label>
                    <div className="relative">
                      <FileText className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                      <input
                        type="text"
                        value={regCpf}
                        onChange={e => setRegCpf(e.target.value)}
                        placeholder="289 102 938"
                        className="w-full bg-slate-950 border border-slate-800 rounded-xl pl-9 pr-3 py-2 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-emerald-500"
                      />
                    </div>
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-300 mb-1">
                    Tipo de Perfil Pretendido
                  </label>
                  <div className="grid grid-cols-2 gap-2">
                    <button
                      type="button"
                      onClick={() => setRegRole('user')}
                      className={`p-2.5 rounded-xl border text-left transition-all ${
                        regRole === 'user'
                          ? 'bg-emerald-500/10 border-emerald-500 text-emerald-400'
                          : 'bg-slate-950 border-slate-800 text-slate-400 hover:border-slate-700'
                      }`}
                    >
                      <span className="block font-bold text-xs text-white">Utilizador Pessoal</span>
                      <span className="text-[10px] text-slate-400 block">Rastreio de veículos e telemóvel</span>
                    </button>
                    <button
                      type="button"
                      onClick={() => setRegRole('admin')}
                      className={`p-2.5 rounded-xl border text-left transition-all ${
                        regRole === 'admin'
                          ? 'bg-blue-500/10 border-blue-500 text-blue-400'
                          : 'bg-slate-950 border-slate-800 text-slate-400 hover:border-slate-700'
                      }`}
                    >
                      <span className="block font-bold text-xs text-white">Gestor de Frota</span>
                      <span className="text-[10px] text-slate-400 block">Administração de frotas e alertas</span>
                    </button>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-bold text-slate-300 mb-1">
                      Palavra-passe *
                    </label>
                    <div className="relative">
                      <Lock className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                      <input
                        type="password"
                        value={regPassword}
                        onChange={e => setRegPassword(e.target.value)}
                        placeholder="••••••••"
                        className="w-full bg-slate-950 border border-slate-800 rounded-xl pl-9 pr-3 py-2 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-emerald-500"
                        required
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-300 mb-1">
                      Confirmar Palavra-passe *
                    </label>
                    <div className="relative">
                      <Lock className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                      <input
                        type="password"
                        value={regConfirmPassword}
                        onChange={e => setRegConfirmPassword(e.target.value)}
                        placeholder="••••••••"
                        className="w-full bg-slate-950 border border-slate-800 rounded-xl pl-9 pr-3 py-2 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-emerald-500"
                        required
                      />
                    </div>
                  </div>
                </div>

                <label className="flex items-center gap-2 text-xs text-slate-400 cursor-pointer pt-1">
                  <input
                    type="checkbox"
                    checked={acceptTerms}
                    onChange={e => setAcceptTerms(e.target.checked)}
                    className="w-4 h-4 rounded border-slate-800 bg-slate-950 text-emerald-500 focus:ring-emerald-500"
                  />
                  <span>
                    Concordo com os <strong className="text-slate-200">Termos de Serviço</strong> e{' '}
                    <strong className="text-slate-200">Política de Privacidade</strong>
                  </span>
                </label>

                {regError && (
                  <div className="p-2.5 rounded-xl bg-red-500/10 border border-red-500/30 text-red-400 text-xs flex items-center gap-2">
                    <AlertCircle className="w-4 h-4 shrink-0" />
                    <span>{regError}</span>
                  </div>
                )}

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full py-3 px-4 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-400 text-slate-950 font-black text-xs hover:brightness-110 active:scale-[0.99] transition-all shadow-lg shadow-emerald-500/20 flex items-center justify-center gap-2"
                >
                  {isSubmitting ? (
                    <span className="animate-pulse">A criar conta...</span>
                  ) : (
                    <>
                      <span>Criar Conta & Aceder Agora</span>
                      <ArrowRight className="w-4 h-4" />
                    </>
                  )}
                </button>
              </form>
            )}
          </div>

          {/* Quick Demo Login Switcher */}
          <div className="mt-8 pt-6 border-t border-slate-800/80">
            <div className="flex items-center justify-between mb-3">
              <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">
                Acesso Rápido de Teste (1-Clique)
              </span>
              <span className="text-[10px] text-emerald-400 bg-emerald-500/10 border border-emerald-500/30 px-2 py-0.5 rounded font-mono">
                Sessão Demonstrativa
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
              <button
                type="button"
                onClick={() => handleDemoLogin('user')}
                className="p-2.5 rounded-xl bg-slate-950 hover:bg-slate-900 border border-slate-800 hover:border-emerald-500/50 text-left transition-all group"
              >
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-white group-hover:text-emerald-400 transition-colors">
                    Utilizador
                  </span>
                  <UserCheck className="w-3.5 h-3.5 text-emerald-400" />
                </div>
                <span className="text-[10px] text-slate-400 block mt-0.5 truncate">
                  João Silva (Rastreio)
                </span>
              </button>

              <button
                type="button"
                onClick={() => handleDemoLogin('admin')}
                className="p-2.5 rounded-xl bg-slate-950 hover:bg-slate-900 border border-slate-800 hover:border-blue-500/50 text-left transition-all group"
              >
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-white group-hover:text-blue-400 transition-colors">
                    Administrador
                  </span>
                  <Shield className="w-3.5 h-3.5 text-blue-400" />
                </div>
                <span className="text-[10px] text-slate-400 block mt-0.5 truncate">
                  Carlos Mendes (Frota)
                </span>
              </button>

              <button
                type="button"
                onClick={() => handleDemoLogin('superadmin')}
                className="p-2.5 rounded-xl bg-slate-950 hover:bg-slate-900 border border-slate-800 hover:border-purple-500/50 text-left transition-all group"
              >
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-white group-hover:text-purple-400 transition-colors">
                    Super Admin
                  </span>
                  <Sparkles className="w-3.5 h-3.5 text-purple-400" />
                </div>
                <span className="text-[10px] text-slate-400 block mt-0.5 truncate">
                  Dra. Ana Valente (Chave)
                </span>
              </button>
            </div>
          </div>
        </div>

        {/* Right Bento Column: Platform Features & Security Showcase (5 cols) */}
        <div className="lg:col-span-5 space-y-4 flex flex-col justify-between">
          <div className="bento-card p-6 shadow-xl space-y-4">
            <div className="flex items-center gap-2">
              <Zap className="w-5 h-5 text-amber-400 animate-pulse" />
              <h3 className="text-sm font-bold text-white">Recursos de Alta Segurança</h3>
            </div>

            <div className="space-y-3">
              <div className="p-3 rounded-xl bg-slate-950/80 border border-slate-800/80 flex items-start gap-3">
                <div className="p-2 rounded-lg bg-emerald-500/20 text-emerald-400 shrink-0 mt-0.5">
                  <Radio className="w-4 h-4" />
                </div>
                <div>
                  <h4 className="text-xs font-bold text-white">Telemetria & GPS ao Vivo</h4>
                  <p className="text-[11px] text-slate-400 leading-relaxed mt-0.5">
                    Transmissão constante de coordenadas com apoio a cercas geográficas e alertas
                    instantâneos de velocidade.
                  </p>
                </div>
              </div>

              <div className="p-3 rounded-xl bg-slate-950/80 border border-slate-800/80 flex items-start gap-3">
                <div className="p-2 rounded-lg bg-red-500/20 text-red-400 shrink-0 mt-0.5">
                  <ShieldAlert className="w-4 h-4" />
                </div>
                <div>
                  <h4 className="text-xs font-bold text-white">Botão de Pânico & Corte de Ignição</h4>
                  <p className="text-[11px] text-slate-400 leading-relaxed mt-0.5">
                    Comandos de emergência em tempo real para bloqueio de motor e envio imediato de
                    socorro.
                  </p>
                </div>
              </div>

              <div className="p-3 rounded-xl bg-slate-950/80 border border-slate-800/80 flex items-start gap-3">
                <div className="p-2 rounded-lg bg-purple-500/20 text-purple-400 shrink-0 mt-0.5">
                  <KeyRound className="w-4 h-4" />
                </div>
                <div>
                  <h4 className="text-xs font-bold text-white">Acesso Duplo com Código 2FA</h4>
                  <p className="text-[11px] text-slate-400 leading-relaxed mt-0.5">
                    Aprovação de emergência via 2º fator identificador (CPF/NIF) com registos de
                    auditoria imutáveis.
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="bento-card p-5 shadow-xl bg-gradient-to-br from-slate-900 to-slate-950 border border-emerald-500/30">
            <div className="flex items-center justify-between mb-2">
              <span className="text-[10px] font-bold text-emerald-400 uppercase tracking-widest flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                Status do Servidor IoT
              </span>
              <span className="text-[10px] text-slate-400 font-mono">99.98% Uptime</span>
            </div>
            <div className="grid grid-cols-2 gap-2 text-center pt-2 border-t border-slate-800">
              <div className="p-2 rounded-lg bg-slate-950">
                <span className="text-lg font-black text-white">100%</span>
                <span className="text-[10px] text-slate-400 block">Encriptação AES-256</span>
              </div>
              <div className="p-2 rounded-lg bg-slate-950">
                <span className="text-lg font-black text-emerald-400">&lt; 15ms</span>
                <span className="text-[10px] text-slate-400 block">Latência de Sinal</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Forgot Password Modal */}
      {forgotPasswordModal && (
        <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-md flex items-center justify-center p-4">
          <div className="bento-card p-6 max-w-md w-full shadow-2xl space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-slate-800">
              <div className="flex items-center gap-2">
                <HelpCircle className="w-5 h-5 text-emerald-400" />
                <h3 className="font-bold text-white text-sm">Recuperar Palavra-passe</h3>
              </div>
              <button
                onClick={() => setForgotPasswordModal(false)}
                className="text-slate-400 hover:text-white"
              >
                ✕
              </button>
            </div>

            {resetSent ? (
              <div className="py-6 text-center space-y-3">
                <CheckCircle2 className="w-12 h-12 text-emerald-400 mx-auto animate-bounce" />
                <h4 className="font-bold text-white text-sm">Instruções Enviadas!</h4>
                <p className="text-xs text-slate-300">
                  Enviámos um link de redefinição seguro para <strong className="text-white">{resetEmail}</strong>. Verifique a sua caixa de entrada.
                </p>
              </div>
            ) : (
              <form onSubmit={handleResetPassword} className="space-y-4">
                <p className="text-xs text-slate-300 leading-relaxed">
                  Insira o e-mail associado à sua conta para receber um link de redefinição de
                  palavra-passe em segundos.
                </p>

                <div>
                  <label className="block text-xs font-bold text-slate-300 mb-1">
                    Endereço de E-mail
                  </label>
                  <input
                    type="email"
                    value={resetEmail}
                    onChange={e => setResetEmail(e.target.value)}
                    placeholder="seu.email@rastro.io"
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2.5 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-emerald-500"
                    required
                  />
                </div>

                <div className="flex items-center justify-end gap-2 pt-2">
                  <button
                    type="button"
                    onClick={() => setForgotPasswordModal(false)}
                    className="px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-xs text-slate-300 font-semibold"
                  >
                    Cancelar
                  </button>
                  <button
                    type="submit"
                    className="px-4 py-2 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 text-xs font-bold"
                  >
                    Enviar Link
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      )}
    </div>
  );
};
