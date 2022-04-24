import './App.css';
import React, {Component} from "react";
import {BrowserRouter as Router, Redirect, Route, Routes} from 'react-router-dom';
import Books from '../Books/BookList/books';
import BookAdd from "../Books/BookAdd/bookAdd";
import BookEdit from "../Books/BookEdit/bookEdit";
import BookTerm from "../Books/BookTerm/bookTerm";
import Login from "../Login/login";
import Header from '../Header/header';
import BookstoreService from "../../repository/bookstoreRepository";

class App extends Component {

    constructor(props) {
        super(props);
        this.state ={
            books: [],
            authors: [],
            selectedBook: {}
        }
    }

    render() {
        return (
            <Router>
                <Header/>
                <main>
                    <div className="container">
                        <Routes>
                            <Route path={"/books"} exact render={() =>
                                <Books books={this.state.books}
                                       onDelete={this.deleteBook}
                                       onEdit={this.editBook}/>}/>

                            <Route path={"/books/add"} exact render={() =>
                                <BookAdd onAddProduct={this.addBook}/>}/>
                            <Route path={"/books/edit/:id"} exact render={() =>
                                <BookEdit onEditBook={this.editBook}
                                          book={this.state.selectedBook}/>}/>
                            <Route path={"/login"} exact render={() => <Login onLogin={this.fetchData}/>}/>
                        </Routes>
                    </div>
                </main>
            </Router>
        )
    }

    componentDidMount() {
        this.fetchData();
    }

    fetchData = () => {
        this.loadBooks();
        this.loadAuthors();
    }

    loadBooks = () => {
        BookstoreService.fetchBooks()
            .then((book) => {
                this.setState({
                    books: book.data
                })
            })
    }

    loadAuthors = () => {
        BookstoreService.fetchAuthors()
            .then((author) => {
                this.setState({
                    authors: author.data
                })
            })
    }

    deleteBook = (id) => {
        BookstoreService.deleteBook(id)
            .then(() => {
                this.loadBooks();
            });
    }
}

export default App;
