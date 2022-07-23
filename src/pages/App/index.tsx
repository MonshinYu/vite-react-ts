import React, {useEffect} from 'react';
import TextGradient from "@/components/TextGradient";

const App = (props: any) => {
    const {dispatch, text} = props;
    useEffect(() => {
        dispatch({
            type: 'SET_TEXT',
            data: 'vite react-ts'
        })
    }, []);
    return (
        <TextGradient textColor={['#0080ff', '#7303fd', '#ee00ff']} text={text}/>
    );
};

export default App;