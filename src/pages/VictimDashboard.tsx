import React, { useState, useEffect } from 'react';
import { getCurrentUser } from '../utils/storage';
import { getLegalRights, getSupportServices, getCaseNotes } from '../utils/storage';
import { CaseNote } from '../types';
import Layout from '../components/Layout';
import Button from '../components/Button';
import Card from '../components/Card';
import Modal from '../components/Modal';
import './Dashboard.css';

const VictimDashboard: React.FC = () => {
  const user = getCurrentUser();
  const [legalRights, setLegalRights] = useState(getLegalRights());
  const [supportServices, setSupportServices] = useState(getSupportServices());
  const [caseNotes, setCaseNotes] = useState<CaseNote[]>([]);
  const [showStealthMode, setShowStealthMode] = useState(false);
  const [chatOpen, setChatOpen] = useState(false);

  useEffect(() => {
    if (user) {
      const notes = getCaseNotes().filter(note => note.survivorId === user.id);
      setCaseNotes(notes);
    }
  }, [user]);

  return (
    <Layout title="My Dashboard">
      <div className="dashboard">
        {/* Quick Actions */}
        <section className="dashboard-section">
          <h2 className="section-title">Quick Actions</h2>
          <div className="action-buttons">
            <Button variant="primary" size="large" onClick={() => window.open('tel:1800-HELP-NOW')}>
              🆘 Get Help Now
            </Button>
            <Button variant="secondary" size="large" onClick={() => setChatOpen(true)}>
              💬 Chat with Counsellor
            </Button>
            <Button variant="outline" size="large" onClick={() => setShowStealthMode(!showStealthMode)}>
              {showStealthMode ? '👁️ Show Account' : '🫥 Hide Account'}
            </Button>
          </div>
        </section>

        {/* Stealth Mode UI */}
        {showStealthMode && (
          <section className="dashboard-section stealth-mode">
            <Card>
              <h3>📚 General Information Portal</h3>
              <p>This appears as a regular information website to protect your privacy.</p>
            </Card>
          </section>
        )}

        {/* Legal Rights */}
        <section className="dashboard-section">
          <h2 className="section-title">Know Your Rights</h2>
          <div className="cards-grid">
            {legalRights.map((right) => (
              <Card key={right.id} className="info-card">
                <h3>{right.title}</h3>
                <p>{right.description}</p>
                <span className="category-badge">{right.category}</span>
              </Card>
            ))}
          </div>
        </section>

        {/* Support Services */}
        <section className="dashboard-section">
          <h2 className="section-title">Support Services</h2>
          <div className="cards-grid">
            {supportServices.map((service) => (
              <Card key={service.id} className="info-card">
                <h3>{service.name}</h3>
                <p>{service.description}</p>
                <div className="service-details">
                  <p><strong>Contact:</strong> {service.contact}</p>
                  <p><strong>Location:</strong> {service.location}</p>
                </div>
              </Card>
            ))}
          </div>
        </section>

        {/* Progress Notes from Counsellor */}
        <section className="dashboard-section">
          <h2 className="section-title">Progress Notes</h2>
          {caseNotes.length > 0 ? (
            <div className="notes-list">
              {caseNotes.map((note) => (
                <Card key={note.id} className="note-card">
                  <div className="note-header">
                    <span className="note-date">{new Date(note.date).toLocaleDateString()}</span>
                    <span className={`risk-badge risk-${note.riskLevel}`}>
                      {note.riskLevel.toUpperCase()}
                    </span>
                  </div>
                  <p className="note-content">{note.notes}</p>
                </Card>
              ))}
            </div>
          ) : (
            <Card>
              <p>No progress notes available yet. Your counsellor will add notes after sessions.</p>
            </Card>
          )}
        </section>

        {/* Chat Modal */}
        <Modal isOpen={chatOpen} onClose={() => setChatOpen(false)} title="Chat with Counsellor" size="medium">
          <div className="chat-container">
            <div className="chat-messages">
              <div className="chat-message">
                <p>Hello! How can I help you today?</p>
                <span className="message-time">10:30 AM</span>
              </div>
            </div>
            <div className="chat-input-area">
              <input type="text" placeholder="Type your message..." className="chat-input" />
              <Button variant="primary">Send</Button>
            </div>
          </div>
        </Modal>
      </div>
    </Layout>
  );
};

export default VictimDashboard;

