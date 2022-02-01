import React from "react";
import "../css/DeleteModal.css";

function ConfirmDelete({
  showDeleteModal,
  closeDeleteModal,
  deleteArticle,
  idToDelete,
}) {
  return showDeleteModal ? (
    <div className="modal__overlay">
      <div className="alert-container">
        <h1 className="alert-title">Delete Article</h1>
        <p className="alert-delete-p">
          Are you sure you want to delete this article?
        </p>
        <div className="clearfix">
          <button
            type="button"
            onClick={closeDeleteModal}
            className="button cancel-alert-button"
          >
            Cancel
          </button>
          <button
            type="button"
            onClick={() => deleteArticle(idToDelete)}
            className="delete-alert-button"
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  ) : null;
}

export default ConfirmDelete;
