import './App.css';
import React, {Component} from "react";
import {BrowserRouter as Router, Redirect, Route, Routes} from 'react-router-dom';
import Books from '../Books/BookList/books';
import BookAdd from "../Books/BookAdd/bookAdd";
import BookEdit from "../Books/BookEdit/bookEdit";
import BookTerm from "../Books/BookTerm/bookTerm";
import Category from "../Categories/category";
import Login from "../Login/login";
import Header from '../Header/header';
import BookstoreService from "../../repository/bookstoreRepository";

class App extends Component {

    constructor(props) {
        super(props);
        this.state ={
            books: [],
            categories: [],
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
                            <Route path={"/categories"} exact render={() =>
                                <Category categories={this.state.categories}/>}/>
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
        this.loadCategories();
    }

    loadBooks = () => {
        BookstoreService.fetchBooks()
            .then((book) => {
                this.setState({
                    books: book.data
                })
            })
    }

    loadCategories = () => {
        BookstoreService.fetchCategories()
            .then((category) => {
                this.setState({
                    category: category.data
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
