import React, { useState } from "react";

import "./Model.css";

export const Modal = ({ closeModal, onSubmit, defaultValue }) => {
  const [formState, setFormState] = useState(
    defaultValue || {
      title: "",
      description: "",
      category: "work",
    }
  );
  const [errors, setErrors] = useState("");

  const validateForm = () => {
    if (formState.title && formState.description && formState.category) {
      setErrors("");
      return true;
    } else {
      let errorFields = [];
      for (const [key, value] of Object.entries(formState)) {
        if (!value) {
          errorFields.push(key);
        }
      }
      setErrors(errorFields.join(", "));
      return false;
    }
  };

  const handleChange = (e) => {
    setFormState({ ...formState, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!validateForm()) return;

    onSubmit(formState);

    closeModal();
  };
  const goBack=()=>{
    closeModal();
  }

  return (
    <div
      className="modal-container"
      onClick={(e) => {
        if (e.target.className === "modal-container") closeModal();
      }}
    >
      <div className="modal">
        <form>
          <div className="form-group">
            <label htmlFor="title">Title<span className="req">*</span></label>
            <input name="title" onChange={handleChange} value={formState.title} />
          </div>
          <div className="form-group">
            <label htmlFor="description">Description<span className="req">*</span></label>
            <textarea
              name="description"
              onChange={handleChange}
              value={formState.description}
            />
          </div>
          <div className="form-group">
            <label htmlFor="status">Categor</label>
            <select
              name="Category"
              onChange={handleChange}
              value={formState.category}
            >
              <option value="live">Work</option>
              <option value="draft">Personal</option>
              <option value="error">Others</option>
            </select>
          </div>
          {errors && <div className="error">{`Please include: ${errors}`}</div>}
          <div className="btn-con">
          <button type="submit" className="btn" onClick={handleSubmit}>
            Submit
          </button>
          <button type="button" className="btn back-btn" onClick={goBack}>
            Back
          </button>
          </div>
        </form>
      </div>
    </div>
  );
};