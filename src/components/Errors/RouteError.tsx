import { useErrorBoundary } from "react-error-boundary";
import { useRouteError } from "react-router-dom";



const RouteError: React.FC = () => {
    const error: any = useRouteError();
    const { resetBoundary } = useErrorBoundary();
    console.error(error)
  return (
    <div className="flex flex-col mt-20 items-center gap-4">
        <p>Something went wrong! Please try again</p>
        <pre>Error: {error.message}</pre>
        <button className="bg-slate-400 p-4 bord" onClick={resetBoundary}>Try again</button>
    </div>
  )
}

export default RouteError;