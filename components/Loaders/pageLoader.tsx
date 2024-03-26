"use client";

import Spinner from "./spinner";

export const NormalPageLoader = () => {
  return (
    <div className="z-50 grid h-screen w-screen place-items-center bg-primary dark:bg-secondary">
      <Spinner />
      {/* <div className="flex h-screen w-full items-center justify-center"> */}
      {/*   <Lottie animationData={LoadingData} /> */}
      {/* </div> */}
    </div>
  );
};
