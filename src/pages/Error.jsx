import { useRouteError, Link } from 'react-router-dom';

export default function Error() {
    const error = useRouteError();

    return (
        <div style={styles.container}>
            <h1 >Oops!</h1>
            <h1>Sorry, an unexpected error has occurred.</h1>
            <p style={styles.error}>
                <i>{error.statusText || error.message}</i>
            </p>
            <Link to="/" style={styles.link}>
                Go back home
            </Link>
        </div>
    );
}

const styles = {
    container: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        height: '100vh',
        textAlign: 'center',
        fontFamily: 'system-ui, sans-serif',
        fontSize: '1.5rem',
        color: 'red',
    },
    error: {
        color: '#555',
    },
    link: {
        marginTop: '3rem',
        padding: '0.5rem 1rem',
        backgroundColor: '#007bff',
        color: 'white',
        textDecoration: 'none',
        borderRadius: '4px',
    },
};