import React, { Component } from 'react';
import Navbar from './Navbar'
import Main from './Main'
import Web3 from 'web3';
import './App.css';
import DDrop from '../abis/DDrop.json' 

//Declare IPFS
const ipfsClient = require('ipfs-http-client')
const ipfs = ipfsClient({ host: 'ipfs.infura.io', port: 5001, protocol:'https' })

class App extends Component {

  async componentWillMount() {
    await this.loadWeb3()
    await this.loadBlockchainData()
  }

  async loadWeb3() {
    //Setting up Web3
    if(window.ethereum){
      window.web3 = new Web3(window.ethereum)
      await window.ethereum.enable()
    }
    else if(window.web3) {
      window.web3 = new Web3(window.web3.currentProvider)
    }
    else{
      window.alert("Non-Ethereum browser detected. You should consider trying metamask")
    }
  }

  async loadBlockchainData() {
    //Declare Web3
    const web3 = window.web3
    console.log(web3)

    //Load account
    const accounts = await web3.eth.getAccounts()
    this.setState({ account: accounts[0] })

    //Network ID
    const networkId = await web3.eth.net.getId()
    const networkData = DDrop.networks[networkId]
    //IF got connection, get data from contracts
    if(networkData){
      //Assign contract
      const ddrop = new web3.eth.Contract(DDrop.abi, networkData.address)
      const noBal = await web3.eth.getBalance(networkData.address)
      console.log(noBal);
      this.setState({ ddrop })
      //Get files amount
      const filesCount = await ddrop.methods.fileCount().call()
      this.setState({ filesCount })
      //Load files&sort by the newest
      for(let i = filesCount; i>=1; i--){
        const file = await ddrop.methods.files(i).call()
        this.setState({
          files: [...this.state.files, file]
        })
      }
    } else {
      //Else
      //alert Error
      window.alert("DDrop contract not deployed to detected network")
    }
      this.setState({ loading: false })
  }

  // Get file from user
  captureFile = event => {
  }


  //Upload File
  uploadFile = description => {

    //Add file to the IPFS

      //Check If error
        //Return error

      //Set state to loading

      //Assign value for the file without extension

      //Call smart contract uploadFile function 

  }

  //Set states
  constructor(props) {
    super(props)
    this.state = {
      loading: false,
      ddrop: null,
      type: null,
      name: null,
      account: '',
      files: [],
      filesCount: 0,
      captureFile: '',
      uploadFile: '',
    }

    //Bind functions
  }

  render() {
    return (
      <div>
        <Navbar account={this.state.account} />
        { this.state.loading
          ? <div id="loader" className="text-center mt-5"><p>Loading...</p></div>
          : <Main
              files={this.state.files}
              captureFile={this.captureFile}
              uploadFile={this.uploadFile}
            />
        }
      </div>
    );
  }
}

export default App;