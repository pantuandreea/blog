import React from "react";
import "../css/AddArticle.css";

const AddArticle = (props) => {
    return ( 
        <div id="add-article-button">
        <div className="add__container">
          <button
            className="button open-modal fas fa-plus"
            onClick={props.handleOpen}
          >
            Add Article
          </button>
        </div>
      </div>
    );
}
 
export default AddArticle;