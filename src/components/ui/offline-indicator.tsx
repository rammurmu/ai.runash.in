'use client';

import { useOfflineStore } from '@/lib/stores/offline-store';
import { Badge } from '@/components/ui/badge';
import { Tooltip } from '@/components/ui/tooltip';
import { CloudOff, CloudSync, Wifi, WifiOff } from 'lucide-react';

export function OfflineIndicator() {
  const { isOffline, pendingOperations, lastOnline } = useOfflineStore();

  const getStatusColor = () => {
    if (!isOffline) return 'bg-green-500';
    return pendingOperations > 0 ? 'bg-yellow-500' : 'bg-red-500';
  };

  const getStatusText = () => {
    if (!isOffline) return 'Online';
    return pendingOperations > 0
      ? `Offline (${pendingOperations} pending)`
      : 'Offline';
  };

  const getTooltipText = () => {
    if (!isOffline) return 'Connected to the server';
    const lastOnlineText = lastOnline
      ? `Last online: ${new Date(lastOnline).toLocaleString()}`
      : '';
    return pendingOperations > 0
      ? `Working offline. ${pendingOperations} changes will sync when you're back online. ${lastOnlineText}`
      : `You're offline. ${lastOnlineText}`;
  };

  const StatusIcon = () => {
    if (!isOffline) return <Wifi className="h-4 w-4" />;
    return pendingOperations > 0 ? (
      <CloudSync className="h-4 w-4 animate-spin" />
    ) : (
      <CloudOff className="h-4 w-4" />
    );
  };

  return (
    <Tooltip delayDuration={300} content={getTooltipText()}>
      <Badge
        variant="outline"
        className={`${getStatusColor()} text-white flex items-center gap-2 transition-colors`}
      >
        <StatusIcon />
        <span className="hidden sm:inline">{getStatusText()}</span>
      </Badge>
    </Tooltip>
  );
}