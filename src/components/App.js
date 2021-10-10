import React, { useState, useEffect, Suspense } from 'react';
import { WindMillLoading } from 'react-loadingg'
import Navbar from './Navbar'
import Main from './Main'
import { ethers } from 'ethers';
import './App.css';
import DDrop from '../abis/DDrop.json' 

const Table = React.lazy(() => import('./Table'))

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
    const [buffer, setBuffer] = useState(null)

  useEffect(() => {
    checkIfWalletIsConnected()
  }, []) //eslint-disable-line

  const checkIfWalletIsConnected = async() => {
    const { ethereum } = window
    if(!ethereum) {
      console.log("Install metamask")
    } else {
      console.log("We have ethereum obj")
    }

    const accounts = await ethereum.request({method: 'eth_accounts'})
    if(accounts.length!==0) {
      console.log("We found authorized account: ", accounts[0])
      // setUpEventListener()
    } else {
      console.log("No authorized account found.")
    }
  }

  const connectWallet = async() => {
    try {
      const {ethereum} = window
      setLoading(true)
      if(!ethereum) {
        alert("Get Metamask!")
        return;
      } else {
        const accounts = await ethereum.request({method: 'eth_requestAccounts'})
        console.log("connected: ", accounts[0])
        setAccount(accounts[0])
      }
      setLoading(false)
      fetchFiles()
      setUpEventListener()
      checkIfConnectedToRinkeby()
    } catch(e) {
      console.log(e)
    }
  }

  const fetchFiles = async() => {
    try {
      const {ethereum} = window
      if(ethereum) {
        const provider = new ethers.providers.Web3Provider(ethereum)
        const signer = provider.getSigner()
        const ddrop = new ethers.Contract(contractAddress, contractAbi, signer)
        // console.log(ddrop)
        setDdrop(ddrop)
        const fileCount = await ddrop.fileCount()
        for(let i = fileCount; i>=1; i--){
          const file = await ddrop.files(i)
          setFiles(files => [...files, file])
        }
      }
    } catch(e) {
      console.log(e)
    }
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
    //Set state to loading
    setLoading(true)
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
      //Assign value for the file without extension
      if(type === '') {
        setType('none')
      }

      try {
        ddrop.uploadFile(result[0].hash, result[0].size, type, name, description)
        setType(null)
        setName(null)
      } catch(e) {
        window.alert('Error uploading file, Please try connecting your wallet correctly!')
        setLoading(false)
      }   
    })
  }

  const setUpEventListener = () => {
    try {
      const {ethereum} = window
      if(ethereum) {
        const provider = new ethers.providers.Web3Provider(ethereum)
        const signer = provider.getSigner()
        const ddrop = new ethers.Contract(contractAddress ,contractAbi, signer)

        ddrop.on("FileUploaded", (fileId, fileHash, fileSize, fileType, fileName, fileDescription, uploadTime, uploader) => {
          alert(`Hey there! your file has been uploaded and you can take a look at it over here: https://ipfs.infura.io/ipfs/${fileHash}`)
          setLoading(false)
        })
      }
    } catch(e) {
      console.log(e)
      setLoading(false)
    }
  }

  const checkIfConnectedToRinkeby = () => {
    if(window.ethereum.networkVersion !== "4") {
      alert("Hey — I see you're connected to mainnet but this only works on Rinkeby!")
    }
  }

  return (
    <div className="dark:bg-light-black">
      <Navbar account={account} connect={connectWallet} />
      { loading
        ? <div id="loader" className="text-center"><WindMillLoading size="large" color="#4F46E5" /></div>
        : <>
          <Main
              files={files}
              captureFile={captureFile}
              uploadFile={uploadFile}
            />
          {(files.length !== 0) ? 
          <Suspense fallback={<></>}>
            <Table files={files} />
          </Suspense> 
          : <span></span>}
          </>
      }
    </div>
  );
}

export default App;