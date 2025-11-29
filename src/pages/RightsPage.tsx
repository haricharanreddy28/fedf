import React from 'react';
import { getLegalRights } from '../utils/storage';
import Card from '../components/Card';
import SafeExitButton from '../components/SafeExitButton';
import './RightsPage.css';

const RightsPage: React.FC = () => {
  const legalRights = getLegalRights();

  return (
    <div className="rights-page">
      <SafeExitButton />
      <div className="rights-container">
        <div className="rights-hero">
          <h1>Know Your Rights</h1>
          <p>Understanding your legal rights is an important step towards safety and justice.</p>
        </div>

        <section className="rights-content">
          {legalRights.length > 0 ? (
            <div className="rights-grid">
              {legalRights.map((right) => (
                <Card key={right.id} className="right-card">
                  <div className="right-header">
                    <h3>{right.title}</h3>
                    <span className="category-badge">{right.category}</span>
                  </div>
                  <p className="right-description">{right.description}</p>
                  <div className="right-footer">
                    <small>Last updated: {new Date(right.updatedAt).toLocaleDateString()}</small>
                  </div>
                </Card>
              ))}
            </div>
          ) : (
            <Card>
              <p>No legal rights information available at this time.</p>
            </Card>
          )}
        </section>

        <section className="rights-info">
          <Card>
            <h2>Important Information</h2>
            <ul>
              <li>You have the right to safety and protection</li>
              <li>You have the right to seek legal assistance</li>
              <li>You have the right to privacy and confidentiality</li>
              <li>You have the right to make your own decisions</li>
              <li>You have the right to access support services</li>
            </ul>
          </Card>
        </section>
      </div>
    </div>
  );
};

export default RightsPage;

