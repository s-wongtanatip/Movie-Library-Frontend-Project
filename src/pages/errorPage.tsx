/* eslint-disable @typescript-eslint/no-explicit-any */
import { useRouteError } from "react-router-dom";
import { MdErrorOutline } from "react-icons/md";

export default function ErrorPage() {
  const error: any = useRouteError();
  console.error(error);

  return (
    <div
      id="error-page"
      className="flex flex-col justify-center items-center h-[100vh]"
    >
      <div className="text-[50px] my-10">
          <MdErrorOutline />
      </div>
      <p>Sorry, an unexpected error has occurred.</p>
      <p>Try refreshing the page</p>
    </div>
  );
}
