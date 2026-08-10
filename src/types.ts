export type Role = 'user' | 'admin' | 'superadmin';

export type AssetType = 'car' | 'motorcycle' | 'phone' | 'backpack' | 'truck' | 'pet';

export type AssetStatus = 'online' | 'offline' | 'alert';

export interface Asset {
  id: string;
  name: string;
  type: AssetType;
  imei: string;
  plateNumber?: string;
  status: AssetStatus;
  lat: number;
  lng: number;
  speed: number; // km/h
  battery: number; // percentage
  direction: 'N' | 'NE' | 'E' | 'SE' | 'S' | 'SW' | 'W' | 'NW';
  address: string;
  lastUpdate: string;
  assignedUserId: string;
  assignedUserName: string;
  engineBlocked?: boolean;
  alarmActive?: boolean;
  lostMode?: boolean;
  history?: TrajectoryPoint[];
}

export interface TrajectoryPoint {
  id: string;
  lat: number;
  lng: number;
  speed: number;
  battery: number;
  timestamp: string;
  address: string;
}

export interface UserProfile {
  id: string;
  name: string;
  email: string;
  phone: string;
  avatar: string;
  role: Role;
  emergencyCode: string;
  plan: string;
  registeredAt: string;
  assetsCount: number;
  lastAccess: string;
  cpfOrId: string;
}

export interface EmergencyRequest {
  id: string;
  code: string;
  userId: string;
  userName: string;
  userAvatar?: string;
  deviceId: string;
  deviceName: string;
  timeAgo: string;
  priority: 'Alta' | 'Média' | 'Baixa';
  motivo: 'Roubo' | 'Sequestro' | 'Perda' | 'Suspeita' | 'Teste';
  status: 'pending' | 'active' | 'expired' | 'rejected';
  secondIdentifierInput?: string;
  requestedAt: string;
  grantedBy?: string;
  grantedAt?: string;
  remainingMinutes?: number;
  totalDurationMinutes?: number;
}

export interface Geofence {
  id: string;
  name: string;
  type: 'circle' | 'polygon';
  centerLat: number;
  centerLng: number;
  radius: number; // meters for circle
  polygonPoints?: [number, number][];
  color: string;
  assignedAssetIds: string[];
  alertOnEnter: boolean;
  alertOnExit: boolean;
  status: 'active' | 'inactive';
}

export type AlertType =
  | 'geofence_exit'
  | 'geofence_enter'
  | 'overspeed'
  | 'low_battery'
  | 'offline'
  | 'tamper'
  | 'panic';

export interface AlertItem {
  id: string;
  assetId: string;
  assetName: string;
  type: AlertType;
  title: string;
  message: string;
  severity: 'critical' | 'warning' | 'info';
  timestamp: string;
  timeAgo: string;
  resolved: boolean;
  read: boolean;
}

export interface AuditLogItem {
  id: string;
  timestamp: string;
  actorName: string;
  actorRole: string;
  action: string;
  target: string;
  ip: string;
  status: 'Sucesso' | 'Negado' | 'Pendente';
  details?: string;
}

export interface ActivityFeedItem {
  id: string;
  title: string;
  subtitle: string;
  timestamp: string;
  type: 'emergency_granted' | 'user_registered' | 'device_offline' | 'admin_login' | 'overspeed_alert';
}
