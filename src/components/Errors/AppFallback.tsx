import { FallbackProps } from "react-error-boundary";


export const AppFallback: React.FC<FallbackProps> = ({ error, resetErrorBoundary }) => {
  console.error(error)
  
  return (
    <div className="flex flex-col items-center span-all">
        <p>Something went wrong:</p>
        <pre style={{ color: 'red' }}>{error.message}</pre>
        <button className=" mt-4 border-purple-200 p-4" onClick={resetErrorBoundary}>Try again</button>
    </div>
  )
}