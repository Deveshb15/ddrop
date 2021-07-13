import React, { Component } from 'react';
import Identicon from 'identicon.js';
import logo from '../logo.png'

class Navbar extends Component {
  
  render() {
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
                { this.props.account
                  ? <div className="flex">
                    <small className="mr-2 mt-2 underline" id="account">
                      <a target="_blank"
                        alt=""
                        className="text-black font-bold"
                        rel="noopener noreferrer"
                        href={"https://etherscan.io/address/" + this.props.account}>
                        {this.props.account.substring(0,6)}...{this.props.account.substring(38,42)}
                      </a>
                    </small>
                    <img
                      alt=""
                      className='h-8 w-8 '
                      src={`data:image/png;base64,${new Identicon(this.props.account, 30).toString()}`}
                    />
                  </div>
                  : <span></span>
                }
              </div>
          </div>
        </div>
      </nav>
    );
  }
}

export default Navbar;









{/* <a
          className="navbar-brand col-sm-3 col-md-2 mr-0"
          href="http://www.dappuniversity.com/bootcamp"
          target="_blank"
          rel="noopener noreferrer"
        >
          <img src={box} width="30" height="30" className="align-top" alt="" />
          DDrop
        </a>
        <ul className="navbar-nav px-3">
        <li>
            <small id="account">
              <a target="_blank"
                 alt=""
                 className="text-white"
                 rel="noopener noreferrer"
                 href={"https://etherscan.io/address/" + this.props.account}>
                {this.props.account.substring(0,6)}...{this.props.account.substring(38,42)}
              </a>
            </small>
            { this.props.account
              ? <img
                  alt=""
                  className='ml-2'
                  width='30'
                  height='30'
                  src={`data:image/png;base64,${new Identicon(this.props.account, 30).toString()}`}
                />
              : <span></span>
            }
          </li>
        </ul> */}