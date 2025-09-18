import { cn } from '@/lib/utils';
import Link from 'next/link';
import { HTMLAttributes } from 'react';
import {
  HomeIcon,
  LayoutDashboardIcon,
  FolderIcon,
  VideoIcon,
  SettingsIcon,
  FileTextIcon,
  ImageIcon,
  MusicIcon,
  UploadCloudIcon,
  UsersIcon,
  HelpCircleIcon,
} from 'lucide-react';

interface SideNavProps extends HTMLAttributes<HTMLDivElement> {
  isCollapsed?: boolean;
}

const navItems = [
  { icon: HomeIcon, label: 'Home', href: '/dashboard' },
  { icon: FolderIcon, label: 'Projects', href: '/dashboard/projects' },
  { icon: VideoIcon, label: 'Videos', href: '/dashboard/videos' },
  { icon: ImageIcon, label: 'Images', href: '/dashboard/images' },
  { icon: MusicIcon, label: 'Audio', href: '/dashboard/audio' },
  { icon: UploadCloudIcon, label: 'Uploads', href: '/dashboard/uploads' },
  { icon: UsersIcon, label: 'Team', href: '/dashboard/team' },
  { icon: SettingsIcon, label: 'Settings', href: '/dashboard/settings' },
  { icon: HelpCircleIcon, label: 'Help', href: '/dashboard/help' },
];

export function SideNav({ className, isCollapsed }: SideNavProps) {
  return (
    <div className={cn('flex flex-col gap-4 py-4', className)}>
      <div className="px-3 py-2">
        <div className="space-y-1">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                'flex items-center gap-3 rounded-lg px-3 py-2 text-gray-500 transition-all hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-50',
                'hover:bg-gray-100 dark:hover:bg-gray-800'
              )}
            >
              <item.icon className="h-4 w-4" />
              {!isCollapsed && <span>{item.label}</span>}
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}