import React from 'react';

const Header: React.FC = ({ setIsOpenModal }) => {
  return (
    <div className="flex items-center justify-between gap-4 py-4 px-4 bg-orange-200">
      <p className="text-2xl font-semibold text-slate-800">CARGO APP</p>
      <button
        onClick={() => setIsOpenModal((prev) => !prev)}
        className="bg-red-400 hover:bg-red-500 transition-colors text-white px-6 py-2 rounded">
        Создать груз
      </button>
    </div>
  );
};

export default Header;
