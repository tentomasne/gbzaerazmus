import { useState, useEffect } from 'react';
import { StickyBanner } from '@/components/ui/sticky-banner';
import { X } from 'lucide-react';

interface Announcement {
  id: string;
  text: string;
  color: string;
  isActive: boolean;
}

export function AnnouncementBanner() {
  const [announcement, setAnnouncement] = useState<Announcement | null>(null);
  const [dismissed, setDismissed] = useState(false);

  useEffect(() => {
    fetchAnnouncement();
  }, []);

  const fetchAnnouncement = async () => {
    try {
      const response = await fetch('/api/announcements');
      if (response.ok) {
        const data = await response.json();
        if (data.announcement) {
          setAnnouncement(data.announcement);
          // Check if user has dismissed this specific announcement
          const dismissedId = localStorage.getItem('dismissed-announcement');
          setDismissed(dismissedId === data.announcement.id);
        }
      }
    } catch (error) {
      console.error('Failed to fetch announcement:', error);
    }
  };

  const handleDismiss = () => {
    if (announcement) {
      localStorage.setItem('dismissed-announcement', announcement.id);
      setDismissed(true);
    }
  };

  if (!announcement || dismissed || !announcement.isActive) {
    return null;
  }

  return (
    <StickyBanner 
      className="min-h-12 flex items-center justify-center px-4"
      style={{ backgroundColor: announcement.color }}
      onClose={handleDismiss}
    >
      <div className="flex items-center justify-between w-full max-w-7xl mx-auto">
        <div className="flex-1 text-center">
          <p className="text-white drop-shadow-md text-sm leading-relaxed py-2">
            {announcement.text}
          </p>
        </div>
        <button
          onClick={handleDismiss}
          className="ml-4 p-1 hover:bg-white/20 rounded-full transition-colors flex-shrink-0"
          aria-label="Close announcement"
        >
          <X className="h-4 w-4 text-white" />
        </button>
      </div>
    </StickyBanner>
  );
}