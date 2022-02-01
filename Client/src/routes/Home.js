import React, { useEffect, useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import NavBar from "../components/Navbar";
import AddArticle from "../components/AddArticle";
import Article from "../components/Article";
import Footer from "../components/Footer";
import DarkMode from "../components/DarkMode";
import DeleteModal from "../components/ConfirmDelete";
import Modal from '../components/Modal';
import 'react-toastify/dist/ReactToastify.css';
import "../css/Home.css";


const Home = () => {
    const [articles, setArticles] = useState([]);
    const [selectedArticleToEdit, setSelectedArticleToEdit] = useState({});
    const [numberOfArticles, setNumberOfArticles] = useState(4);
    const [indexStart, setIndexStart] = useState(0);
    const [indexEnd, setIndexEnd] = useState(3);
    const [totalNumberOfArticles, setTotalNumberOfArticles] = useState(0);
    const [showModal, setShowModal] = useState(false);
    const [showEditModal, setShowEditModal] = useState(false);
    const [day, setDay] = useState(true);
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [idToDelete, setIdToDelete] = useState("");
    const [refreshInputs, setRefreshInputs] = useState(false);


      useEffect(() => {
        console.log("here");
        getArticles();
        if (localStorage.getItem("setTheme")) {
            localStorage.getItem("setTheme") === "true"
              ? document.body.setAttribute("data-theme", "light")
              : document.body.setAttribute("data-theme", "dark");
        } else {
            document.body.setAttribute("data-theme", "light");
            localStorage.setItem("setTheme", day);
        }
      }, [indexStart, day]);
    
      const getArticles = () => {
        fetch(
          `http://localhost:3007/articles?indexStart=${indexStart}&indexEnd=${indexEnd}`
        ).then(function (response) {
          response
            .json()
            .then(function (res) {
              if (response.status === 200) {
                setArticles(res.articlesList);
                setTotalNumberOfArticles(res.numberOfArticles);
                if(res.articlesList.length === 0){
                    handlePrevious();
                }
              }
            })
            .catch((err) => console.log(err));
        });
      };
    
      //add article
      const sendDataArticle = (article) => {
        handleClose();
        fetch("http://localhost:3007/articles", {
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
          method: "POST",
          body: JSON.stringify(article),
        }).then((res) => {
          if (res.status === 200) {
            getArticles();
            toast.success('🦄 Successfully added!', {
              position: "top-right",
              autoClose: 5000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
              });
          } else {
            toast.error('An error occurred!', {
              position: "top-right",
              autoClose: 5000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
              });
          }
        });
      }
    
      //edit article
      const sendEditDataArticle = (article) => {
        handleClose();
        fetch("http://localhost:3007/articles/" + article.id, {
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
          method: "PUT",
          body: JSON.stringify(article),
        }).then((res) => {
          if (res.status === 200) {
            getArticles();
            toast.success('🦄 Succesfully edited!', {
              position: "top-right",
              autoClose: 5000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
              });
          } else {
            toast.error('An error occurred!', {
              position: "top-right",
              autoClose: 5000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
              });
          }
        });
      }
    
      //delete article
      const deleteArticle = (id) => {
        if (id) {
          fetch("http://localhost:3007/articles/" + id, { method: "DELETE" }).then(
            (res) => {
              if (res.status === 200) {
                getArticles();
                setShowDeleteModal(false);
                setIdToDelete("");
                toast.success('🦄 Successfully deleted!', {
                  position: "top-right",
                  autoClose: 5000,
                  hideProgressBar: false,
                  closeOnClick: true,
                  pauseOnHover: true,
                  draggable: true,
                  progress: undefined,
                  });
              } else {
                toast.error('An error occurred!', {
                  position: "top-right",
                  autoClose: 5000,
                  hideProgressBar: false,
                  closeOnClick: true,
                  pauseOnHover: true,
                  draggable: true,
                  progress: undefined,
                  });
              }
            }
          );
        }
      }
    
      //Add article modal close
      const handleClose = () => {
        setShowModal(false);
        setRefreshInputs(true);
      }
    
      //Add article modal open
      const handleOpen = () => {
        setShowModal(true);
        setRefreshInputs(false);
      }
    
    //   //Edit article modal close
    //   const handleEditClose = () => {
    //     setShowEditModal(false);
    //   }
    
    //   //Edit article modal open
    //   const handleEditOpen = () => {
    //     setShowEditModal(true);
    //   }
    
      //find the article that needs to be updated
      const editArticle = (id) => {
        if (id) {
          handleOpen();
          setSelectedArticleToEdit(articles.find(
            (item) => item.id === id
          ));
        }
      }
    
      const openDeleteModal = (id) => {
        setShowDeleteModal(true);
        setIdToDelete(id);
      }
    
      const closeDeleteModal = () => {
        setShowDeleteModal(false);
        setIdToDelete("");
      }
    
      const updateStartEndIndexes = (button) => {
        if (button === "next") {
          setIndexStart(indexStart + numberOfArticles);
          setIndexEnd(indexEnd + numberOfArticles);
        }
    
        if (button === "previous") {
            setIndexStart(indexStart - numberOfArticles);
            setIndexEnd(indexEnd - numberOfArticles);
        }
      }
    
      const handlePrevious = () => {
        updateStartEndIndexes("previous");
      }
    
      const handleNext = () => {
        updateStartEndIndexes("next");
      }
    
      const switchTheme = () => {
        setDay(!day);
        localStorage.setItem("setTheme", day)
      };
      
    return ( 
        <div>
        <DarkMode switchTheme={switchTheme} />
        <NavBar />

        {articles.length === 0 ? (
          <h1 className="text-center">Loading...</h1>
        ) : (
          <>
            <AddArticle
              sendDataArticle={sendDataArticle}
              showModal={showModal}
              refreshInputs={refreshInputs}
              handleClose={handleClose}
              handleOpen={handleOpen}
            />
            {articles.map((article) => {
              return (
                <Article
                  page="home"
                  key={article.id}
                  id={article.id}
                  article={article}
                  deleteArticle={deleteArticle}
                  editArticle={editArticle}
                  handleOpen={handleOpen}
                  openDeleteModal={openDeleteModal}
                ></Article>
              );
            })}
            <Footer
              page="home"
              handleNext={handleNext}
              handlePrevious={handlePrevious}
              indexStart={indexStart}
              indexEnd={indexEnd}
              totalNumberOfArticles={totalNumberOfArticles}
            />
            <Modal
                showModal={showModal}
                handleClose={handleClose}
                sendDataArticle={sendDataArticle}
                refreshInputs={refreshInputs}
            />
{/* 
            <EditModal
              sendEditDataArticle={sendEditDataArticle}
              showEditModal={showEditModal}
              handleEditClose={handleEditClose}
              article={selectedArticleToEdit}
            /> */}
            <DeleteModal
              showDeleteModal={showDeleteModal}
              deleteArticle={deleteArticle}
              closeDeleteModal={closeDeleteModal}
              idToDelete={idToDelete}
            />
            <ToastContainer
              position="top-right"
              autoClose={5000}
              hideProgressBar={false}
              newestOnTop={false}
              closeOnClick
              rtl={false}
              pauseOnFocusLoss
              draggable
              pauseOnHover
            />
          </>
        )}
      </div>
    );
}
 
export default Home;
