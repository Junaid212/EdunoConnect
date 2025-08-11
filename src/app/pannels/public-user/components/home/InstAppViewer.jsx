import { useState } from "react";
import { 
  User, 
  Mail, 
  Phone, 
  FileText, 
  Calendar, 
  Download,
  Eye,
  X,
  MapPin,
  GraduationCap,
  Building
} from "lucide-react";

const InstAppViewer = ({ jobTitle, jobId, isOpen, onClose }) => {
  const [selectedApplication, setSelectedApplication] = useState(null);
  const [reviewMode, setReviewMode] = useState(null);
  const [contactMode, setContactMode] = useState(null);
  const [applications, setApplications] = useState([
    {
      id: "1",
      candidateName: "Dr. Sarah Johnson",
      email: "sarah.johnson@email.com",
      phone: "+1 (555) 123-4567",
      address: "123 Academic Street, University City, CA 90210",
      education: "PhD in Computer Science from Stanford University (2019)",
      experience: "5 years as Research Scientist at Google AI, Published 15+ papers in top-tier conferences",
      resumeUrl: "#",
      coverLetter: "I am excited to apply for the Assistant Professor position. With my PhD in Computer Science and 5 years of research experience in machine learning, I believe I would be a valuable addition to your department.",
      appliedDate: "2024-02-15",
      status: "pending"
    },
    {
      id: "2",
      candidateName: "Dr. Michael Chen",
      email: "m.chen@university.edu",
      phone: "+1 (555) 987-6543",
      address: "456 Research Boulevard, Tech Valley, NY 12180",
      education: "PhD in Artificial Intelligence from MIT (2020)",
      experience: "4 years as Postdoctoral Researcher at Carnegie Mellon University",
      resumeUrl: "#",
      coverLetter: "As a recent PhD graduate with expertise in artificial intelligence and published research in top-tier conferences, I am eager to contribute to your computer science program.",
      appliedDate: "2024-02-12",
      status: "reviewed"
    },
    {
      id: "3",
      candidateName: "Dr. Emily Rodriguez",
      email: "emily.rodriguez@tech.com",
      phone: "+1 (555) 456-7890",
      address: "789 Innovation Drive, Silicon Valley, CA 94105",
      education: "PhD in Machine Learning from UC Berkeley (2018)",
      experience: "6 years as Senior Engineer at Google, 2 years as Adjunct Professor at UC Berkeley",
      resumeUrl: "#",
      coverLetter: "With my industry experience at Google and academic background, I bring both practical and theoretical knowledge to advance your curriculum and research initiatives.",
      appliedDate: "2024-02-10",
      status: "shortlisted"
    }
  ]);

  const getStatusColor = (status) => {
    switch (status) {
      case "pending": return "status-pending";
      case "reviewed": return "status-reviewed";
      case "shortlisted": return "status-shortlisted";
      case "rejected": return "status-rejected";
      default: return "status-default";
    }
  };

  const formatStatus = (status) => {
    return status.charAt(0).toUpperCase() + status.slice(1);
  };

  const updateApplicationStatus = (applicationId, newStatus) => {
    setApplications(prev => 
      prev.map(app => 
        app.id === applicationId ? { ...app, status: newStatus } : app
      )
    );
  };

  return (
    <div className="application-viewer">
      {/* Main Dialog */}
      {isOpen && (
        <div className="modal-overlay">
          <div className="modal-content">
            <div className="modal-header">
              <h2 className="modal-title">Applications for: {jobTitle}</h2>
              {/* <p className="modal-description">Review and manage candidate applications for this position.</p> */}
              <button className="close-button" onClick={onClose}>
                <X className="icon" />
              </button>
            </div>

            <div className="application-list-container">
              <div className="application-list-header">
                <p className="application-count">
                  {applications.length} application{applications.length !== 1 ? 's' : ''} received
                </p>
                <button className="export-button">
                  <Download className="icon" />
                  Export All
                </button>
              </div>

              <div className="divider"></div>

              {applications.length === 0 ? (
                <div className="empty-state">
                  <User className="empty-icon" />
                  <h3 className="empty-title">No applications yet</h3>
                  <p className="empty-message">
                    Applications will appear here once candidates start applying.
                  </p>
                </div>
              ) : (
                <div className="applications-grid">
                  {applications.map((application) => (
                    <div key={application.id} className="application-card">
                      <div className="application-header">
                        <div className="application-info">
                          <h3 className="candidate-name">{application.candidateName}</h3>
                          <div className="contact-info">
                            <div className="contact-item">
                              <Mail className="icon" />
                              <span>{application.email}</span>
                            </div>
                            <div className="contact-item">
                              <Phone className="icon" />
                              <span>{application.phone}</span>
                            </div>
                            <div className="contact-item">
                              <Calendar className="icon" />
                              <span>Applied: {new Date(application.appliedDate).toLocaleDateString()}</span>
                            </div>
                          </div>
                        </div>
                        <span className={`status-badge ${getStatusColor(application.status)}`}>
                          {formatStatus(application.status)}
                        </span>
                      </div>
                      <div className="application-content">
                        <div className="cover-letter-section">
                          <h4 className="section-title">Cover Letter</h4>
                          <p className="cover-letter-text">
                            {application.coverLetter}
                          </p>
                        </div>
                        
                        <div className="application-actions">
                          <button 
                            className="view-resume-button"
                            onClick={() => setSelectedApplication(application)}
                          >
                            <FileText className="icon" />
                            View Resume
                          </button>
                          <div className="action-buttons">
                            <button 
                              className="contact-button"
                              onClick={() => setContactMode(application)}
                            >
                              <Mail className="icon" />
                              Contact
                            </button>
                            <button 
                              className="review-button"
                              onClick={() => setReviewMode(application)}
                            >
                              <Eye className="icon" />
                              Review
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Resume Viewer Dialog */}
      {selectedApplication && (
        <div className="modal-overlay">
          <div className="modal-content">
            <div className="modal-header">
              <h2 className="modal-title">Resume: {selectedApplication.candidateName}</h2>
              <p className="modal-description">Complete resume and qualifications</p>
              <button className="close-button" onClick={() => setSelectedApplication(null)}>
                <X className="icon" />
              </button>
            </div>
            
            <div className="resume-content">
              <div className="info-card">
                <div className="card-header">
                  <h3 className="card-title">
                    <User className="icon" />
                    Personal Information
                  </h3>
                </div>
                <div className="card-content">
                  <div className="info-item">
                    <Mail className="icon" />
                    <span>{selectedApplication.email}</span>
                  </div>
                  <div className="info-item">
                    <Phone className="icon" />
                    <span>{selectedApplication.phone}</span>
                  </div>
                  <div className="info-item">
                    <MapPin className="icon" />
                    <span>{selectedApplication.address}</span>
                  </div>
                </div>
              </div>

              <div className="info-card">
                <div className="card-header">
                  <h3 className="card-title">
                    <GraduationCap className="icon" />
                    Education
                  </h3>
                </div>
                <div className="card-content">
                  <p>{selectedApplication.education}</p>
                </div>
              </div>

              <div className="info-card">
                <div className="card-header">
                  <h3 className="card-title">
                    <Building className="icon" />
                    Experience
                  </h3>
                </div>
                <div className="card-content">
                  <p>{selectedApplication.experience}</p>
                </div>
              </div>

              <div className="modal-footer">
                <button className="cancel-button" onClick={() => setSelectedApplication(null)}>
                  Close
                </button>
                <button className="download-button">
                  <Download className="icon" />
                  Download PDF
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Contact Dialog */}
      {contactMode && (
        <div className="modal-overlay">
          <div className="modal-content contact-modal">
            <div className="modal-header">
              <h2 className="modal-title">Contact: {contactMode.candidateName}</h2>
              <p className="modal-description">Contact information and communication options</p>
              <button className="close-button" onClick={() => setContactMode(null)}>
                <X className="icon" />
              </button>
            </div>
            
            <div className="contact-content">
              <div className="contact-card">
                <div className="contact-item">
                  <Mail className="contact-icon" />
                  <div>
                    <p className="contact-label">Email</p>
                    <p className="contact-value">{contactMode.email}</p>
                  </div>
                </div>
                <div className="contact-item">
                  <Phone className="contact-icon" />
                  <div>
                    <p className="contact-label">Phone</p>
                    <p className="contact-value">{contactMode.phone}</p>
                  </div>
                </div>
                <div className="contact-item">
                  <MapPin className="contact-icon" />
                  <div>
                    <p className="contact-label">Address</p>
                    <p className="contact-value">{contactMode.address}</p>
                  </div>
                </div>
              </div>

              <div className="contact-actions">
                <button 
                  className="email-button"
                  onClick={() => window.open(`mailto:${contactMode.email}`)}
                >
                  <Mail className="icon" />
                  Send Email
                </button>
                <button 
                  className="call-button"
                  onClick={() => window.open(`tel:${contactMode.phone}`)}
                >
                  <Phone className="icon" />
                  Call
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Review Dialog */}
      {reviewMode && (
        <div className="modal-overlay">
          <div className="modal-content review-modal">
            <div className="modal-header">
              <h2 className="modal-title">Review: {reviewMode.candidateName}</h2>
              <p className="modal-description">Review candidate application and update status</p>
              <button className="close-button" onClick={() => setReviewMode(null)}>
                <X className="icon" />
              </button>
            </div>
            
            <div className="review-content">
              <div className="review-card">
                <div className="card-header">
                  <h3 className="card-title">Application Summary</h3>
                </div>
                <div className="card-content">
                  <div className="status-section">
                    <p className="status-label">Current Status</p>
                    <span className={`status-badge ${getStatusColor(reviewMode.status)}`}>
                      {formatStatus(reviewMode.status)}
                    </span>
                  </div>
                  <div className="cover-letter-section">
                    <p className="section-label">Cover Letter</p>
                    <p className="cover-letter-text">{reviewMode.coverLetter}</p>
                  </div>
                </div>
              </div>

              <div className="review-form">
                <div className="form-group">
                  <label htmlFor="status" className="form-label">Update Status</label>
                  <select
                    id="status"
                    value={reviewMode.status}
                    onChange={(e) => updateApplicationStatus(reviewMode.id, e.target.value )}
                    className="status-select"
                  >
                    <option value="pending">Pending</option>
                    <option value="reviewed">Reviewed</option>
                    <option value="shortlisted">Shortlisted</option>
                    <option value="rejected">Rejected</option>
                  </select>
                </div>

                <div className="form-group">
                  <label htmlFor="notes" className="form-label">Review Notes</label>
                  <textarea
                    id="notes"
                    placeholder="Add your review notes here..."
                    className="notes-textarea"
                  />
                </div>
              </div>

              <div className="modal-footer">
                <button className="cancel-button" onClick={() => setReviewMode(null)}>
                  Cancel
                </button>
                <button className="save-button">
                  Save Review
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      <style jsx>{`
        .application-viewer {
          font-family: 'Inter', sans-serif;
        }

        /* Modal Styles */
        .modal-overlay {
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background-color: rgba(0, 0, 0, 0.5);
          display: flex;
          align-items: center;
          justify-content: center;
          z-index: 1000;
        }

        .modal-content {
          background-color: white;
          border-radius: 8px;
          width: 90%;
          max-width: 1200px;
          max-height: 80vh;
          overflow-y: auto;
          padding: 24px;
          box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
        }

        .contact-modal,
        .review-modal {
          max-width: 600px;
        }

        .modal-header {
          margin-bottom: 20px;
          position: relative;
        }

        .modal-title {
          font-size: 1.5rem;
          font-weight: 600;
          color: #1e3a8a;
          margin-bottom: 4px;
        }

        .modal-description {
          color: #6b7280;
          font-size: 0.875rem;
        }

        .close-button {
          position: absolute;
          top: 0;
          right: 0;
          background: none;
          border: none;
          cursor: pointer;
          color: #6b7280;
        }

        .icon {
          width: 16px;
          height: 16px;
          margin-right: 8px;
        }

        /* Application List Styles */
        .application-list-container {
          margin-top: 16px;
        }

        .application-list-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 16px;
        }

        .application-count {
          color: #6b7280;
          font-size: 0.875rem;
        }

        .export-button {
          display: flex;
          align-items: center;
          background: none;
          border: 1px solid #d1d5db;
          border-radius: 4px;
          padding: 6px 12px;
          font-size: 0.875rem;
          cursor: pointer;
        }

        .divider {
          height: 1px;
          background-color: #D6CB00;
          margin: 16px 0;
        }

        /* Empty State */
        .empty-state {
          text-align: center;
          padding: 32px;
        }

        .empty-icon {
          width: 48px;
          height: 48px;
          color: #D6CB00;
          margin-bottom: 16px;
        }

        .empty-title {
          font-size: 1.125rem;
          font-weight: 600;
          margin-bottom: 8px;
        }

        .empty-message {
          color: #6b7280;
        }

        /* Application Card */
        .applications-grid {
          display: grid;
          gap: 16px;
        }

        .application-card {
          border: 1px solid #e5e7eb;
          border-radius: 8px;
          padding: 16px;
          box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
        }

        .application-header {
          display: flex;
          justify-content: space-between;
          margin-bottom: 16px;
        }

        .application-info {
          flex: 1;
        }

        .candidate-name {
          font-size: 1.125rem;
          font-weight: 600;
          color: #000000ff;
          margin-bottom: 8px;
        }

        .contact-info {
          display: flex;
          flex-wrap: wrap;
          gap: 16px;
          font-size: 0.875rem;
          color: #000000ff;
        }

        .contact-item {
          display: flex;
          align-items: center;
          gap: 4px;
        }

        /* Status Badges */
        .status-badge {
          display: inline-block;
          padding: 1px;
          border-radius: 9999px;
          font-size: 0.75rem;
          font-weight: 500;
        }

        .status-pending {
        //   background-color: #fef3c7;
          color: #92400e;
        //   height:20px
        }

        .status-reviewed {
        //   background-color: #dbeafe;
          color: #1e40af;
        }

        .status-shortlisted {
        //   background-color: #d1fae5;
          color: #065f46;
        }

        .status-rejected {
        //   background-color: #fee2e2;
          color: #991b1b;
        }

        .status-default {
        //   background-color: #f3f4f6;
          color: #1f2937;
        }

        /* Application Content */
        .cover-letter-section {
          margin-bottom: 16px;
        }

        .section-title {
          font-weight: 600;
          color: #111827;
          margin-bottom: 8px;
        }

        .cover-letter-text {
          color: #6b7280;
          font-size: 0.875rem;
          line-height: 1.5;
        }

        .application-actions {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding-top: 16px;
          border-top: 1px solid #e5e7eb;
        }

        .view-resume-button {
          display: flex;
          align-items: center;
          background: none;
          border: 1px solid #d1d5db;
          border-radius: 4px;
          padding: 6px 12px;
          font-size: 0.875rem;
          cursor: pointer;
        }

        .action-buttons {
          display: flex;
          gap: 8px;
        }

        .contact-button,
        .review-button {
          display: flex;
          align-items: center;
          border: 1px solid #d1d5db;
          border-radius: 4px;
          padding: 6px 12px;
          font-size: 0.875rem;
          cursor: pointer;
        }

        .review-button {
          background-color: rgba(59, 130, 246, 0.1);
          color: #1d4ed8;
        }

        /* Resume Viewer Styles */
        .resume-content {
          display: grid;
          gap: 16px;
        }

        .info-card {
          border: 1px solid #e5e7eb;
          border-radius: 8px;
          padding: 16px;
          box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
        }

        .card-header {
          margin-bottom: 12px;
        }

        .card-title {
          display: flex;
          align-items: center;
          gap: 8px;
          font-size: 1rem;
          font-weight: 600;
          color: #1e3a8a;
        }

        .card-content {
          padding-left: 24px;
        }

        .info-item {
          display: flex;
          align-items: center;
          gap: 8px;
          margin-bottom: 8px;
        }

        .modal-footer {
          display: flex;
          justify-content: flex-end;
          gap: 8px;
          margin-top: 16px;
        }

        .cancel-button {
          background: none;
          border: 1px solid #d1d5db;
          border-radius: 4px;
          padding: 8px 16px;
          cursor: pointer;
        }

        .download-button,
        .save-button {
          background: linear-gradient(135deg, #3b82f6, #2563eb);
          color: white;
          border: none;
          border-radius: 4px;
          padding: 8px 16px;
          cursor: pointer;
        }

        /* Contact Modal Styles */
        .contact-content {
          display: grid;
          gap: 16px;
        }

        .contact-card {
          border: 1px solid #e5e7eb;
          border-radius: 8px;
          padding: 16px;
          box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
        }

        .contact-item {
          display: flex;
          align-items: center;
          gap: 12px;
          margin-bottom: 16px;
        }

        .contact-icon {
          color: #3b82f6;
          width: 20px;
          height: 20px;
        }

        .contact-label {
          font-weight: 500;
          margin-bottom: 4px;
        }

        .contact-value {
          color: #6b7280;
          font-size: 0.875rem;
        }

        .contact-actions {
          display: flex;
          gap: 8px;
        }

        .email-button,
        .call-button {
          flex: 1;
          display: flex;
          align-items: center;
          justify-content: center;
          border-radius: 4px;
          padding: 8px;
          cursor: pointer;
        }

        .email-button {
          background: linear-gradient(135deg, #3b82f6, #2563eb);
          color: white;
          border: none;
        }

        .call-button {
          border: 1px solid #D6CB00;
          background: white;
        }

        /* Review Modal Styles */
        .review-content {
          display: grid;
          gap: 16px;
        }

        .review-card {
          border: 1px solid #e5e7eb;
          border-radius: 8px;
          padding: 16px;
          box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
        }

        .status-section {
          margin-bottom: 16px;
        }

        .status-label {
          font-weight: 500;
          margin-bottom: 4px;
        }

        .section-label {
          font-weight: 500;
          margin-bottom: 4px;
        }

        .review-form {
          display: grid;
          gap: 16px;
        }

        .form-group {
          display: flex;
          flex-direction: column;
          gap: 4px;
        }

        .form-label {
          font-size: 0.875rem;
          font-weight: 500;
        }

        .status-select {
          padding: 0px;
          border: 1px solid #d1d5db;
          border-radius: 4px;
        }

        .notes-textarea {
          min-height: 100px;
          padding: 8px;
          border: 1px solid #d1d5db;
          border-radius: 4px;
          resize: vertical;
        }

        @media (max-width: 768px) {
          .modal-content {
            width: 95%;
            padding: 16px;
          }

          .contact-info {
            flex-direction: column;
            gap: 8px;
          }

          .application-header {
            flex-direction: column;
            gap: 8px;
          }

          .application-actions {
            flex-direction: column;
            gap: 8px;
          }

          .action-buttons {
            width: 100%;
          }

          .contact-button,
          .review-button,
          .view-resume-button {
            width: 100%;
            justify-content: center;
          }
        }
      `}</style>
    </div>
  );
};

export default InstAppViewer;