import React, { useState, useEffect } from 'react';
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

function App() {

    const [loading, setLoading] = useState(false)
    const [ddrop, setDdrop] = useState(null)
    const [type, setType] = useState(null)
    const [name, setName] = useState(null)
    const [account, setAccount] = useState('')
    const [files, setFiles] = useState([])
    const [filesCount, setFilesCount] = useState(0)
    const [buffer, setBuffer] = useState(null)

  useEffect(() => {
    const load = async () => {
      await loadWeb3()
      // await loadBlockchainData()
    }
    load()
  }, [])

  const loadWeb3 = async() => {
    //Setting up Web3
    if(window.ethereum){
      window.web3 = new Web3(window.ethereum)
      // await window.ethereum.enable()
    }
    else if(window.web3) {
      window.web3 = new Web3(window.web3.currentProvider)
    }
    else{
      window.alert("Non-Ethereum browser detected. You should consider trying metamask")
    }
    const accounts = await window.ethereum.request({method: 'eth_accounts'})
    if(accounts.length!==0) {
      const account = accounts[0];
      console.log("We found an authorized account: ", account)
      // getTotalNFTsMintedSoFar()
    } else {
      console.log("No authorized account found.")
    }
  }

  const loadBlockchainData = async() => {
    try {
      const { ethereum } = window;
      const web3 = window.web3
      if(!ethereum) {
        alert("Get Metamask!")
        return;
      } else {
        const accounts = await ethereum.request({method: 'eth_requestAccounts'})

        console.log("Connected ", accounts[0])
        setAccount(accounts[0])
        const ddrop = new web3.eth.Contract(contractAbi, contractAddress)
        setDdrop(ddrop)
        console.log(ddrop)
        //Get files amount
        const filesCount = await ddrop.methods.fileCount().call()
        setFilesCount(filesCount)
        //Load files&sort by the newest
        for(let i = filesCount; i>=1; i--){
          const file = await ddrop.methods.files(i).call()
          setFiles(files => [...files, file])
        }
      }
      // setUpEventListener()
      // checkIfConnectedToRinkeby()
    } catch (error) {
      console.log(error)
    }
    setLoading(false)
  }

  // Get file from user
  const captureFile = (event) => {
    event.preventDefault()

    const file = event.target.files[0];
    const reader = new window.FileReader()

    reader.readAsArrayBuffer(file)
    reader.onloadend = () => {
      setBuffer(Buffer(reader.result))
      setType(file.type)
      setName(file.name)
      console.log('buffer', buffer)
    }
  }


  //Upload File
  const uploadFile = (description) => {
    console.log("Submitting files to IPFS");
    
    //Add file to the IPFS
    ipfs.add(buffer, (error, result) => {
      console.log('IPFS result', result);
      //Check If error
      if(error){
        console.log(error)
        //Return error
        return
      }
      //Set state to loading
      setLoading(true)

      //Assign value for the file without extension
      if(type === '') {
        setType('none')
      }

      //Call smart contract uploadFile function 
      ddrop.methods.uploadFile(result[0].hash, result[0].size, type, name, description).send({ from: account }).on('transactionHash', (hash) => {
        setLoading(false)
        setType(null)
        setName(null)
        // window.location.reload()
      }).on('error', (e) => {
        window.alert('Error uploading file, Please try again')
        setLoading(false)
      })
    })
  }

    return (
      <div>
        <Navbar account={account} connect={loadBlockchainData} />
        { loading
          ? <div id="loader" className="text-center mt-5"><p>Loading...</p></div>
          : <>
            <Main
                files={files}
                captureFile={captureFile}
                uploadFile={uploadFile}
              />
            {(files.length !== 0) ? <Table files={files} /> : <span></span>}
            </>
        }
      </div>
    );
}

export default App;