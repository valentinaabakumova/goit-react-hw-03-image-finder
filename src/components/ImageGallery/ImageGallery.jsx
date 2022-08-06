import React, { Component } from 'react';
import fetchImages from 'services/fetchImages';
import Loader from 'components/Loader';
import ImageGalleryItem from './ImageGalleryItem';
import Modal from 'components/Modal';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import Button from 'components/Button';

const Status = {
  START: 'start',
  LOADING: 'loading',
  SUCCSESS: 'succsess',
  FAIL: 'fail',
};

class ImageGallery extends Component {
  state = {
    page: 1,
    queryList: [],
    status: Status.START,
    showModal: false,
    showButton: false,
    largeImage: null,
    tags: null,
  };

  async componentDidUpdate(prevProps, prevState) {
    const prevQuery = prevProps.query;
    const nextQuery = this.props.query;
    const prevPage = prevState.page;
    const nextPage = this.state.page;
    try {
      if (prevQuery !== nextQuery) {
        this.setState({
          status: Status.LOADING,
          page: 1,
          queryList: [],
          showButton: false,
        });
        const searchResult = await fetchImages(nextQuery, nextPage);
        if (searchResult.hits.length === 0) {
          this.setState({ status: Status.FAIL });
        }
        if (searchResult.hits.length !== 12) {
          this.setState({
            queryList: [...searchResult.hits],
            status: Status.SUCCSESS,
          });
        } else {
          this.setState({
            showButton: true,
            queryList: [...searchResult.hits],
            status: Status.SUCCSESS,
          });
        }
      }
      if (prevQuery === nextQuery && prevPage !== nextPage) {
        const searchResult = await fetchImages(nextQuery, nextPage);
        if (searchResult.hits.length !== 12) {
          this.setState({
            showButton: false,
            queryList: [...prevState.queryList, ...searchResult.hits],
          });
        }
        if (searchResult.hits.length === 12) {
          this.setState({
            queryList: [...prevState.queryList, ...searchResult.hits],
          });
        }
      }
    } catch (error) {
      this.setState({ status: Status.FAIL });
    }
  }

  toggleModal = () => {
    this.setState(({ showModal }) => ({
      showModal: !showModal,
    }));
  };

  openModal = (largeImageURL, tags) => {
    this.toggleModal();
    this.setState({ largeImage: largeImageURL, tags });
  };

  closeModal = () => {
    this.toggleModal();
    this.setState({ largeImage: null, tags: null });
  };

  loadMore = () => {
    this.setState(prevState => ({
      page: prevState.page + 1,
    }));
  };

  render() {
    const { status, queryList, showModal, showButton } = this.state;
    const { query } = this.props;

    if (status === 'start') {
      return (
        <MyNotification>welcome to FBI service. {<br />}type.</MyNotification>
      );
    }

    if (status === 'loading') {
      return <Loader query={query} />;
    }

    if (status === 'fail') {
      return <MyNotification>nothing found</MyNotification>;
    }

    if (status === 'succsess') {
      return (
        <>
          <MyImageGallery>
            {queryList.map(({ id, webformatURL, largeImageURL, tags }) => (
              <ImageGalleryItem
                key={id}
                webformatURL={webformatURL}
                largeImageURL={largeImageURL}
                tags={tags}
                onClick={this.openModal}
              />
            ))}
          </MyImageGallery>
          {showButton && <Button loadMore={this.loadMore}>load more</Button>}
          {showModal && (
            <Modal
              onClose={this.closeModal}
              large={this.state.largeImage}
              tags={this.state.tags}
            />
          )}
        </>
      );
    }
  }
}

ImageGallery.propTypes = {
  queryList: PropTypes.arrayOf(PropTypes.shape({})),
};

const MyImageGallery = styled.ul`
  display: grid;
  max-width: calc(100vw - 48px);
  grid-template-columns: repeat(auto-fill, minmax(320px, 1fr));
  grid-gap: 16px;
  margin-top: 0;
  margin-bottom: 0;
  padding: 0;
  list-style: none;
  margin-left: auto;
  margin-right: auto;
`;
const MyNotification = styled.h3`
  font-size: 40px;
  text-align: center;
  margin-top: 20px;
  color: rgb(92, 92, 92);
  font-family: monospace;
`;

export default ImageGallery;
