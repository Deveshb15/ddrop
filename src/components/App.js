import React, { Component } from 'react';
import Navbar from './Navbar'
import Main from './Main'
import Table from './Table'

import Web3 from 'web3';
import './App.css';
import DDrop from '../abis/DDrop.json' 

// Contract address
const contractAbi = DDrop.abi
const contractAddress = "0x92b39DF033f0671c57C7FcF5273C7413c35137b5"

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

    //Load account
    const accounts = await web3.eth.getAccounts()
    this.setState({ account: accounts[0] })

    const ddrop = new web3.eth.Contract(contractAbi, contractAddress)
    this.setState({ ddrop })
    console.log(ddrop)
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

    this.setState({ loading: false })
  }

  // Get file from user
  captureFile = event => {
    event.preventDefault()

    const file = event.target.files[0];
    const reader = new window.FileReader()

    reader.readAsArrayBuffer(file)
    reader.onloadend = () => {
      this.setState({
        buffer: Buffer(reader.result),
        type: file.type,
        name: file.name
      })
      console.log('buffer', this.state.buffer)
    }
  }


  //Upload File
  uploadFile = description => {
    console.log("Submitting files to IPFS");
    
    //Add file to the IPFS
    ipfs.add(this.state.buffer, (error, result) => {
      console.log('IPFS result', result);
      //Check If error
      if(error){
        console.log(error)
        //Return error
        return
      }
      //Set state to loading
      this.setState({ loading: true })

      //Assign value for the file without extension
      if(this.state.type === '') {
        this.setState({ type: 'none' })
      }

      //Call smart contract uploadFile function 
      this.state.ddrop.methods.uploadFile(result[0].hash, result[0].size, this.state.type, this.state.name, description).send({ from: this.state.account }).on('transactionHash', (hash) => {
        this.setState({
          loading: false,
          type: null,
          name: null
        })
        window.location.reload()
      }).on('error', (e) => {
        window.alert('Error uploading file, Please try again')
        this.setState({ loading: false})
      })
    })


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
      files: []
    }

    //Bind functions
  }

  render() {
    return (
      <div>
        <Navbar account={this.state.account} />
        { this.state.loading
          ? <div id="loader" className="text-center mt-5"><p>Loading...</p></div>
          : <>
            <Main
                files={this.state.files}
                captureFile={this.captureFile}
                uploadFile={this.uploadFile}
              />
            {(this.state.files.length !== 0) ? <Table files={this.state.files} /> : <span></span>}
            </>
        }
      </div>
    );
  }
}

export default App;