import React, {useState} from 'react';
import Button from "../Button/index";
import * as PAGES from "../../constants/pages";
import Link from "../Link";
import {deleteBook, fetchBook} from "../../app/actions/book";
import {useDispatch} from "react-redux";

const BookItem = (props) => {
    const [state, setState] = useState({
        showButtons: false,
    });

    const dispatch = useDispatch();

    return (
        <div onMouseEnter={() => setState({showButtons: true})}
             onMouseLeave={() => setState({showButtons: false})}
             className="book-item">
            <p>{`${props.item.title}, ${props.item.author}`}</p>

            {state.showButtons === true &&
                <div>
                    <Link to={location => ({
                        ...location,
                        pathname : `/${PAGES.NEW_BOOK}`
                    })}>
                        <Button onClick={() => dispatch(fetchBook(props.item.id))}>Update</Button>
                    </Link>

                    <Link to={location => ({
                        ...location,
                        pathname : `/${PAGES.BOOKS}`
                    })}>
                        <Button onClick={() => dispatch(deleteBook(props.item.id))}>Delete</Button>
                    </Link>

                </div>
            }

        </div>
    );
};

export default BookItem;