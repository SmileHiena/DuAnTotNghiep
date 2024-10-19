import { Provider } from 'react-redux';
import { store } from './redux/store'; // Điều chỉnh đường dẫn đến file store

function MyApp({ Component, pageProps }) {
    return (
        <Provider store={store}>
            <Component {...pageProps} />
        </Provider>
    );
}

export default MyApp;
