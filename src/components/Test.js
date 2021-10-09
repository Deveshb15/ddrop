/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from 'react'
import Navbar from './Navbar'
import Main from './Main'
import Table from './Table'
import DDrop from '../abis/DDrop.json'
import './App.css'

import {ethers} from 'ethers'

//Declare IPFS
const ipfsClient = require('ipfs-http-client')
const ipfs = ipfsClient({ host: 'ipfs.infura.io', port: 5001, protocol:'https' })

// Contract address
const contractAbi = DDrop.abi
const contractAddress = "0x92b39DF033f0671c57C7FcF5273C7413c35137b5"

const Test = () => {

    const [currAccount, setCurrAccount] = useState(undefined)
    const [loading, setLoading] = useState(false)
    const [ddrop, setDdrop] = useState(null)
    const [filesCount, setFilesCount] = useState(0)
    const [files, setFiles] = useState([])
    const [buffer, setBuffer] = useState(null)
    const [type, setType] = useState(null)
    const [name, setName] = useState(null)

    const checkIfWalletIsConnected = () => {
        const { ethereum } = window;
        if(!ethereum) {
            console.log("Make sure you have Ethereum")
            return
        } 
        ethereum.request({method: 'eth_accounts'})
            .then(accounts => {
                if(accounts.length !== 0) {
                    const account = accounts[0]
                    console.log("Authorized account found: ", account)
                } else {
                    console.log("No Authorized account found")
                }
                loadBlockchainData()
            })
            .catch(error => {
                console.log(error)
            })
    }

    const connectWallet = () => {
        const { ethereum } = window;
        if(!ethereum) {
            alert("Get Metamask")
        }

        ethereum.request({method: 'eth_requestAccounts'})
            .then(accounts => {
                console.log("Connected ", accounts[0])
                setCurrAccount(accounts[0])
            })
            .catch(error => {
                console.log(error)
            })
    }

    const loadBlockchainData = async () => {
        const provider = new ethers.providers.Web3Provider(window.ethereum)
        const signer = provider.getSigner()
        const ddrop = new ethers.Contract(contractAddress, contractAbi, signer)
        setDdrop(ddrop)
        console.log(ddrop)

        const filesCount = await ddrop.fileCount()
        setFilesCount(filesCount)
        // console.log(await ddrop.files(0))

        for(let i = 0; i < filesCount; i++) {
            const file = await ddrop.files(i)
            setFiles(file)
        }
        console.log(files)
        setLoading(false)
    }

    const captureFile = (e) => {
        e.preventDefault()

        const file = e.target.files[0]
        const reader = new window.FileReader()

        reader.readAsArrayBuffer(file)
        reader.onloadend = () => {
            setBuffer(Buffer(reader.result))
            setType(file.type)
            setName(file.name)
        }
    }

    const uploadFile = (description) => {
        console.log("Submitting files to IPFS");
    
        //Add file to the IPFS
        ipfs.add(buffer, (error, result) => {
            console.log('IPFS result', result);

            if(error){
                console.log(error)
                return
            }

            setLoading(true)

            if(type === '') {
                setType('none')
            }

            ddrop.uploadFile(result[0].hash, result[0].size, type, name, description).send({ from: currAccount }).on('transactionHash', (hash) => {
                setLoading(false)
                setType(null)
                setName(null)
            })
            window.location.reload()
        }).on('error', (e) => {
            window.alert('Error uploading file, Please try again')
            setLoading(false)
        })
    }

    useEffect(() => {
        checkIfWalletIsConnected()
    }, [])

    return (
        <div>
            <Navbar account={currAccount} />
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
    )
}

export default Test
