import React from 'react';

interface ErrorBoundaryProps {
    fallback: string;
    children: any;
}

class OldErrorBoundary extends React.Component<ErrorBoundaryProps> {
        state = { hasError: false }

    static getDerivedStateFromError(error: Error): {} {
        return { hasError: true }
    }

    componentDidCatch(error: Error, errorInfo: React.ErrorInfo): void {
        console.log(error, errorInfo);
    }

    render() {
        if (this.state.hasError) {
            return this.props.fallback;
        }
        return this.props.children;
    }
}

export default OldErrorBoundary;