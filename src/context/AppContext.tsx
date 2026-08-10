import React, { createContext, useContext, useState, useEffect } from 'react';
import {
  Role,
  Asset,
  UserProfile,
  EmergencyRequest,
  Geofence,
  AlertItem,
  AuditLogItem,
  ActivityFeedItem,
} from '../types';
import {
  mockUsers,
  mockAdmins,
  initialAssets,
  initialEmergencyRequests,
  initialAlerts,
  initialGeofences,
  initialAuditLogs,
  initialActivityFeed,
} from '../data/mockData';

interface AppContextType {
  role: Role;
  setRole: (role: Role) => void;
  currentView: string;
  setCurrentView: (view: string) => void;
  theme: 'dark' | 'light';
  setTheme: (theme: 'dark' | 'light') => void;
  toggleTheme: () => void;
  isAuthenticated: boolean;
  setIsAuthenticated: (auth: boolean) => void;
  mobileMenuOpen: boolean;
  setMobileMenuOpen: (open: boolean) => void;
  currentUser: UserProfile;
  users: UserProfile[];
  login: (user: UserProfile) => void;
  logout: () => void;
  registerUser: (newUser: Omit<UserProfile, 'id' | 'emergencyCode' | 'registeredAt' | 'assetsCount' | 'lastAccess'>) => void;
  assets: Asset[];
  selectedAssetId: string | null;
  setSelectedAssetId: (id: string | null) => void;
  selectedAsset: Asset | undefined;
  emergencyRequests: EmergencyRequest[];
  geofences: Geofence[];
  alerts: AlertItem[];
  auditLogs: AuditLogItem[];
  activityFeed: ActivityFeedItem[];
  simulationActive: boolean;
  setSimulationActive: (active: boolean) => void;
  grantEmergencyAccess: (requestId: string, secondIdentifier: string, durationMinutes?: number) => void;
  terminateEmergencySession: (requestId: string) => void;
  createEmergencyRequest: (deviceId: string, motivo: 'Roubo' | 'Sequestro' | 'Perda' | 'Suspeita', priority: 'Alta' | 'Média' | 'Baixa') => void;
  triggerPanic: (assetId: string) => void;
  toggleEngineBlock: (assetId: string) => void;
  toggleAlarm: (assetId: string) => void;
  toggleLostMode: (assetId: string) => void;
  regenerateEmergencyCode: () => void;
  addGeofence: (geofence: Omit<Geofence, 'id'>) => void;
  deleteGeofence: (id: string) => void;
  resolveAlert: (id: string) => void;
  clearAllAlerts: () => void;
  searchQuery: string;
  setSearchQuery: (q: string) => void;
  soundEnabled: boolean;
  setSoundEnabled: (enabled: boolean) => void;
  notificationsCount: number;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [role, setRoleState] = useState<Role>('user');
  const [currentView, setCurrentView] = useState<string>('dashboard');
  const [theme, setTheme] = useState<'dark' | 'light'>('dark');
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(true);
  const [mobileMenuOpen, setMobileMenuOpen] = useState<boolean>(false);
  const [assets, setAssets] = useState<Asset[]>(initialAssets);
  const [selectedAssetId, setSelectedAssetId] = useState<string | null>('ast_1');
  const [emergencyRequests, setEmergencyRequests] = useState<EmergencyRequest[]>(initialEmergencyRequests);
  const [geofences, setGeofences] = useState<Geofence[]>(initialGeofences);
  const [alerts, setAlerts] = useState<AlertItem[]>(initialAlerts);
  const [auditLogs, setAuditLogs] = useState<AuditLogItem[]>(initialAuditLogs);
  const [activityFeed, setActivityFeed] = useState<ActivityFeedItem[]>(initialActivityFeed);
  const [simulationActive, setSimulationActive] = useState<boolean>(true);
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [soundEnabled, setSoundEnabled] = useState<boolean>(true);
  const [users, setUsers] = useState<UserProfile[]>(mockUsers);
  const [activeUserId, setActiveUserId] = useState<string>(mockUsers[0].id);

