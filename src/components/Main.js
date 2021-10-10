import React, {useRef} from 'react';

const Main = (props) => {

    let fileDescription = useRef(null)

    const [fileName, setFileName] = React.useState(null)

    const getName = (e) => {
      const name = e.target.files[0].name
      if(name) {
        setFileName(name)
      }
    }

    return (
      <div className="bg-white dark:bg-light-black flex justify-center items-center flex-col mt-14 ">
        <div className="p-1 bg-gradient-to-tr from-light-violet to-light-blue rounded-sm">
          <div className="shadow-xl drop-shadow border border-transparent rounded dark:border-gray-800 bg-blue-50 dark:bg-blue-opaque" style={{width: '28rem'}}>
            <div className="px-4 py-5 sm:px-6">
              <h1 className="text-2xl text-center leading-6 text-blue-700 dark:text-purple-light font-extrabold">
                Share File
              </h1>
            </div>
              <hr className="dark:border dark:border-gray-600" />
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
                          className="shadow appearance-none border dark:border-gray-700 rounded py-2 px-3 leading-tight w-96 focus:outline-none focus:shadow-outline bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100"
                          placeholder="description..."
                          autoComplete="off"
                          required />
                    </div>
                    <div className="mt-4 flex justify-between mx-4">
                      <input className="hidden" onChangeCapture={(e) => getName(e)} type="file" id="filecap" onChange={props.captureFile} />
                      <label htmlFor="filecap" className="cursor-pointer bg-white hover:bg-blue-500 text-blue-700 hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded font-bold dark:bg-gray-700 dark:text-gray-100 dark:border-gray-900 transform transition hover:scale-110">{fileName ? fileName : 'Choose a file'}</label>
                      <button type="submit" className="py-2 px-4 rounded font-bold bg-white text-blue-700 border border-blue-500 dark:bg-gray-700 dark:text-gray-100 dark:border-gray-900 hover:border-transparent hover:bg-blue-500 hover:text-white transform transition hover:scale-110">Upload!</button>
                    </div>
                </form>
              </div>
            </div>
          </div>
        </div>
  );
}

export default Main;