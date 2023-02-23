import React from 'react';
import PageAccessValidator from 'components/PageAccessValidator';
import PageNewBook from 'pages/NewBook';
import PageContainer from 'components/PageContainer';

const NewBook = () => (
    <PageAccessValidator>
        <PageContainer>
            <PageNewBook />
        </PageContainer>
    </PageAccessValidator>
);

export default NewBook;
