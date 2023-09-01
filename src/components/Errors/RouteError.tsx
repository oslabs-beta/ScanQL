import { useErrorBoundary } from "react-error-boundary";
import { useRouteError } from "react-router-dom";



const RouteError: React.FC = () => {
    const error: any = useRouteError();
    const { resetBoundary } = useErrorBoundary();
    console.error(error)
  return (
    <div className="h-screen">
      <div className="mt-20 error-box">
        <p>Something went wrong! Please try again</p>
        <p>Error: {error.message}</p>
        <button 
          className="rounded-lg font-normal mr-1  ml-1 bg-gray-500 bg-opacity-10 text-indigo-900 text-opacity-60"
          onClick={resetBoundary}>Try again
        </button>
      </div>
    </div>
  )
}

export default RouteError;