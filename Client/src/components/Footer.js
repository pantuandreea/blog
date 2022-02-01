import React from "react";
import { Link } from "react-router-dom";
import "../css/Footer.css";

function Footer(props) {
  return (
    <div>
      {props.page === "home" ? (
        <footer className="footer next-button-class">
          {props.indexStart === 0 ? (
            <div></div>
          ) : (
            <button
              className="footer__link footer__link--previous"
              id="button-prev"
              onClick={props.handlePrevious}
            >
              previous
            </button>
          )}
          {props.indexEnd < props.totalNumberOfArticles - 1 && (
            <button
              className="footer__link footer__link--next"
              id="button-next"
              onClick={props.handleNext}
            >
              next
            </button>
          )}
        </footer>
      ) : (
        <footer className="footer">
          {props.prevArticle ? (
            <Link to={"/article/" + props.prevArticle}>
              <button className="footer__link">previous article</button>
            </Link>
          ) : (
            <div></div>
          )}
          {props.nextArticle ? (
            <Link to={"/article/" + props.nextArticle}>
              <button className="footer__link footer__link--next">
                next article
              </button>
            </Link>
          ) : null}
        </footer>
      )}
    </div>
  );
}

export default Footer;
