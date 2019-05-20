import React, { Component } from 'react';
import Products from './Products/Products';
import Nav from './Menu/Nav';
import Footer from './Menu/Footer';

class App extends Component {
    render() {
        return (
            <div>
                <Nav />
            <div style={{backgroundColor: "#bbbbbb", paddingTop: "5vh"}} >

                <Products />
            </div>
            <Footer />
            </div>
        );
    }
}

export default App;