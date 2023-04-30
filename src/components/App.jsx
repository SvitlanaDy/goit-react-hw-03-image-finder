import Modal from 'components/modal/Modal';
import SearchBar from 'components/searchbar/SearchBar';
import Loader from 'components/loader/Loader';
import Button from 'components/button/Button';
import ImageGallery from 'components/imageGallery/ImageGallery';
import { Component } from 'react';
import { getImages } from 'fetch/fetch';
import css from '../components/App.module.css';
// import { nanoid } from 'nanoid'

class App extends Component{
  state = {
    searchQuery: '',
    images: [],
    page: 1,
    status: 'idle',
    selectedImage: null,
    isShowModal: false,
    isShowLoadmore: false,
  };

    componentDidUpdate( prevProps, prevState ) {
   
      if (
        prevState.searchQuery !== this.state.searchQuery ||
        prevState.page !== this.state.page
      ) {
        this.fetchImages();
      }
    }

    fetchImages = () => {
    const {page, searchQuery} = this.state;
    getImages (page, searchQuery).then(images => {
      this.setState(prevState => ({images : [...prevState.images, ...images.hits],
        isShowLoadmore:this.state.page < Math.ceil(images.totalHits/12),
        status:'resolved'
      }))
      console.log(images)
    })  
    .catch(error => this.setState({error, status:'rejected'}))
   
  }
 
  // showModal = () => {
  //   this.setState({isShowModal: true})
  // }

  // hideModal = () => {
  //   this.setState({isShowModal: false})
  // }

  createSearchQuery = searchQuery => {
    this.setState({
      searchQuery,
      images: [],
      page: 1,
      status: 'pending',
    });
  };

toggleModal = () => {
this.setState(({ isShowModal }) => ({
  isShowModal: !isShowModal,
}));
};


onSelectImage = largeImageURL => {
  this.setState({ selectedImage: largeImageURL, isShowModal: true });
};

handleLoadmore = () => {
  this.setState(
    prevState => ({
      page: prevState.page + 1,
    })
  );
};


render() {


const { isShowModal, status, images, selectedImage } = this.state;
return(
  <div>
     <SearchBar onSubmit = {this.createSearchQuery}/>
      { status === 'pending' && <Loader/>}
      {/* { status === 'rejected' && </>} */}
      { status === 'resolved' && (
        <div>{images.length > 0 ? (<>
        <ImageGallery images = {images} onSelect = {this.onSelectImage}  />
        {this.state.isShowLoadmore && (<Button onClick = {this.handleLoadmore} >Load More</Button>)}
      
        </>):(<h1 className={css.appHeader}> Nothing is here, pls enter smth else</h1>)}
        </div>
        )}
     {isShowModal && (<Modal onClose={this.toggleModal} selectedImage={selectedImage}/>)}
  </div>
);
}
}


export default App;
