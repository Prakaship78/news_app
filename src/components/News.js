import React, { Component } from "react";
import NewsItem from "./NewsItem";
import Spinner from "./Spinner";
import PropTypes from "prop-types";
import InfiniteScroll from "react-infinite-scroll-component";

export class News extends Component {
  static defaultProps = {
    country: "in",
    pageSize: 12,
    category: "general",
  };
  static propTypes = {
    country: PropTypes.string,
    pageSize: PropTypes.number,
    category: PropTypes.string,
  };

  constructor() {
    super();
    console.log("contructor from new component ");
    this.state = {
      articles: [],
      loading: true,
      page: 1,
      totalResults: 0,
    };
  }
  capitalizeFirstLetter = (string) => {
    return string.charAt(0).toUpperCase() + string.slice(1);
  };

  async componentDidMount() {
    this.updateNews();
    document.title = `${this.capitalizeFirstLetter(
      this.props.category
    )} - News App`;
  }

  async updateNews(pageNo) {
    this.setState({ loading: true });
    const url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&page=${this.state.page}&pageSize=${this.props.pageSize}&apiKey=${this.props.apiKey}`;
    let data = await fetch(url);
    let parsedData = await data.json();

    this.setState({
      articles: parsedData.articles,
      loading: false,
      totalResults: parsedData.totalResults,
    });
  }

  // // TODO:next click
  // handleNextclick = async () => {
  //   this.setState({ page: this.state.page + 1 });
  //   this.updateNews();
  // };

  // handlePrevclick = async () => {
  //   this.setState({ page: this.state.page - 1 });
  //   this.updateNews();
  // };
  fetchMoreData = async () => {
    this.setState({
      page: this.state.page + 1,
    });
    this.setState({ loading: true });
    const url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&page=${this.state.page}&pageSize=${this.props.pageSize}&apiKey=${this.props.apiKey}`;
    let data = await fetch(url);
    let parsedData = await data.json();
    setTimeout(() => {
      this.setState({
        articles: this.state.articles.concat(parsedData.articles),
        loading: false,
        totalResults: parsedData.totalResults,
      });
    }, 500);
  };

  render() {
    return (
      <div className="container my-3 text-center">
        <h2>
          News - Top {this.capitalizeFirstLetter(this.props.category)} Headlines
        </h2>

        {this.state.loading && (
          <div className="container center">
            <Spinner></Spinner>
          </div>
        )}

        <div className="container">
          <InfiniteScroll
            dataLength={this.state.articles.length}
            next={this.fetchMoreData}
            hasMore={this.state.articles.length <= this.state.totalResults}
            loader={<Spinner />}
            style={{
              overflow: "hidden",
            }}
          >
            <div className="row">
              {this.state.articles.map((element, index) => {
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
            onClick={this.handlePrevclick}
            disabled={this.state.page <= 1 || this.state.loading}
          >
            &larr; Previous
          </button>
          <button
            type="button"
            className="btn btn-dark mx-3 my-3"
            onClick={this.handleNextclick}
            disabled={
              this.state.loading ||
              this.state.page + 1 > Math.ceil(this.state.totalResults / 20)
            }
          >
            Next &rarr;
          </button>
        </div> */}
      </div>
    );
  }
}

export default News;
