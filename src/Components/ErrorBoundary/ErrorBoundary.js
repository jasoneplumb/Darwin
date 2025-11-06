import React from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Alert from '@mui/material/Alert';
import AlertTitle from '@mui/material/AlertTitle';

class ErrorBoundary extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            hasError: false,
            error: null,
            errorInfo: null
        };
    }

    static getDerivedStateFromError(error) {
        // Update state so the next render will show the fallback UI
        return { hasError: true };
    }

    componentDidCatch(error, errorInfo) {
        // Log error details for debugging
        console.error('ErrorBoundary caught an error:', error, errorInfo);

        this.setState({
            error: error,
            errorInfo: errorInfo
        });

        // You could also log the error to an error reporting service here
        // Example: logErrorToService(error, errorInfo);
    }

    handleReload = () => {
        // Reset error state and reload the page
        window.location.reload();
    }

    handleGoHome = () => {
        // Navigate to home page
        this.setState({ hasError: false, error: null, errorInfo: null });
        window.location.href = '/';
    }

    render() {
        if (this.state.hasError) {
            // Render fallback UI
            return (
                <Box
                    sx={{
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        justifyContent: 'center',
                        minHeight: '100vh',
                        padding: 3,
                        backgroundColor: '#f5f5f5'
                    }}
                >
                    <Alert severity="error" sx={{ maxWidth: 600, mb: 3 }}>
                        <AlertTitle>Something went wrong</AlertTitle>
                        The application encountered an unexpected error.
                        This has been logged and we'll look into it.
                    </Alert>

                    <Box sx={{ display: 'flex', gap: 2, mb: 3 }}>
                        <Button
                            variant="contained"
                            onClick={this.handleReload}
                            color="primary"
                        >
                            Reload Page
                        </Button>
                        <Button
                            variant="outlined"
                            onClick={this.handleGoHome}
                            color="primary"
                        >
                            Go to Home
                        </Button>
                    </Box>

                    {/* Show error details in development mode */}
                    {process.env.NODE_ENV === 'development' && this.state.error && (
                        <Box
                            sx={{
                                maxWidth: 800,
                                width: '100%',
                                p: 2,
                                backgroundColor: '#fff',
                                border: '1px solid #ccc',
                                borderRadius: 1,
                                overflow: 'auto'
                            }}
                        >
                            <Typography variant="h6" gutterBottom>
                                Error Details (Development Mode Only)
                            </Typography>
                            <Typography
                                variant="body2"
                                component="pre"
                                sx={{
                                    fontSize: '0.85rem',
                                    whiteSpace: 'pre-wrap',
                                    wordBreak: 'break-word',
                                    mb: 2
                                }}
                            >
                                {this.state.error.toString()}
                            </Typography>
                            {this.state.errorInfo && (
                                <Typography
                                    variant="body2"
                                    component="pre"
                                    sx={{
                                        fontSize: '0.75rem',
                                        whiteSpace: 'pre-wrap',
                                        wordBreak: 'break-word',
                                        color: '#666'
                                    }}
                                >
                                    {this.state.errorInfo.componentStack}
                                </Typography>
                            )}
                        </Box>
                    )}
                </Box>
            );
        }

        return this.props.children;
    }
}

export default ErrorBoundary;
