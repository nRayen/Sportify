import React from 'react'

const IMCDisplay = ({imcData}) => {
    if (imcData.color === "red-500") {
        return <span className="bg-red-500/30 border border-red-500 text-red-500 px-2 py-1 rounded-md">{imcData.title}</span>;

      } else if (imcData.color === "green-500") {
        return <span className="bg-green-500/30 border border-green-500 text-green-500 px-2 py-1 rounded-md">{imcData.title}</span>;

      } else if (imcData.color === "yellow-500") {
        return <span className="bg-yellow-500/30 border border-yellow-500 text-yellow-500 px-2 py-1 rounded-md">{imcData.title}</span>;

      } else if (imcData.color === "orange-500") {
        return <span className="bg-orange-500/30 border border-orange-500 text-orange-500 px-2 py-1 rounded-md">{imcData.title}</span>;
      } 
}

export default IMCDisplay