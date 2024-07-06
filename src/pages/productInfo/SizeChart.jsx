import React from 'react';

const SizeChartModal = ({ showModal, setShowModal }) => {
  if (!showModal) return null;

  return (
    <div className="fixed top-0 left-0 z-50 w-full h-full flex items-center justify-center bg-black bg-opacity-75">
      <div className="bg-white p-4 rounded-lg shadow-lg w-80 relative">
        <button
          className="absolute top-2 right-2 text-black text-lg transition duration-300 hover:text-gray-400 transform hover:scale-110"
          onClick={() => setShowModal(false)}
        >
          Close
        </button>
        <h2 className="text-xl font-semibold mb-2">Size Chart</h2>
        <table className="table-auto w-full text-left text-sm">
          <thead>
            <tr>
              <th className="px-2 py-1">Size</th>
              <th className="px-2 py-1">XS</th>
              <th className="px-2 py-1">S</th>
              <th className="px-2 py-1">M</th>
              <th className="px-2 py-1">L</th>
              <th className="px-2 py-1">XL</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className="border px-2 py-1">Chest</td>
              <td className="border px-2 py-1">32</td>
              <td className="border px-2 py-1">34</td>
              <td className="border px-2 py-1">36</td>
              <td className="border px-2 py-1">38</td>
              <td className="border px-2 py-1">40</td>
            </tr>
            <tr>
              <td className="border px-2 py-1">Waist</td>
              <td className="border px-2 py-1">24</td>
              <td className="border px-2 py-1">26</td>
              <td className="border px-2 py-1">28</td>
              <td className="border px-2 py-1">30</td>
              <td className="border px-2 py-1">32</td>
            </tr>
            <tr>
              <td className="border px-2 py-1">Hip</td>
              <td className="border px-2 py-1">35</td>
              <td className="border px-2 py-1">37</td>
              <td className="border px-2 py-1">38</td>
              <td className="border px-2 py-1">41</td>
              <td className="border px-2 py-1">43</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default SizeChartModal;
