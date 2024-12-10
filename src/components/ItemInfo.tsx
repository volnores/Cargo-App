import React, { useState } from 'react';
import { ICargoItems, STATUS, updateStatus } from '../store/slices/cargoSlice';
import { useAppDispatch } from '../store';

const ItemInfo: React.FC<ICargoItems> = ({
  id,
  name,
  origin,
  destination,
  departureDate,
  status,
  cargoName,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const dispatch = useAppDispatch();

  const handleChangeStatus = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const newStatus = e.target.value;
    dispatch(updateStatus({ id, status: newStatus }));
  };

  const bgColor = () => {
    switch (status) {
      case STATUS.InProcess:
        return 'bg-yellow-200';
      case STATUS.InTransit:
        return 'bg-blue-200';
      case STATUS.Delivered:
        return 'bg-green-200';
      default:
        return 'bg-gray-200';
    }
  };

  return (
    <div className={`flex flex-col ${bgColor()} w-full rounded-md`}>
      <div className={`flex justify-center items-center w-full px-4 py-4 gap-4 rounded-md shadow`}>
        <div
          className="w-1/6 flex items-center bg-white cursor-pointer p-2 rounded shadow-lg"
          onClick={() => setIsOpen((prev) => !prev)}>
          {id}
        </div>
        <div className="w-1/6 flex-grow truncate">{name}</div>
        <select
          className={`w-1/6 flex-grow bg-white border border-gray-300 rounded-md`}
          value={status}
          onChange={handleChangeStatus}>
          {Object.values(STATUS).map((item) => (
            <option key={item} value={item}>
              {item}
            </option>
          ))}
        </select>
        <div className="w-1/6 flex-grow truncate">{origin}</div>
        <div className="w-1/6 flex-grow truncate">{destination}</div>
        <div className="w-1/6 flex-grow">{departureDate}</div>
      </div>
      {isOpen && (
        <div className="flex w-full bg-slate-50 p-4 shadow-lg">
          <div className="flex flex-col w-full">
            <div className="flex justify-start">{`ID: ${id}`}</div>
            <div className="flex justify-start">{`ФИО: ${name}`}</div>
            <div className="flex justify-start">{`Груз: ${cargoName}`}</div>
            <div className="flex justify-start">{`Пункт отправления: ${origin}`}</div>
            <div className="flex justify-start">{`Пункт назначения: ${destination}`}</div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ItemInfo;
