/* eslint-disable, no-console */
/* eslint-disable no-lone-blocks, no-console */
import React from "react";
import { convertBytes } from "./helpers";
import moment from "moment";

const Table = (props) => {

    return (
      <div className="flex flex-col mx-12 my-8">
        <div className="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
          <div className="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8">
            <div className="shadow overflow-hidden border-b border-gray-200 sm:rounded-lg dark:border-black">
              <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-800">
                <thead className="bg-gray-50 dark:bg-blue-opaque">
                  <tr className="border-b dark:border-gray-600">
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                    >
                      id
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                    >
                      name
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                    >
                      description
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                    >
                      type
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                    >
                      size
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                    >
                      date
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                    >
                      uploader/view
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                    >
                      hash/view/get
                    </th>
                  </tr>
                </thead>
                {props.files.map((file, key) => (
                  <tbody
                    className="bg-white dark:bg-blue-opaque divide-y divide-gray-200"
                    key={key}
                  >
                    <tr>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <div className="text-sm font-medium text-gray-900 dark:text-white">
                            {file.fileId.toNumber()}
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-900 dark:text-white">
                          {file.fileName}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-900 dark:text-white">
                          {file.fileDescription}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {file.fileType}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                          {convertBytes(file.fileSize.toNumber())}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {moment.unix(file.uploadTime.toNumber()).format("h:mm:ss A M/D/Y")}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-left text-sm font-medium">
                        <a
                          href={"https://etherscan.io/address/" + file.uploader}
                          className="text-indigo-600 hover:text-indigo-900 dark:text-purple-400 dark:hover:text-purple-700"
                          rel="noopener noreferrer"
                          target="_blank"
                        >
                          {file.uploader.substring(0, 15)}...
                        </a>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-left text-sm font-medium">
                        <a
                          href={"https://ipfs.infura.io/ipfs/" + file.fileHash}
                          className="text-indigo-600 hover:text-indigo-900 dark:text-purple-400 dark:hover:text-purple-700"
                          rel="noopener noreferrer"
                          target="_blank"
                        >
                          {file.fileHash.substring(0, 15)}...
                        </a>
                      </td>
                    </tr>
                  </tbody>
                ))}
              </table>
            </div>
          </div>
        </div>
      </div>
    );
}

export default Table;
