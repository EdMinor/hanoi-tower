import React from 'react';
import Modal from '../ui/Modal';

interface FooterProps {
  className?: string;
}

const Footer: React.FC<FooterProps> = ({ className = '' }) => {
  const [showImpressum, setShowImpressum] = React.useState(false);
  const [showDatenschutz, setShowDatenschutz] = React.useState(false);

  return (
    <>
      <footer className={`bg-card text-card-foreground border-t border-border py-6 ${className}`}>
        <div className="container mx-auto px-4">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            {/* Copyright */}
            <div className="text-sm text-muted-foreground text-center sm:text-left">
              © 2025 <a 
                href="https://edmin.dev" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-primary hover:underline font-medium"
              >
                edmin.dev
              </a>
            </div>
            
            {/* Links */}
            <div className="flex items-center gap-6">
              <button
                onClick={() => setShowImpressum(true)}
                className="text-sm text-muted-foreground hover:text-foreground transition-colors"
              >
                Impressum
              </button>
              <button
                onClick={() => setShowDatenschutz(true)}
                className="text-sm text-muted-foreground hover:text-foreground transition-colors"
              >
                Datenschutz
              </button>
            </div>
          </div>
        </div>
      </footer>

      {/* Impressum Modal */}
      <Modal
        isOpen={showImpressum}
        onClose={() => setShowImpressum(false)}
        title="Impressum"
        size="lg"
      >
        <div className="space-y-4 text-sm">
          <div>
            <h3 className="font-semibold text-lg mb-2">Angaben gemäß § 5 TMG</h3>
            <p className="text-muted-foreground">
              EdMin<br />
              Web Developer<br />
              Deutschland
            </p>
          </div>
          
          <div>
            <h4 className="font-semibold mb-2">Kontakt</h4>
            <p className="text-muted-foreground">
              E-Mail: <a href="mailto:contact@edmin.dev" className="text-primary hover:underline">
                contact@edmin.dev
              </a><br />
              Website: <a href="https://edmin.dev" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">
                edmin.dev
              </a>
            </p>
          </div>
          
          <div>
            <h4 className="font-semibold mb-2">Verantwortlich für den Inhalt</h4>
            <p className="text-muted-foreground">
              EdMin
            </p>
          </div>
          
          <div>
            <h4 className="font-semibold mb-2">Haftungsausschluss</h4>
            <p className="text-muted-foreground text-xs">
              Die Inhalte unserer Seiten wurden mit größter Sorgfalt erstellt. Für die Richtigkeit, Vollständigkeit und Aktualität der Inhalte können wir jedoch keine Gewähr übernehmen.
            </p>
          </div>
        </div>
      </Modal>

      {/* Datenschutz Modal */}
      <Modal
        isOpen={showDatenschutz}
        onClose={() => setShowDatenschutz(false)}
        title="Datenschutzerklärung"
        size="lg"
      >
        <div className="space-y-4 text-sm">
          <div>
            <h3 className="font-semibold text-lg mb-2">Datenschutzerklärung</h3>
            <p className="text-muted-foreground">
              Diese Datenschutzerklärung klärt Sie über die Art, den Umfang und Zweck der Verarbeitung von personenbezogenen Daten auf.
            </p>
          </div>
          
          <div>
            <h4 className="font-semibold mb-2">1. Datenerhebung und -verwendung</h4>
            <p className="text-muted-foreground">
              Diese Anwendung sammelt keine personenbezogenen Daten. Alle Spieldaten werden lokal in Ihrem Browser gespeichert.
            </p>
          </div>
          
          <div>
            <h4 className="font-semibold mb-2">2. Cookies und lokale Speicherung</h4>
            <p className="text-muted-foreground">
              Die Anwendung verwendet localStorage für die Speicherung von Einstellungen (Thema, Sound). Diese Daten werden nur lokal gespeichert und nicht an Server übertragen.
            </p>
          </div>
          
          <div>
            <h4 className="font-semibold mb-2">3. Hosting</h4>
            <p className="text-muted-foreground">
              Diese Website wird auf Vercel gehostet. Weitere Informationen finden Sie in der 
              <a href="https://vercel.com/legal/privacy-policy" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">
                Vercel Datenschutzerklärung
              </a>.
            </p>
          </div>
          
          <div>
            <h4 className="font-semibold mb-2">4. Kontakt</h4>
            <p className="text-muted-foreground">
              Bei Fragen zum Datenschutz wenden Sie sich an: 
              <a href="mailto:contact@edmin.dev" className="text-primary hover:underline">
                contact@edmin.dev
              </a>
            </p>
          </div>
        </div>
      </Modal>
    </>
  );
};

export default Footer;