  // Sync HTML element theme class
  useEffect(() => {
    const root = document.documentElement;
    if (theme === 'dark') {
      root.classList.add('dark');
    } else {
      root.classList.remove('dark');
    }
  }, [theme]);

  const toggleTheme = () => {
    setTheme(prev => (prev === 'dark' ? 'light' : 'dark'));
  };

  const setRole = (newRole: Role) => {
    setRoleState(newRole);
    // Find first user with that role
    const matchedUser = users.find(u => u.role === newRole);
    if (matchedUser) {
      setActiveUserId(matchedUser.id);
    }
    setCurrentView('dashboard');
  };

  const login = (user: UserProfile) => {
    setActiveUserId(user.id);
    setRoleState(user.role);
    setIsAuthenticated(true);
    setCurrentView('dashboard');

    const nowStr = new Date().toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' });
    setAuditLogs(prev => [
      {
        id: 'aud_' + Date.now(),
        timestamp: nowStr,
        actorName: user.name,
        actorRole: user.role === 'superadmin' ? 'Super Administrador' : user.role === 'admin' ? 'Administrador' : 'Utilizador',
        action: 'Sessão Iniciada (Login)',
        target: 'Portal Rastro 2.0',
        ip: '187.12.98.10',
        status: 'Sucesso',
        details: `Autenticação bem-sucedida via e-mail: ${user.email}`,
      },
      ...prev,
    ]);
  };

  const logout = () => {
    setIsAuthenticated(false);
    setMobileMenuOpen(false);
  };

  const registerUser = (userData: Omit<UserProfile, 'id' | 'emergencyCode' | 'registeredAt' | 'assetsCount' | 'lastAccess'>) => {
    const newId = 'usr_' + Date.now();
    const randomEmergencyCode =
      'RT2-' +
      Math.random().toString(36).substring(2, 6).toUpperCase() +
      '-' +
      Math.random().toString(36).substring(2, 6).toUpperCase();

    const createdUser: UserProfile = {
      ...userData,
      id: newId,
      avatar: userData.avatar || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80',
      emergencyCode: randomEmergencyCode,
      plan: userData.role === 'user' ? 'Plano Pessoal' : 'Plano Empresarial Pro',
      registeredAt: new Date().toLocaleDateString('pt-BR'),
      assetsCount: 1,
      lastAccess: 'agora',
    };

    setUsers(prev => [createdUser, ...prev]);
    login(createdUser);
  };

  const currentUser = users.find(u => u.id === activeUserId) || users.find(u => u.role === role) || users[0];

  const selectedAsset = assets.find(a => a.id === selectedAssetId);

  // Real-time GPS movement simulation
  useEffect(() => {
    if (!simulationActive) return;

    const interval = setInterval(() => {
      setAssets(prev =>
        prev.map(asset => {
          if (asset.status === 'offline') return asset;

          // Slightly simulate small GPS jitter / movement for moving assets
          const isMoving = asset.speed > 0;
          const deltaLat = isMoving ? (Math.random() - 0.48) * 0.0008 : 0;
          const deltaLng = isMoving ? (Math.random() - 0.48) * 0.0008 : 0;
          const newSpeed = isMoving
            ? Math.max(10, Math.min(130, asset.speed + Math.floor((Math.random() - 0.5) * 6)))
            : 0;

          return {
            ...asset,
            lat: asset.lat + deltaLat,
            lng: asset.lng + deltaLng,
            speed: newSpeed,
            lastUpdate: 'agora há pouco',
          };
        })
      );
    }, 4000);

    return () => clearInterval(interval);
  }, [simulationActive]);

