import { FallbackProps } from "react-error-boundary";


export const AppFallback: React.FC<FallbackProps> = ({ error, resetErrorBoundary }) => {
  console.error(error)
  
  return (
    <div className="span-all error-box">
        <p>Something went wrong! Please try again</p>
        <p>Error: {error.message}</p>
        <button 
          className="rounded-lg font-normal mr-1  ml-1 bg-gray-500 bg-opacity-10 text-indigo-900 text-opacity-60"
          onClick={resetErrorBoundary}>Try again
        </button>
    </div>
  )
}