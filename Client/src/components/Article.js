import React from "react";
import { Link } from "react-router-dom";
import "../css/Article.css";

const Article = (props) => {
    let text = props.article.content;
    let spliced = text.substring(0, text.length / 2);
    let firstParagraph;
    if (
      text.charAt(spliced.length - 1) === "!" ||
      text.charAt(spliced.length - 1) === "." ||
      text.charAt(spliced.length - 1) === "?"
    ) {
      firstParagraph = text.substring(0, text.length / 2);
    } else {
      firstParagraph = text.substring(0, spliced.lastIndexOf(".") + 1);
    }
    let secondParagraph = text.substring(spliced.lastIndexOf(".") + 1);

    return (
      <div id={props.article.id}>
        <h2 className="title">{props.article.title}</h2>
        <ul className="info__container">
          <li className="info__item">{props.article.tag}</li>
          <li className="info__item">
            Added by
            <span className="info__mark point">
              {" "}
              {props.article.author}
            </span>
          </li>
          <li className="info__item">{props.article.date}</li>
        </ul>

        <div className="actions__container">
          {props.page === "home" && (
            <>
              <button
                type="button"
                className="actions__btn border"
                id={props.article.id}
                onClick={() => props.editArticle(props.article.id)}
              >
                Edit
              </button>
              <button
                type="button"
                className="actions__btn"
                id={props.article.id}
                onClick={() => props.openDeleteModal(props.article.id)}
              >
                Delete
              </button>
            </>
          )}
          <img
            src={
              props.page === "home"
                ? props.article.imgUrl
                : "../" + props.article.imgUrl
            }
            alt={props.article.imgAlt}
          ></img>
          <div className="content__container">
            {props.page === "home" ? (
              <p>{props.article.content}</p>
            ) : (
              <>
                <p>{firstParagraph}</p>
                <p className="saying">{props.article.saying}</p>
                <p>{secondParagraph}</p>
              </>
            )}
          </div>
          {props.page === "home" && (
            <div className="readmore__container">
              <Link
                className="btn-details"
                to={"/article/" + props.article.id}
              >
                <button type="button" className="button button-details">
                  Read More
                </button>
              </Link>
            </div>
          )}
        </div>
      </div>
    );
}

export default Article;
