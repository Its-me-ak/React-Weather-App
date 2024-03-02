import React from 'react'
import { CirclesWithBar } from 'react-loader-spinner'

const Loader = () => {
  return (
    <>
      <div className="body top-0 left-0 z-10 bg-black/[0.8] flex justify-center items-center">
          <CirclesWithBar
            height="100"
            width="100"
            color="#4fa94d"
            outerCircleColor="#4fa94d"
            innerCircleColor="#4fa94d"
            barColor="#4fa94d"
            ariaLabel="circles-with-bar-loading"
            wrapperStyle={{}}
            wrapperClass=""
            visible={true}
          />
        </div>
    </>
  )
}

export default Loader
