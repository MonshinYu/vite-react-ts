import React from 'react';
import './index.less';

const TextGradient = (props: {
    text: string;
    textColor: string[] | any;
}) => {
    const {text, textColor} = props;
    return (
        <div className='text' style={{
            backgroundImage: (textColor || textColor.length !== 0) ? `-webkit-linear-gradient(top, ${textColor.toString()})` : undefined,
        }}>
            {text}
        </div>
    );
};

export default TextGradient;