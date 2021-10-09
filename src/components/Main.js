import React, {useRef} from 'react';

const Main = (props) => {

    let fileDescription = useRef(null)

    return (
      <div>
       {/* Share File */}
        <div className="bg-white flex justify-center items-center mt-12 sm:rounded-lg">
        <div className="shadow-lg" style={{width: '28rem'}}>
          <div className="px-4 py-5 sm:px-6">
            <h1 className="text-2xl text-center leading-6 underline font-bold text-indigo-600">
              Share File
            </h1>
          </div>
            <hr />
          <div className="mb-8 mt-6">
            <form onSubmit={(event) => {
                  event.preventDefault()
                  const description = fileDescription.value
                  props.uploadFile(description)
                }}
                className="px-4" >
                  <div className="mb-4 mt-4 flex justify-center items-center">
                      <input
                        id="fileDescription"
                        type="text"
                        ref={(input) => { fileDescription = input }}
                        className="shadow appearance-none border rounded py-2 px-3 text-gray-700 leading-tight w-96 focus:outline-none focus:shadow-outline"
                        placeholder="description..."
                        autoComplete="off"
                        required />
                  </div>
                  <div className="mt-4">
                    <input className="ml-4" type="file" onChange={props.captureFile} />
                    <button type="submit" className="bg-transparent hover:bg-blue-500 text-blue-700 hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded"><b>Upload!</b></button>
                  </div>
              </form>
            </div>
          </div>
        </div>
      </div>
  );
}

export default Main;