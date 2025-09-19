import React from 'react';
import Button from './Button';
import { X, Cookie, Shield, Settings } from 'lucide-react';

interface CookieBannerProps {
  className?: string;
}

const CookieBanner: React.FC<CookieBannerProps> = ({ className = '' }) => {
  const [isVisible, setIsVisible] = React.useState(false);
  const [showSettings, setShowSettings] = React.useState(false);
  const [cookies, setCookies] = React.useState({
    necessary: true, // Always true, can't be disabled
    analytics: false,
    marketing: false,
  });

  // Check if user has already made a choice
  React.useEffect(() => {
    const cookieConsent = localStorage.getItem('cookie-consent');
    if (!cookieConsent) {
      setIsVisible(true);
    }
  }, []);

  const handleAcceptAll = () => {
    const consent = {
      necessary: true,
      analytics: true,
      marketing: true,
      timestamp: new Date().toISOString(),
    };
    
    localStorage.setItem('cookie-consent', JSON.stringify(consent));
    setIsVisible(false);
    
    // Here you would initialize analytics/marketing tools
    // For now, we'll just log
    console.log('All cookies accepted');
  };

  const handleAcceptNecessary = () => {
    const consent = {
      necessary: true,
      analytics: false,
      marketing: false,
      timestamp: new Date().toISOString(),
    };
    
    localStorage.setItem('cookie-consent', JSON.stringify(consent));
    setIsVisible(false);
    
    console.log('Only necessary cookies accepted');
  };

  const handleSaveSettings = () => {
    const consent = {
      ...cookies,
      timestamp: new Date().toISOString(),
    };
    
    localStorage.setItem('cookie-consent', JSON.stringify(consent));
    setIsVisible(false);
    setShowSettings(false);
    
    console.log('Cookie settings saved:', consent);
  };

  const handleToggleCookie = (type: keyof typeof cookies) => {
    if (type === 'necessary') return; // Can't disable necessary cookies
    
    setCookies(prev => ({
      ...prev,
      [type]: !prev[type],
    }));
  };

  if (!isVisible) return null;

  return (
    <>
      {/* Cookie Banner */}
      <div className={`fixed bottom-0 left-0 right-0 z-50 bg-card border-t border-border shadow-lg ${className}`}>
        <div className="container mx-auto px-4 py-4">
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
            {/* Icon and Text */}
            <div className="flex items-start gap-3 flex-1">
              <div className="flex-shrink-0 mt-1">
                <Cookie className="w-5 h-5 text-primary" />
              </div>
              <div className="flex-1">
                <h3 className="font-semibold text-sm mb-1">
                  🍪 Wir verwenden Cookies
                </h3>
                <p className="text-xs text-muted-foreground leading-relaxed">
                  Diese Website verwendet Cookies, um Ihnen die beste Erfahrung zu bieten. 
                  Notwendige Cookies sind für die Funktionalität erforderlich, während andere 
                  uns helfen, die Website zu verbessern.
                </p>
              </div>
            </div>

            {/* Buttons */}
            <div className="flex flex-col sm:flex-row gap-2 w-full sm:w-auto">
              <Button
                onClick={() => setShowSettings(true)}
                variant="secondary"
                size="sm"
                className="text-xs"
              >
                <Settings className="w-3 h-3 mr-1" />
                Einstellungen
              </Button>
              <Button
                onClick={handleAcceptNecessary}
                variant="secondary"
                size="sm"
                className="text-xs"
              >
                Nur Notwendige
              </Button>
              <Button
                onClick={handleAcceptAll}
                variant="primary"
                size="sm"
                className="text-xs"
              >
                Alle Akzeptieren
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Cookie Settings Modal */}
      <div className={`fixed inset-0 z-50 flex items-center justify-center p-4 ${showSettings ? 'block' : 'hidden'}`}>
        <div className="fixed inset-0 bg-black/50" onClick={() => setShowSettings(false)} />
        <div className="relative bg-card rounded-lg shadow-xl max-w-md w-full max-h-[80vh] overflow-y-auto">
          <div className="p-6">
            {/* Header */}
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <Shield className="w-5 h-5 text-primary" />
                <h2 className="text-lg font-semibold">Cookie-Einstellungen</h2>
              </div>
              <button
                onClick={() => setShowSettings(false)}
                className="text-muted-foreground hover:text-foreground"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Cookie Types */}
            <div className="space-y-4">
              {/* Necessary Cookies */}
              <div className="flex items-center justify-between p-3 bg-muted/50 rounded-lg">
                <div className="flex-1">
                  <h3 className="font-medium text-sm">Notwendige Cookies</h3>
                  <p className="text-xs text-muted-foreground mt-1">
                    Diese Cookies sind für die Grundfunktionen der Website erforderlich.
                  </p>
                </div>
                <div className="ml-4">
                  <div className="w-10 h-6 bg-primary rounded-full flex items-center justify-end px-1">
                    <div className="w-4 h-4 bg-white rounded-full" />
                  </div>
                </div>
              </div>

              {/* Analytics Cookies */}
              <div className="flex items-center justify-between p-3 bg-muted/50 rounded-lg">
                <div className="flex-1">
                  <h3 className="font-medium text-sm">Analyse-Cookies</h3>
                  <p className="text-xs text-muted-foreground mt-1">
                    Helfen uns zu verstehen, wie Besucher mit der Website interagieren.
                  </p>
                </div>
                <div className="ml-4">
                  <button
                    onClick={() => handleToggleCookie('analytics')}
                    className={`w-10 h-6 rounded-full flex items-center transition-colors ${
                      cookies.analytics ? 'bg-primary' : 'bg-muted'
                    }`}
                  >
                    <div className={`w-4 h-4 bg-white rounded-full transition-transform ${
                      cookies.analytics ? 'translate-x-5' : 'translate-x-1'
                    }`} />
                  </button>
                </div>
              </div>

              {/* Marketing Cookies */}
              <div className="flex items-center justify-between p-3 bg-muted/50 rounded-lg">
                <div className="flex-1">
                  <h3 className="font-medium text-sm">Marketing-Cookies</h3>
                  <p className="text-xs text-muted-foreground mt-1">
                    Werden verwendet, um Besuchern relevante Anzeigen zu zeigen.
                  </p>
                </div>
                <div className="ml-4">
                  <button
                    onClick={() => handleToggleCookie('marketing')}
                    className={`w-10 h-6 rounded-full flex items-center transition-colors ${
                      cookies.marketing ? 'bg-primary' : 'bg-muted'
                    }`}
                  >
                    <div className={`w-4 h-4 bg-white rounded-full transition-transform ${
                      cookies.marketing ? 'translate-x-5' : 'translate-x-1'
                    }`} />
                  </button>
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex gap-3 mt-6">
              <Button
                onClick={() => setShowSettings(false)}
                variant="secondary"
                className="flex-1"
              >
                Abbrechen
              </Button>
              <Button
                onClick={handleSaveSettings}
                variant="primary"
                className="flex-1"
              >
                Einstellungen Speichern
              </Button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default CookieBanner;
