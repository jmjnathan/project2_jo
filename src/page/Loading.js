import React from 'react';
import { css } from '@emotion/react';
import { ClipLoader } from 'react-spinners';

const Loading = () => {
    const override = css`
        display: block;
        margin: 0 auto;
        border-color: red;
    `;

    return (
        <div className="flex items-center justify-center h-screen">
        <ClipLoader color="#36D7B7" loading={true} css={override} size={150} />
        </div>
    );
};

export default Loading;
