import { useState, useEffect } from 'react';
import { StickyBanner } from '@/components/ui/sticky-banner';

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
      className={`h-12 flex items-center justify-center`}
      style={{ backgroundColor: announcement.color }}
      onClose={handleDismiss}
    >
      <p className="mx-0 max-w-[90%] text-white drop-shadow-md text-center">
        {announcement.text}
      </p>
    </StickyBanner>
  );
}