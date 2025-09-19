import React from 'react';
import Button from './Button';

interface CookieBannerProps {
  className?: string;
}

const CookieBanner: React.FC<CookieBannerProps> = ({ className = '' }) => {
  const [isVisible, setIsVisible] = React.useState(false);

  // Check if user has already made a choice
  React.useEffect(() => {
    const cookieConsent = localStorage.getItem('cookie-consent');
    if (!cookieConsent) {
      setIsVisible(true);
    }
  }, []);

  const handleAccept = () => {
    localStorage.setItem('cookie-consent', 'accepted');
    setIsVisible(false);
  };

  const handleDecline = () => {
    localStorage.setItem('cookie-consent', 'declined');
    setIsVisible(false);
  };

  if (!isVisible) return null;

  return (
    <div className={`fixed bottom-4 left-4 right-4 z-50 bg-card border border-border rounded-lg shadow-lg p-4 ${className}`}>
      <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3">
        {/* Text */}
        <div className="flex-1">
          <p className="text-sm text-muted-foreground">
            🍪 Мы используем cookies для улучшения вашего опыта. 
            <a href="#" className="text-primary hover:underline ml-1">
              Подробнее
            </a>
          </p>
        </div>

        {/* Buttons */}
        <div className="flex gap-2">
          <Button
            onClick={handleDecline}
            variant="secondary"
            size="sm"
            className="text-xs"
          >
            Отклонить
          </Button>
          <Button
            onClick={handleAccept}
            variant="primary"
            size="sm"
            className="text-xs"
          >
            Принять
          </Button>
        </div>
      </div>
    </div>
  );
};

export default CookieBanner;
