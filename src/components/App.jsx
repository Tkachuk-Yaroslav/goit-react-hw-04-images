import getImg from 'services/gallaryApi';
import { Loader } from './Loader/Loader';
import Searchbar from './Searchbar/Searchbar';
import React, { Component } from 'react';
import ImageGallery from './ImageGallery/ImageGallery';
import Button from './Button/Button';
import { Report } from 'notiflix/build/notiflix-report-aio';

const LIMIT = 12;
export default class App extends Component {
  state = {
    searchQuery: '',
    isLoading: false,
    isLoadMore: false,
    images: null,
    // error: null,
    modalImg: '',
    showModal: false,
  };
  pageDef = 1;
  currentPage = 1;
  incrementPage = () => {
    return (this.pageDef = this.pageDef + 1);
  };

  async componentDidUpdate(prevProps, prevState) {
    const { searchQuery } = this.state;

    if (prevState.searchQuery !== searchQuery) {
      if (searchQuery === '') {
        Report.failure('Enter something!', '', 'Okay');
        this.setState({
          images: [],
          isLoadMore: false,
        });

        return;
      }
      try {
        this.currentPage = 1;
        this.pageDef = 1;
        this.setState({
          isLoading: true,
        });

        const data = await getImg(searchQuery, this.currentPage, LIMIT);

        if (!data.hits.length) {
          this.setState({
            images: null,
            isLoadMore: false,
          });
          Report.failure('Nothing found, try again!', '', 'Okay');
          return;
        }

        // if (data.totalHits / data.hits.length > 1) {
        //   this.setState({ isLoadMore: true });
        // } else {
        //   this.setState({ isLoadMore: false });
        // }
        this.setState({
          isLoadMore: data.totalHits > data.hits.length,
          images: data.hits,
        });
        // this.setState(
        //   prevS => ({
        //     images: data.hits,
        //   }),
        //   () => console.log('images', this.state.images)
        // );
      } catch (error) {
        console.error('Помилка під час отримання даних:', error);
      } finally {
        this.setState({
          isLoading: false,
        });
      }
    }

    if (this.state.searchQuery === '') {
      Report.failure('Enter something!', '', 'Okay');
      return;
    }
  }

  handleLoadMore = async () => {
    try {
      // console.log(
      //   'Клацнули на лоад мор, потрібно зробити перевірку стейта: серч квері і в залежності від цього міняти сторінку або скидати до одиниці'
      // );

      this.currentPage += 1;
      // console.log('currentPage', this.currentPage);

      this.setState(prev => ({
        isLoading: true,
      }));

      const data = await getImg(
        this.state.searchQuery,
        this.incrementPage(),
        LIMIT
      );

      if (data.totalHits > LIMIT * this.currentPage) {
        this.setState({ isLoadMore: true });
      } else {
        this.setState({ isLoadMore: false });
      }

      this.setState(
        prevS => ({
          images: [...prevS.images, ...data.hits],
        }),
        () => console.log('imagesLoadMore', this.state.images)
      );
    } catch (error) {
      console.error('Помилка під час отримання даних:', error);
      // this.setState({ error });
    } finally {
      this.setState({
        isLoading: false,
      });
    }
  };

  onFormSubmit = dataFromSearchbar => {
    this.setState({ searchQuery: dataFromSearchbar });
  };

  render() {
    const { images, isLoadMore, isLoading } = this.state;
    const { onFormSubmit, handleLoadMore } = this;

    return (
      <div className="App">
        <Searchbar onSubmit={onFormSubmit} />

        {images && <ImageGallery images={images} />}

        {isLoading && <Loader />}

        {/* {this.state.error && <h1>{this.state.error.message}</h1>} */}

        {isLoadMore && <Button handleLoadMore={handleLoadMore} />}
      </div>
    );
  }
}
