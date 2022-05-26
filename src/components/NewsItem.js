import React, { Component } from "react";

export class NewsItem extends Component {
  render() {
    let { title, description, imgUrl, newsUrl, date, author, source } =
      this.props;
    return (
      <div>
        <div className="card my-3">
          <img src={imgUrl} className="card-img-top" alt="..." />
          <div className="card-body">
            <h5 className="card-title">
              {title}
              <span className="badge bg-secondary mx-1">{source}</span>
            </h5>
            <p className="card-text">{description}</p>
            <footer className="blockquote-footer my-2">
              By Author: <cite>{!author ? "Unknown" : author}</cite>
            </footer>
            <p className="card-text">
              <small className="text-muted">
                Last updated on {new Date(date).toGMTString()}
              </small>
            </p>
            <a
              href={newsUrl}
              className="btn btn-sm btn-dark"
              target="_blank"
              rel="noreferrer"
            >
              Read More
            </a>
          </div>
        </div>{" "}
      </div>
    );
  }
}

export default NewsItem;
