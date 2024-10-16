import React, { useState } from 'react';
// import 'bootstrap/dist/css/bootstrap.min.css';
// import './ReviewForm.css'; // Custom CSS for additional styling

const ReviewForm = () => {
  const [showModal, setShowModal] = useState(false);
  const [name, setName] = useState('');
  const [review, setReview] = useState('');
  const [rating, setRating] = useState(5);
  

  const handleSubmit = (e) => {
    e.preventDefault();
    // Add your review logic here
    setName('');
    setReview('');
    setRating(5);
    setShowModal(false); // Close modal after submission
  };

  return (
    <div className="container text-center mt-4">
      {/* Button to trigger the modal */}
      <button className="btn open-modal-btn" onClick={() => setShowModal(true)}>
        Add Review
      </button>

      {/* Bootstrap Modal */}
      {showModal && (
        <div className="modal fade show d-block" tabIndex="-1" role="dialog">
          <div className="modal-dialog modal-dialog-centered" role="document">
            <div className="modal-content">
              <div className="modal-header custom-modal-header">
                <h5 className="modal-title">Add Your Review</h5>
                <button type="button" className="close" onClick={() => setShowModal(false)}>
                  <span>&times;</span>
                </button>
              </div>

              <div className="modal-body">
                <form onSubmit={handleSubmit} className="form-group">
                  <input
                    type="text"
                    className="form-control mb-3"
                    placeholder="Your Name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                  />

                  <textarea
                    className="form-control mb-3"
                    placeholder="Your Review"
                    value={review}
                    onChange={(e) => setReview(e.target.value)}
                    required
                    rows="4"
                  />

                  <div className="mb-3">
                    <label className="form-label">Rating: </label>
                    <select className="form-select" value={rating} onChange={(e) => setRating(Number(e.target.value))}>
                      {[5, 4, 3, 2, 1].map(num => (
                        <option key={num} value={num}>{num}</option>
                      ))}
                    </select>
                  </div>

                  <div className="modal-footer">
                    <button type="submit" className="btn submit-btn">Submit Review</button>
                    <button type="button" className="btn close-btn" onClick={() => setShowModal(false)}>
                      Cancel
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ReviewForm;
