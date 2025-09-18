import { useCallback, useEffect, useState } from 'react';
import { cn } from '@/lib/utils';

interface ResizablePanelProps {
  children: React.ReactNode;
  defaultWidth?: number;
  minWidth?: number;
  maxWidth?: number;
  side: 'left' | 'right';
  className?: string;
}

export function ResizablePanel({
  children,
  defaultWidth = 300,
  minWidth = 200,
  maxWidth = 600,
  side,
  className,
}: ResizablePanelProps) {
  const [isResizing, setIsResizing] = useState(false);
  const [width, setWidth] = useState(defaultWidth);
  const [isCollapsed, setIsCollapsed] = useState(false);

  const startResizing = useCallback(() => {
    setIsResizing(true);
  }, []);

  const stopResizing = useCallback(() => {
    setIsResizing(false);
  }, []);

  const resize = useCallback(
    (e: MouseEvent) => {
      if (isResizing) {
        let newWidth;
        if (side === 'left') {
          newWidth = e.clientX;
        } else {
          newWidth = window.innerWidth - e.clientX;
        }

        if (newWidth >= minWidth && newWidth <= maxWidth) {
          setWidth(newWidth);
        }
      }
    },
    [isResizing, maxWidth, minWidth, side]
  );

  useEffect(() => {
    window.addEventListener('mousemove', resize);
    window.addEventListener('mouseup', stopResizing);
    return () => {
      window.removeEventListener('mousemove', resize);
      window.removeEventListener('mouseup', stopResizing);
    };
  }, [resize, stopResizing]);

  const toggleCollapse = () => {
    setIsCollapsed(!isCollapsed);
  };

  return (
    <div
      className={cn(
        'flex h-full relative transition-all duration-300 ease-in-out',
        className
      )}
      style={{ width: isCollapsed ? '48px' : width }}
    >
      <div className="flex-1 overflow-auto">
        {children}
      </div>
      <div
        className={cn(
          'absolute top-0 bottom-0 w-1 cursor-col-resize hover:bg-blue-500/50',
          side === 'left' ? 'right-0' : 'left-0'
        )}
        onMouseDown={startResizing}
      />
      <button
        onClick={toggleCollapse}
        className={cn(
          'absolute top-4 w-6 h-6 bg-gray-200 dark:bg-gray-800 rounded-full flex items-center justify-center hover:bg-gray-300 dark:hover:bg-gray-700',
          side === 'left' ? 'right-[-12px]' : 'left-[-12px]'
        )}
      >
        <svg
          className={cn(
            'w-4 h-4 transform transition-transform',
            isCollapsed ? 'rotate-180' : '',
            side === 'right' ? 'rotate-180' : ''
          )}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M15 19l-7-7 7-7"
          />
        </svg>
      </button>
    </div>
  );
}