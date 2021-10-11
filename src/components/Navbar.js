import React from 'react';
import Identicon from 'identicon.js';
import logo from '../logo.png'
import Toggle from './toggle';

const Navbar = (props) => {

    return (
      <nav className="bg-white dark:bg-light-black relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
              <div className="flex items-center justify-center py-6 sm:items-stretch sm:justify-start">
                <div className="flex-shrink-0 flex items-center">
                  <img src={logo} className="block h-8 w-auto" alt="" />
                </div>
              </div>
              <div>
                <h1 className="font-extrabold text-6xl mt-8 p-4 ml-24 text-transparent bg-clip-text bg-gradient-to-br from-indigo-400 to-green-400 nav-log animate-gradient-anim">DDrop</h1>
              </div>
              <div className="flex">
                { props.account
                  ? <div className="flex mt-2">
                    <small className="mr-2 mt-2 underline" id="account">
                      <a target="_blank"
                        alt=""
                        className="text-black dark:text-white font-bold"
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
                        <button onClick={() => props.connect()} type="submit" className="py-2 px-4 bg-white text-blue-700 border border-blue-500 dark:bg-gray-700 dark:text-gray-100 dark:border-gray-600 hover:border-transparent hover:bg-blue-500 hover:text-white transform transition hover:scale-110 rounded"><b>Connet Wallet</b></button>
                      </small>
                    </div>
                }
                <div className="m-2 ml-4">
                  <Toggle />
                </div>
              </div>
          </div>
        </div>
      </nav>
    );
}

export default Navbar;