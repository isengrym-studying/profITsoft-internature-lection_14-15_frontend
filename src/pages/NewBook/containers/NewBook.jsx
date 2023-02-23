import React, {useEffect, useState} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import useAccessValidate from 'hooks/useAccessValidate';
import {useDispatch, useSelector} from "react-redux";
import Button from "../../../components/Button/index";
import {TextField} from "@material-ui/core";
import {clearCurrentBook, createBook, updateBook} from "../../../app/actions/book";
import Link from "../../../components/Link";
import * as PAGES from "../../../constants/pages";

const getClasses = makeStyles(() => ({
    container: {
        display: 'flex',
        flexDirection: 'column',
        flexWrap: 'wrap'
    },
    button: {
        margin: '0 auto',
    }
}));


const NewBook = ({
                     authorities
                 }) => {
    const classes = getClasses();
    const book = useSelector(({book}) => book);
    const dispatch = useDispatch();

    const canSeeList = useAccessValidate({
        ownedAuthorities: authorities,
        neededAuthorities: ['МОЖНО_ВОТ_ЭТУ_ШТУКУ'],
    });

    const [title, setTitle] = useState("");
    const [author, setAuthor] = useState("");
    const [genreId, setGenreId] = useState("");
    const [pageNum, setPageNum] = useState("");

    useEffect(() => {
        if (canSeeList && !book.isFetching && book.currentItem.id !== undefined) {
            setTitle(book.currentItem.title);
            setAuthor(book.currentItem.author);
            setGenreId(book.currentItem.genre.id);
            setPageNum(book.currentItem.pagesNumber);
        }
    }, [book.currentItem])

    return (
        <div>
            <div className={classes.container}>
                <TextField id="filled-basic" placeholder="Title"
                           value={title} onChange={e => setTitle(e.target.value)}
                           variant="filled"/>
                <TextField id="filled-basic" placeholder="Author"
                           value={author} onChange={e => setAuthor(e.target.value)}
                           variant="filled"/>
                <TextField id="filled-basic" placeholder="Genre id"
                           value={genreId} onChange={e => setGenreId(e.target.value)}
                           variant="filled"/>
                <TextField id="filled-basic" placeholder="Pages number"
                           value={pageNum} onChange={e => setPageNum(e.target.value)}
                           variant="filled"/>
            </div>

            {canSeeList && !book.isFetching && book.currentItem.id !== undefined &&

                    <div>

                        <Link to={location => ({
                            ...location,
                            pathname : `/${PAGES.BOOKS}`
                        })}>
                            <Button onClick={() =>
                                dispatch(updateBook(
                                    {id: book.currentItem.id, title: title, author: author, genre:{id: 2, name: ""}, pagesNumber: pageNum}
                                ))
                            }>
                                Edit
                            </Button>
                        </Link>

                        <Link to={location => ({
                            ...location,
                            pathname : `/${PAGES.BOOKS}`
                        })}>
                            <Button onClick={() => dispatch(clearCurrentBook())}>Cancel</Button>
                        </Link>
                    </div>
                    }

                    {canSeeList && !book.isFetching && book.currentItem.id === undefined &&
                        <div>
                            <Link to={location => ({
                                ...location,
                                pathname : `/${PAGES.BOOKS}`
                            })}>
                                <Button onClick={() =>
                                    dispatch(createBook(
                                        {id: 0, title: title, author: author, genre:{id: 2, name: ""}, pagesNumber: pageNum}
                                    ))
                                }>
                                    Create
                                </Button>
                            </Link>

                            <Link to={location => ({
                                ...location,
                                pathname : `/${PAGES.BOOKS}`
                            })}>
                                <Button>Cancel</Button>
                            </Link>
                        </div>
                    }
        </div>
    )};

export default NewBook;
