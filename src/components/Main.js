import React, { Component } from 'react';

class Main extends Component {

  render() {
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
                  const description = this.fileDescription.value
                  this.props.uploadFile(description)
                }}
                className="px-4" >
                  <div className="mb-4 mt-4 flex justify-center items-center">
                      <input
                        id="fileDescription"
                        type="text"
                        ref={(input) => { this.fileDescription = input }}
                        className="shadow appearance-none border rounded py-2 px-3 text-gray-700 leading-tight w-96 focus:outline-none focus:shadow-outline"
                        placeholder="description..."
                        required />
                  </div>
                  <div className="mt-4">
                    <input className="ml-4" type="file" onChange={this.props.captureFile} />
                    <button type="submit" className="bg-transparent hover:bg-blue-500 text-blue-700 hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded"><b>Upload!</b></button>
                  </div>
              </form>
            </div>
          </div>
        </div>


     </div>
    );
  }
}

export default Main;






{/* <div className="container-fluid mt-5 text-center">
        <div className="row">
          <main role="main" className="col-lg-12 ml-auto mr-auto" style={{ maxWidth: '1024px' }}>
            <div className="content">
              <p>&nbsp;</p>
             
              <div className="card mb-3 mx-auto bg-dark" style={{ maxWidth: '512px' }}>
                <h2 className="text-white text-monospace bg-dark"><b><ins>Share File</ins></b></h2>
                  <form onSubmit={(event) => {
                    event.preventDefault()
                    const description = this.fileDescription.value
                    this.props.uploadFile(description)
                  }} >
                      <div className="form-group">
                        <br></br>
                          <input
                            id="fileDescription"
                            type="text"
                            ref={(input) => { this.fileDescription = input }}
                            className="form-control text-monospace"
                            placeholder="description..."
                            required />
                      </div>
                    <input type="file" onChange={this.props.captureFile} className="text-white text-monospace"/>
                    <button type="submit" className="btn-primary btn-block"><b>Upload!</b></button>
                  </form>
              </div>

              <p>&nbsp;</p>

              

            </div>
          </main>
        </div>
      </div> */}