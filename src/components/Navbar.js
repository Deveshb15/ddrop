import React from 'react';
import Identicon from 'identicon.js';
import logo from '../logo.png'

const Navbar = (props) => {

    return (
      <nav className="bg-white relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
              <div className="flex items-center justify-center border-b-2 border-gray-100 py-6 sm:items-stretch sm:justify-start">
                <div className="flex-shrink-0 flex items-center">
                  <img src={logo} className="block h-8 w-auto" alt="" />
                </div>
              </div>
              <div>
                <h1 className="font-extrabold text-4xl ml-24 text-transparent bg-clip-text bg-gradient-to-br from-indigo-400 to-green-400">DDrop</h1>
              </div>
              <div className="relative">
                { props.account
                  ? <div className="flex">
                    <small className="mr-2 mt-2 underline" id="account">
                      <a target="_blank"
                        alt=""
                        className="text-black font-bold"
                        rel="noopener noreferrer"
                        href={"https://etherscan.io/address/" + props.account}>
                        {props.account.substring(0,6)}...{props.account.substring(38,42)}
                      </a>
                    </small>
                    <img
                      alt=""
                      className='h-8 w-8 '
                      src={`data:image/png;base64,${new Identicon(props.account, 30).toString()}`}
                    />
                  </div>
                  : <div className="flex">
                      <small className="mr-2 mt-2 underline" id="account">
                        <button type="submit" className="bg-transparent hover:bg-blue-500 text-blue-700 hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded"><b>Connet Wallet</b></button>
                      </small>
                    </div>
                }
              </div>
          </div>
        </div>
      </nav>
    );
}

export default Navbar;