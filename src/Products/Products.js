import React, { Component } from 'react';
import {Col, Row, Container} from 'react-bootstrap';
import Axios from 'axios';
import Ads from '../Ads/Ads';
import SortProduct from './SortProduct';
import { relativeTime } from '../helpers';
import Loader from '../Loader';



class Products extends Component {
    constructor(props){
        super(props)
        this.state = {
            productList: [],
            limits: 20,
            pages: 0,
            totalPage: null,
            scrolling: false,
            loading: false,
            scrollEnd: false,
            products:[],
            sortValue: "",
            sorting :false
        }
        this.loadMore = this.loadMore.bind(this)
        this.handleScroll = this.handleScroll.bind(this)
        this.sortProducts = this.sortProducts.bind(this)

    }

    //Component Life cycle to render the product and listen to when onscroll
    componentWillMount(){
        this.loadProducts()
        this.scrollListener = window.addEventListener('scroll', (e) => {
            this.handleScroll(e)
        })
    }

        //THE FUNCTION THAT HANDLES THE INFINITE SCROLL
    handleScroll(e) {
        const {scrolling, totalPage, pages} = this.state
        if (scrolling) return
        if (totalPage <= pages) return
        const lastItem = document.querySelector('ul > li:last-child')
        const lastOffset = lastItem.offsetTop + lastItem.clientHeight 
        const pageOffset = window.pageYOffset + window.innerHeight
        var bottomOffset = 20
        if (pageOffset > lastOffset - bottomOffset)  this.loadMore()
    }

        //FUNCTION THAT HANDLE FETCHING OF DATA USING AXIOS
    loadProducts(){
        const {limits, pages, productList, sortValue} = this.state
        var url = this.state.sorting ?  `${API_URL}/api/products?_page=${pages}&_limit=${limits}` : 
        `${API_URL}/api/products?_page=${pages}&_limit=${limits}&_sort=${sortValue}`;
        ;
        this.setState({
            scrolling: true
        })
        Axios.get(url).then(response => {
            this.setState({
                productList: [...productList, ...response.data],
                scrolling: false,
                totalPage: response.data.length
            })
            console.log('oooooooooo',response.length)
        })
    }

    //THIS FUNCTION INCREMENT THE PAGES WHEN THE USER SCROLLS 
    loadMore(){
        
        this.setState(prevState => ({
            pages: prevState.pages + 1,
            scrolling: true,
        }), this.loadProducts)
    }

    //THIS FUNCTION HANDLES SORTING OF PRICES, SIZE AND ID
    sortProducts (e) {
        this.setState({
            pages : 0,
            sortValue :  e.target.value,
            sortting : true
        });
        const {limits, pages} = this.state
        let {value} = e.target
        Axios.get(`${API_URL}/api/products?_page=${0}&_limit=${limits}&_sort=${value}`).then(response => {
            this.setState({
                loading: false,
                productList: response.data,
            })
        })
        this.handleScroll(e)

    }


    //USED THIS FUNCTION TO APPEND THE ADS COMPONENT TO THE LIST OF ITEMS
    renderAds(i){
        if(((i + 1) % this.state.limits) === 0){
            return (
                <Ads />
            )
        }
    }
    renderProducts(){
        let {productList} = this.state
        return (
            productList.map((product, index) => (
                <li  className="cover" id={index} key={index}>
                    <div className="container_card">
                        <div className="cover_face" style={{fontSize: product.size}}>
                            <div>{product.face}</div>
                        </div>
                        <div style={{ paddingTop: 5 }}>
                            <div className="date0">
                                <div>
                                    <b>Size</b>: <span>{product.size}</span>
                                    <br />
                                    <b>Price</b>: <span>${product.price}</span>
                                </div>
                            </div>
                        </div>
                        <div>
                            <span className="date1">Added Date: {relativeTime(product.date)}</span>
                        </div>


                    </div>
                    <br />
                    <div>

                    {this.renderAds(index)}
                    </div>
                </li>
            ))
        )
    }
    render() {
        let {loading, scrolling} = this.state
        return (
            < Container>
            {/* PASSING THE FUNCTION AS A PROPS TO THE SORTPRODUCT COMPONENT AND ALSO BINDING IT. */}

                <SortProduct sortProducts = {this.sortProducts}/>
                <ul className="prod_wrapper">
                    {this.renderProducts()}
                </ul>
                    {scrolling && scrolling ? <div><Loader /></div>: <p><h3 className="the_end">~ end of catalogue ~</h3></p>}
            </Container>
        );
    }
}

export default Products;