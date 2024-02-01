import React from 'react'
import { Vortex } from 'react-loader-spinner'

const Loader = () => {
  return (
    <>
      <div className="body absolute top-0 left-0 z-10 bg-black/[0.7]">
            <div className="box w-56 py-6 bg-white absolute top-[50%] left-[50%] text-center">
                  <Vortex
                      visible={true}
                      height="80"
                      width="80"
                      ariaLabel="vortex-loading"
                      wrapperStyle={{}}
                      wrapperClass="vortex-wrapper"
                      colors={['red', 'green', 'blue', 'yellow', 'orange', 'purple']}
                  />
                  <h3>Fetching Weather Data</h3>
            </div>
      </div>
    </>
  )
}

export default Loader