  // Emergency Access Granting logic
  const grantEmergencyAccess = (requestId: string, secondIdentifier: string, durationMinutes = 60) => {
    const nowStr = new Date().toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit', second: '2-digit' });
    
    setEmergencyRequests(prev =>
      prev.map(req => {
        if (req.id === requestId) {
          return {
            ...req,
            status: 'active',
            grantedBy: currentUser.name,
            grantedAt: nowStr,
            secondIdentifierInput: secondIdentifier,
            remainingMinutes: durationMinutes,
            totalDurationMinutes: durationMinutes,
          };
        }
        return req;
      })
    );

    const req = emergencyRequests.find(r => r.id === requestId);
    if (req) {
      // Log to audit
      const newAudit: AuditLogItem = {
        id: 'aud_' + Date.now(),
        timestamp: nowStr,
        actorName: currentUser.name,
        actorRole: currentUser.role === 'superadmin' ? 'Super Administrador' : 'Administrador',
        action: 'Concessão de Acesso de Emergência',
        target: `${req.userName} (${req.deviceName})`,
        ip: '187.12.98.10',
        status: 'Sucesso',
        details: `Código: ${req.code} | Identificador Validado: ${secondIdentifier} | Duração: ${durationMinutes}m`,
      };
      setAuditLogs(prev => [newAudit, ...prev]);

      const newAct: ActivityFeedItem = {
        id: 'act_' + Date.now(),
        title: 'Acesso de emergência concedido',
        subtitle: `${currentUser.name} → ${req.userName}`,
        timestamp: 'agora',
        type: 'emergency_granted',
      };
      setActivityFeed(prev => [newAct, ...prev]);
    }
  };

  const terminateEmergencySession = (requestId: string) => {
    const nowStr = new Date().toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' });
    setEmergencyRequests(prev =>
      prev.map(req => {
        if (req.id === requestId) {
          return {
            ...req,
            status: 'expired',
            remainingMinutes: 0,
          };
        }
        return req;
      })
    );

    const req = emergencyRequests.find(r => r.id === requestId);
    if (req) {
      setAuditLogs(prev => [
        {
          id: 'aud_' + Date.now(),
          timestamp: nowStr,
          actorName: currentUser.name,
          actorRole: currentUser.role === 'superadmin' ? 'Super Administrador' : 'Administrador',
          action: 'Encerramento de Sessão de Emergência',
          target: `${req.userName} (${req.deviceName})`,
          ip: '187.12.98.10',
          status: 'Sucesso',
          details: 'Sessão revogada manualmente pelo administrador.',
        },
        ...prev,
      ]);
    }
  };

  const createEmergencyRequest = (
    deviceId: string,
    motivo: 'Roubo' | 'Sequestro' | 'Perda' | 'Suspeita',
    priority: 'Alta' | 'Média' | 'Baixa'
  ) => {
    const asset = assets.find(a => a.id === deviceId);
    if (!asset) return;

    const newReq: EmergencyRequest = {
      id: 'emg_' + Date.now(),
      code: currentUser.emergencyCode,
      userId: currentUser.id,
      userName: currentUser.name,
      userAvatar: currentUser.avatar,
      deviceId: asset.id,
      deviceName: asset.name,
      timeAgo: 'agora',
      priority,
      motivo,
      status: 'pending',
      requestedAt: new Date().toLocaleTimeString('pt-BR'),
      secondIdentifierInput: currentUser.cpfOrId,
    };

    setEmergencyRequests(prev => [newReq, ...prev]);

    // Create high severity alert
    const newAlert: AlertItem = {
      id: 'alt_' + Date.now(),
      assetId: asset.id,
      assetName: asset.name,
      type: 'panic',
      title: `PEDIDO DE EMERGÊNCIA: ${motivo.toUpperCase()}`,
      message: `${currentUser.name} acionou emergência para ${asset.name}. Código: ${currentUser.emergencyCode}`,
      severity: 'critical',
      timestamp: new Date().toLocaleTimeString('pt-BR'),
      timeAgo: 'agora',
      resolved: false,
      read: false,
    };
    setAlerts(prev => [newAlert, ...prev]);

    // Audit log
    setAuditLogs(prev => [
      {
        id: 'aud_' + Date.now(),
        timestamp: new Date().toLocaleTimeString('pt-BR'),
        actorName: currentUser.name,
        actorRole: 'Utilizador',
        action: 'Solicitação de Acesso de Emergência',
        target: `${asset.name} (${motivo})`,
        ip: '177.33.10.12',
        status: 'Pendente',
        details: `Código de emergência gerado: ${currentUser.emergencyCode}`,
      },
      ...prev,
    ]);
  };

