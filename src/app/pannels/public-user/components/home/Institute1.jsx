import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Plus, MapPin, Clock, Users, Briefcase, GraduationCap, ArrowLeft } from "lucide-react";
import InstAppViewer from './InstAppViewer'; // Adjust path as needed

const Institute1 = () => {
  const [showForm, setShowForm] = useState(false);
  const [selectedJobForApplications, setSelectedJobForApplications] = useState(null);
  const [vacancies, setVacancies] = useState([
    {
      id: "1",
      title: "Assistant Professor - Computer Science",
      department: "Computer Science",
      location: "Main Campus",
      type: "Full-time",
      // salary: "$65,000 - $85,000",
      description: "We are seeking a dynamic Assistant Professor to join our Computer Science department.",
      requirements: "PhD in Computer Science or related field",
      deadline: "2024-03-15",
      postedDate: "2024-02-01"
    }
  ]);
  const [formData, setFormData] = useState({
    title: "",
    department: "",
    location: "",
    type: "",
    salary: "",
    description: "",
    requirements: "",
    deadline: ""
  });
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    
    const newVacancy = {
      id: Date.now().toString(),
      ...formData,
      postedDate: new Date().toISOString().split('T')[0]
    };
    
    setVacancies([newVacancy, ...vacancies]);
    setFormData({
      title: "",
      department: "",
      location: "",
      type: "",
      salary: "",
      description: "",
      requirements: "",
      deadline: ""
    });
    setShowForm(false);
    
    alert("Job vacancy posted successfully!");
  };

  const handleInputChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  return (
    <div className="institute-portal">
      {/* Header */}
      <div className="portal-header">
        <div className="header-container">
          <div className="header-navigation">
            <button
              className="back-button"
              onClick={() => navigate("/inst-portal")}
            >
              <ArrowLeft className="icon-small" />
              Back to Academic
            </button>
          </div>
          <div className="header-title-container">
            <GraduationCap className="header-icon" />
            <h1 className="header-title">Institute Career Portal</h1>
          </div>
          <p className="header-description">
            Manage and post job vacancies for your institute.
          </p>
        </div>
      </div>

      <div className="portal-content">
        {/* Action Section */}
        <div className="action-section">
          <div className="action-text">
            <h2 className="section-title">Job Vacancies</h2>
            <p className="section-subtitle">Manage your institute's current job openings</p>
          </div>
          <button 
            className="new-vacancy-button"
            onClick={() => setShowForm(!showForm)}
          >
            <Plus className="button-icon" />
            Post New Vacancy
          </button>
        </div>

        {/* Add Job Form */}
        {showForm && (
          <div className="job-form-card">
            <div className="form-card-header">
              <h3 className="form-title">Post New Job Vacancy</h3>
              <p className="form-subtitle">Fill in the details for your new job posting</p>
            </div>
            <div className="form-card-content">
              <form onSubmit={handleSubmit} className="vacancy-form">
                <div className="form-grid">
                  <div className="form-group">
                    <label htmlFor="title">Job Title</label>
                    <input
                      id="title"
                      type="text"
                      value={formData.title}
                      onChange={(e) => handleInputChange("title", e.target.value)}
                      placeholder="e.g., Assistant Professor - Physics"
                      required
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="department">Department</label>
                    <input
                      id="department"
                      type="text"
                      value={formData.department}
                      onChange={(e) => handleInputChange("department", e.target.value)}
                      placeholder="e.g., Physics Department"
                      required
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="location">Location</label>
                    <input
                      id="location"
                      type="text"
                      value={formData.location}
                      onChange={(e) => handleInputChange("location", e.target.value)}
                      placeholder="e.g., Main Campus, Building A"
                      required
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="type">Employment Type</label>
                    <select
                      id="type"
                      value={formData.type}
                      onChange={(e) => handleInputChange("type", e.target.value)}
                      required
                    >
                      <option value="">Select employment type</option>
                      <option value="Full-time">Full-time</option>
                      <option value="Part-time">Part-time</option>
                      <option value="Contract">Contract</option>
                      <option value="Visiting">Visiting Position</option>
                    </select>
                  </div>
                  {/* <div className="form-group">
                    <label htmlFor="salary">Salary Range</label>
                    <input
                      id="salary"
                      type="text"
                      value={formData.salary}
                      onChange={(e) => handleInputChange("salary", e.target.value)}
                      placeholder="e.g., $50,000 - $70,000"
                      required
                    />
                  </div> */}
                  <div className="form-group">
                    <label htmlFor="deadline">Application Deadline</label>
                    <input
                      id="deadline"
                      type="date"
                      value={formData.deadline}
                      onChange={(e) => handleInputChange("deadline", e.target.value)}
                      required
                    />
                  </div>
                </div>
                
                <div className="form-group">
                  <label htmlFor="description">Job Description</label>
                  <textarea
                    id="description"
                    value={formData.description}
                    onChange={(e) => handleInputChange("description", e.target.value)}
                    placeholder="Describe the role and responsibilities..."
                    required
                  />
                </div>
                
                <div className="form-group">
                  <label htmlFor="requirements">Requirements</label>
                  <textarea
                    id="requirements"
                    value={formData.requirements}
                    onChange={(e) => handleInputChange("requirements", e.target.value)}
                    placeholder="List required qualifications..."
                    required
                  />
                </div>

                <div className="form-actions">
                  <button 
                    type="submit" 
                    className="submit-button"
                  >
                    Post Vacancy
                  </button>
                  <button 
                    type="button" 
                    className="cancel-button"
                    onClick={() => setShowForm(false)}
                  >
                    Cancel
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

        {/* Job Listings */}
        <div className="job-listings">
          {vacancies.map((vacancy) => (
            <div key={vacancy.id} className="job-card">
              <div className="job-card-header">
                <div className="job-card-title-section">
                  <h3 className="job-title">{vacancy.title}</h3>
                  <div className="job-meta">
                    <div className="meta-item">
                      <Briefcase className="meta-icon" />
                      {vacancy.department}
                    </div>
                    <div className="meta-item">
                      <MapPin className="meta-icon" />
                      {vacancy.location}
                    </div>
                    <div className="meta-item">
                      <Clock className="meta-icon" />
                      Deadline: {new Date(vacancy.deadline).toLocaleDateString()}
                    </div>
                  </div>
                </div>
                <div className="job-card-badge-section">
                  <span className="job-type-badge">{vacancy.type}</span>
                  <div className="job-salary">{vacancy.salary}</div>
                </div>
              </div>
              <div className="job-card-content">
                <div className="job-section">
                  <h4 className="section-heading">Description</h4>
                  <p className="section-text">{vacancy.description}</p>
                </div>
                <div className="job-section">
                  <h4 className="section-heading">Requirements</h4>
                  <p className="section-text">{vacancy.requirements}</p>
                </div>
                <div className="job-card-footer">
                  <div className="posted-date">
                    Posted on {new Date(vacancy.postedDate).toLocaleDateString()}
                  </div>
                  <div className="job-actions">
                    <button className="edit-button">
                      Edit
                    </button>
                    <button 
                      className="view-applications-button"
                      onClick={() => setSelectedJobForApplications(vacancy)}
                    >
                      View Applications
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {vacancies.length === 0 && !showForm && (
          <div className="empty-state-card">
            <div className="empty-state-content">
              <Users className="empty-state-icon" />
              <h3 className="empty-state-title">No job vacancies posted yet</h3>
              <p className="empty-state-text">Start by posting your first job vacancy</p>
              <button 
                className="empty-state-button"
                onClick={() => setShowForm(true)}
              >
                <Plus className="button-icon" />
                Post Your First Vacancy
              </button>
            </div>
          </div>
        )}

        {/* Application Viewer */}
        {selectedJobForApplications && (
          <InstAppViewer 
            jobTitle={selectedJobForApplications.title} 
            jobId={selectedJobForApplications.id}
            isOpen={!!selectedJobForApplications}
            onClose={() => setSelectedJobForApplications(null)}
          />
        )}
      </div>

      <style jsx>{`
        .institute-portal {
          min-height: 100vh;
          background-color: #f8f9fa;
        }

        /* Header Styles */
        .portal-header {
          background: linear-gradient(135deg, #fc9369cb, #ebbd25d2);
          color: white;
          padding-top: 6rem ;
          padding-bottom:2rem;
        }

        .header-container {
          max-width: 1200px;
          margin: 0 auto;
          padding: 0 1rem;
        }

        .back-button {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          background: transparent;
          border: none;
          color: white;
          cursor: pointer;
          padding: 0.5rem;
          margin-bottom: 1rem;
        }

        .header-title-container {
          display: flex;
          align-items: center;
          gap: 0.75rem;
          margin-bottom: 1rem;
        }

        .header-title {
          font-size: 1.875rem;
          margin: 0;
        }

        .header-description {
          color: #fff;
          max-width: 600px;
        }

        /* Main Content */
        .portal-content {
          max-width: 1200px;
          margin: 0 auto;
          padding: 2rem 1rem;
        }

        .action-section {
          display: flex;
          justify-content: space-between;
          margin-bottom: 2rem;
        }

        .section-title {
          font-size: 1.5rem;
          margin-bottom: 0.5rem;
        }

        .new-vacancy-button {
          display: flex;
          align-items: center;
        //   gap: 0.5rem;
          background: linear-gradient(90deg,rgba(42, 123, 155, 1) 50%, rgba(87, 199, 133, 1) 100%);
          color: white;
          border: none;
          padding: 1rem;
          border-radius: 0.5rem;
          cursor: pointer;
        }

        /* Job Form Styles */
        .job-form-card {
          background: white;
          border-radius: 0.5rem;
          box-shadow: 0 1px 3px rgba(0,0,0,0.1);
          margin-bottom: 2rem;
        }

        .form-card-header {
          padding: 1.5rem;
          border-bottom: 1px solid #eee;
        }

        .form-title {
          font-size: 1.25rem;
          margin-bottom: 0.5rem;
        }

        .form-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
          gap: 1rem;
          margin-bottom: 1.5rem;
        }

        .form-group {
          margin-bottom: 1rem;
        }

        .form-group label {
          display: block;
          margin-bottom: 0.5rem;
        }

        .form-group input,
        .form-group select,
        .form-group textarea {
          width: 100%;
          padding: 0.5rem;
          border: 1px solid #ddd;
          border-radius: 0.25rem;
        }

        .form-actions {
          display: flex;
          gap: 0.75rem;
          padding-top: 1rem;
        }

        .submit-button {
          background: #3b82f6;
          color: white;
          border: none;
          padding: 0.75rem 1.5rem;
          border-radius: 0.25rem;
          cursor: pointer;
        }

        .cancel-button {
          background: white;
          border: 1px solid #ddd;
          padding: 0.75rem 1.5rem;
          border-radius: 0.25rem;
          cursor: pointer;
        }

        /* Job Listings */
        .job-listings {
          display: grid;
          gap: 1.5rem;
        }

        .job-card {
          background: white;
          border-radius: 0.5rem;
          box-shadow: 0 1px 3px rgba(0,0,0,0.1);
        }

        .job-card-header {
          display: flex;
          justify-content: space-between;
          padding: 1.5rem;
          border-bottom: 1px solid #eee;
        }

        .job-title {
          font-size: 1.25rem;
          margin-bottom: 0.5rem;
        }

        .job-meta {
          display: flex;
          gap: 1rem;
          color: #666;
          font-size: 0.875rem;
        }

        .meta-item {
          display: flex;
          align-items: center;
          gap: 0.25rem;
        }

        .job-type-badge {
          background: #e0e7ff;
          color: #4338ca;
          padding: 0.25rem 0.5rem;
          border-radius: 9999px;
          font-size: 0.75rem;
        }

        .job-card-content {
          padding: 1.5rem;
        }

        .section-heading {
          font-size: 1rem;
          margin-bottom: 0.5rem;
        }

        .job-card-footer {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding-top: 1rem;
          border-top: 1px solid #eee;
          font-size: 0.875rem;
          color: #666;
        }

        .job-actions {
          display: flex;
          gap: 0.5rem;
        }

        .edit-button,
        .view-applications-button {
          padding: 0.5rem 1rem;
          border: 1px solid #ddd;
          border-radius: 0.25rem;
          background: white;
          cursor: pointer;
        }

        /* Empty State */
        .empty-state-card {
          text-align: center;
          padding: 3rem;
          background: white;
          border-radius: 0.5rem;
        }

        .empty-state-title {
          font-size: 1.125rem;
          margin-bottom: 0.5rem;
        }

        .empty-state-button {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          margin: 1rem auto 0;
          background: #3b82f6;
          color: white;
          border: none;
          padding: 0.75rem 1.5rem;
          border-radius: 0.5rem;
          cursor: pointer;
        }

        /* Application Viewer Modal */
        .application-viewer-modal {
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: rgba(0,0,0,0.5);
          display: flex;
          align-items: center;
          justify-content: center;
          z-index: 100;
        }

        .modal-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 1.5rem;
          border-bottom: 1px solid #eee;
        }

        .close-modal-button {
          background: none;
          border: none;
          font-size: 1.5rem;
          cursor: pointer;
        }

        .modal-content {
          background: white;
          width: 90%;
          max-width: 800px;
          max-height: 80vh;
          overflow-y: auto;
          border-radius: 0.5rem;
        }

        .applications-list {
          padding: 1.5rem;
        }

        .application-item {
          padding: 1rem;
          border-bottom: 1px solid #eee;
        }

        @media (max-width: 768px) {
          .action-section {
            flex-direction: column;
            gap: 1rem;
          }
          
          .job-card-header {
            flex-direction: column;
            gap: 1rem;
          }
        }
      `}</style>
    </div>
  );
};

export default Institute1;