import React, { Component } from "react";
import { useEffect, useState } from "react";
import NewsItem from "./NewsItem";
import Spinner from "./Spinner";
import PropTypes from "prop-types";
import InfiniteScroll from "react-infinite-scroll-component";

const News = (props) => {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [totalResults, setTotalResults] = useState(0);

  const capitalizeFirstLetter = (string) => {
    return string.charAt(0).toUpperCase() + string.slice(1);
  };
  // document.title = `${capitalizeFirstLetter(
  //   props.category
  // )} - News App`;

  const updateNews = async (pageNo) => {
    setLoading(true);
    const url = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&page=${page}&pageSize=${props.pageSize}&apiKey=${props.apiKey}`;
    let data = await fetch(url);
    let parsedData = await data.json();
    setArticles(parsedData.articles);
    setLoading(false);
    setTotalResults(parsedData.articles);
  };

  const fetchMoreData = async () => {
    setLoading(true);
    setPage(page + 1);
    const url = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&page=${page}&pageSize=${props.pageSize}&apiKey=${props.apiKey}`;
    let data = await fetch(url);
    let parsedData = await data.json();
    setTimeout(() => {
      setArticles(articles.concat(parsedData.articles));
      setLoading(false);
      setTotalResults(parsedData.articles);
    }, 500);
  };

  useEffect(() => {
    updateNews();
  }, []);

  return (
    <div className="container my-3 text-center">
      <h2>News - Top {capitalizeFirstLetter(props.category)} Headlines</h2>

      {loading && (
        <div className="container center">
          <Spinner></Spinner>
        </div>
      )}

      <div className="container">
        <InfiniteScroll
          dataLength={articles.length}
          next={fetchMoreData}
          hasMore={articles.length <= totalResults}
          loader={<Spinner />}
          style={{
            overflow: "hidden",
          }}
        >
          <div className="row">
            {articles.map((element, index) => {
              return (
                <div className="col-md-4 " key={index}>
                  <NewsItem
                    title={element["title"] ? element.title : ""}
                    description={
                      element["description"] ? element.description : ""
                    }
                    imgUrl={
                      element.urlToImage
                        ? element.urlToImage
                        : "https://upload.wikimedia.org/wikipedia/commons/7/75/No_image_available.png"
                    }
                    newsUrl={element.url}
                    date={element.publishedAt}
                    author={element.author}
                    source={element.source.name}
                  />
                </div>
              );
            })}
          </div>
        </InfiniteScroll>
      </div>
      {/* <div className="container d-flex justify-content-center">
          <button
            type="button"
            className="btn btn-dark mx-3 my-3"
            onClick={handlePrevclick}
            disabled={state.page <= 1 || state.loading}
          >
            &larr; Previous
          </button>
          <button
            type="button"
            className="btn btn-dark mx-3 my-3"
            onClick={handleNextclick}
            disabled={
              state.loading ||
              state.page + 1 > Math.ceil(state.totalResults / 20)
            }
          >
            Next &rarr;
          </button>
        </div> */}
    </div>
  );
};
News.defaultProps = {
  country: "in",
  pageSize: 12,
  category: "general",
};
News.propTypes = {
  country: PropTypes.string,
  pageSize: PropTypes.number,
  category: PropTypes.string,
};

export default News;
