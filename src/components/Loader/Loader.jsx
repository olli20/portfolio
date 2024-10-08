import { ThreeDots } from  'react-loader-spinner';

import css from './Loader.module.css';

export const Loader = () => {
    return (
        <div className={css.container}>
            <ThreeDots 
                height="80" 
                width="80" 
                radius="8"
                color="#f8f8f8" 
                ariaLabel="three-dots-loading"
                wrapperStyle={{}}
                wrapperClassName=""
                visible={true}
            />
        </div>
    );
};