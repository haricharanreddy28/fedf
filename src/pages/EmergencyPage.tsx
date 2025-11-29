import React from 'react';
import Button from '../components/Button';
import Card from '../components/Card';
import SafeExitButton from '../components/SafeExitButton';
import './EmergencyPage.css';

const EmergencyPage: React.FC = () => {
  const emergencyNumbers = [
    { name: 'Emergency Helpline', number: '1800-HELP-NOW', description: '24/7 Crisis Support' },
    { name: 'Police Emergency', number: '911', description: 'Immediate Police Assistance' },
    { name: 'National Domestic Violence Hotline', number: '1-800-799-7233', description: '24/7 Support' },
    { name: 'Crisis Text Line', number: 'Text HOME to 741741', description: 'Text Support' },
  ];

  return (
    <div className="emergency-page">
      <SafeExitButton />
      <div className="emergency-container">
        <Card className="emergency-hero">
          <h1>🆘 Emergency Help</h1>
          <p className="emergency-subtitle">If you are in immediate danger, please call 911</p>
          <div className="emergency-buttons">
            <Button
              variant="danger"
              size="large"
              onClick={() => window.open('tel:911')}
            >
              Call 911 Now
            </Button>
            <Button
              variant="primary"
              size="large"
              onClick={() => window.open('tel:1800-HELP-NOW')}
            >
              Call Helpline
            </Button>
          </div>
        </Card>

        <section className="emergency-section">
          <h2>Emergency Contacts</h2>
          <div className="emergency-grid">
            {emergencyNumbers.map((contact, index) => (
              <Card key={index} className="emergency-card">
                <h3>{contact.name}</h3>
                <p className="emergency-number">{contact.number}</p>
                <p className="emergency-description">{contact.description}</p>
                <Button
                  variant="secondary"
                  onClick={() => {
                    if (contact.number.includes('Text')) {
                      alert(`Text ${contact.number.split('Text ')[1]}`);
                    } else {
                      window.open(`tel:${contact.number.replace(/-/g, '')}`);
                    }
                  }}
                >
                  Contact
                </Button>
              </Card>
            ))}
          </div>
        </section>

        <section className="safety-tips">
          <Card>
            <h2>Safety Tips</h2>
            <ul>
              <li>If you are in immediate danger, call 911</li>
              <li>Have a safety plan ready</li>
              <li>Keep important documents in a safe place</li>
              <li>Trust your instincts</li>
              <li>Reach out to trusted friends or family</li>
            </ul>
          </Card>
        </section>
      </div>
    </div>
  );
};

export default EmergencyPage;