  const triggerPanic = (assetId: string) => {
    createEmergencyRequest(assetId, 'Roubo', 'Alta');
  };

  const toggleEngineBlock = (assetId: string) => {
    setAssets(prev =>
      prev.map(a => {
        if (a.id === assetId) {
          const newState = !a.engineBlocked;
          setAuditLogs(logs => [
            {
              id: 'aud_' + Date.now(),
              timestamp: new Date().toLocaleTimeString('pt-BR'),
              actorName: currentUser.name,
              actorRole: currentUser.role,
              action: newState ? 'Comando: Bloqueio de Motor' : 'Comando: Desbloqueio de Motor',
              target: a.name,
              ip: '187.12.98.10',
              status: 'Sucesso',
              details: `Sinal remoto enviado via protocolo GSM/IoT`,
            },
            ...logs,
          ]);
          return { ...a, engineBlocked: newState };
        }
        return a;
      })
    );
  };

  const toggleAlarm = (assetId: string) => {
    setAssets(prev =>
      prev.map(a => {
        if (a.id === assetId) {
          const newState = !a.alarmActive;
          return { ...a, alarmActive: newState };
        }
        return a;
      })
    );
  };

  const toggleLostMode = (assetId: string) => {
    setAssets(prev =>
      prev.map(a => {
        if (a.id === assetId) {
          const newState = !a.lostMode;
          return { ...a, lostMode: newState };
        }
        return a;
      })
    );
  };

  const regenerateEmergencyCode = () => {
    const randomCode =
      'RT2-' +
      Math.random().toString(36).substring(2, 6).toUpperCase() +
      '-' +
      Math.random().toString(36).substring(2, 6).toUpperCase();

    setUsers(prev =>
      prev.map(u => (u.id === currentUser.id ? { ...u, emergencyCode: randomCode } : u))
    );

    setAuditLogs(prev => [
      {
        id: 'aud_' + Date.now(),
        timestamp: new Date().toLocaleTimeString('pt-BR'),
        actorName: currentUser.name,
        actorRole: currentUser.role,
        action: 'Regeneração de Código de Emergência',
        target: 'Perfil de Utilizador',
        ip: '177.33.10.12',
        status: 'Sucesso',
        details: `Novo código gerado: ${randomCode}`,
      },
      ...prev,
    ]);
  };

  const addGeofence = (newGeo: Omit<Geofence, 'id'>) => {
    const geo: Geofence = {
      ...newGeo,
      id: 'geo_' + Date.now(),
    };
    setGeofences(prev => [...prev, geo]);
  };

  const deleteGeofence = (id: string) => {
    setGeofences(prev => prev.filter(g => g.id !== id));
  };

  const resolveAlert = (id: string) => {
    setAlerts(prev => prev.map(a => (a.id === id ? { ...a, resolved: true, read: true } : a)));
  };

  const clearAllAlerts = () => {
    setAlerts(prev => prev.map(a => ({ ...a, resolved: true, read: true })));
  };

  const notificationsCount = alerts.filter(a => !a.read).length + emergencyRequests.filter(r => r.status === 'pending').length;

  return (
    <AppContext.Provider
      value={{
        role,
        setRole,
        currentView,
        setCurrentView,
        theme,
        setTheme,
        toggleTheme,
        isAuthenticated,
        setIsAuthenticated,
        mobileMenuOpen,
        setMobileMenuOpen,
        currentUser,
        users,
        login,
        logout,
        registerUser,
        assets,
        selectedAssetId,
        setSelectedAssetId,
        selectedAsset,
        emergencyRequests,
        geofences,
        alerts,
        auditLogs,
        activityFeed,
        simulationActive,
        setSimulationActive,
        grantEmergencyAccess,
        terminateEmergencySession,
        createEmergencyRequest,
        triggerPanic,
        toggleEngineBlock,
        toggleAlarm,
        toggleLostMode,
        regenerateEmergencyCode,
        addGeofence,
        deleteGeofence,
        resolveAlert,
        clearAllAlerts,
        searchQuery,
        setSearchQuery,
        soundEnabled,
        setSoundEnabled,
        notificationsCount,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};
