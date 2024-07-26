import React from 'react';
import '../style.css';

function CardForm({ formData, handleChange, handleSubmit, handleCancel }) {
    return (
        <form className="card-form" onSubmit={handleSubmit}>
            <div className="form-group">
                <label htmlFor="front">Front</label>
                <textarea
                    id="front"
                    name="front"
                    value={formData.front}
                    onChange={handleChange}
                    required
                    className="form-control"
                />
            </div>
            <div className="form-group">
                <label htmlFor="back">Back</label>
                <textarea
                    id="back"
                    name="back"
                    value={formData.back}
                    onChange={handleChange}
                    required
                    className="form-control"
                />
            </div>
            <div className="form-actions">
                <button type="submit" className="btn btn-submit">Submit</button>
                <button type="button" onClick={handleCancel} className="btn btn-cancel">Cancel</button>
            </div>
        </form>
    );
}

export default CardForm;
