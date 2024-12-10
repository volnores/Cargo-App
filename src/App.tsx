import { useState } from 'react';
import Header from './components/Header';
import ItemInfo from './components/ItemInfo';
import { useAppDispatch, useAppSelector } from './store';
import {
  addCargoItem,
  setFilterStatusChange,
  setSearchByWord,
  setTargetCargoName,
  setTargetDestination,
  setTargetName,
  setTargetOrigin,
  setTargetStatus,
  STATUS,
} from './store/slices/cargoSlice';

function App() {
  const [isOpenModal, setIsOpenModal] = useState<boolean>(false);
  const dispatch = useAppDispatch();
  const {
    cargoList,
    destination,
    name,
    origin,
    status,
    cargoName,
    searchByWord,
    filterStatusChange,
  } = useAppSelector((state) => state.cargo);

  const handleAddCargo = () => {
    if (!name || !origin || !destination || !status || !cargoName) {
      alert('Заполните все поля');
      return;
    }

    const today = new Date();

    const newCargo = {
      id: `CARGO${(cargoList.length + 1).toString().padStart(3, '0')}`,
      name,
      status,
      origin,
      destination,
      cargoName,
      departureDate: today.toISOString().split('T')[0],
    };

    dispatch(addCargoItem(newCargo));
    dispatch(setTargetName(''));
    dispatch(setTargetCargoName(''));
    dispatch(setTargetStatus(STATUS.InProcess));
    dispatch(setTargetOrigin(''));
    dispatch(setTargetDestination(''));
    setIsOpenModal((prev) => !prev);
  };

  const filteredCargoList = cargoList.filter((item) => {
    const filterSearch = item.name.toLowerCase().includes(searchByWord.toLowerCase());
    const filterByStatus = filterStatusChange ? item.status === filterStatusChange : true;
    return filterSearch && filterByStatus;
  });

  return (
    <div className="container mx-auto">
      <Header setIsOpenModal={setIsOpenModal} />

      <div className="flex flex-col md:flex-row md: justify-between md:items-center mb-4">
        <select
          value={filterStatusChange}
          onChange={(e) => dispatch(setFilterStatusChange(e.target.value))}
          className="p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-400 md:w-1/4">
          <option value="">Все</option>
          {Object.values(STATUS).map((item) => (
            <option key={item} value={item}>
              {item}
            </option>
          ))}
        </select>
        <input
          type="text"
          value={searchByWord}
          onChange={(e) => dispatch(setSearchByWord(e.target.value))}
          className="p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-400 mb-2 md:mb-0 md:w-1/4"
          placeholder="Поиск по имени"
        />
      </div>
      <ul className="mb-4 flex justify-center items-center gap-4 py-4 px-4 bg-slate-200 ">
        <li className="w-1/6 flex-grow">Номер груза</li>
        <li className="w-1/6 flex-grow">ФИО</li>
        <li className="w-1/6 flex-grow ">Статус груза</li>
        <li className="w-1/6 flex-grow ">Пункт отправления</li>
        <li className="w-1/6 flex-grow ">Пункт назначения</li>
        <li className="w-1/6 flex-grow ">Дата отправления</li>
      </ul>
      <div className="flex flex-col justify-center items-center gap-4">
        {filteredCargoList.length > 0 ? (
          filteredCargoList?.map((item) => <ItemInfo key={item.id} {...item} />)
        ) : (
          <p className="m-8 text-lg">Грузы не найдены</p>
        )}
      </div>
      {isOpenModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="bg-blue-100 flex flex-col items-center justify-center w-80 h-80 px-8 rounded shadow-lg">
            <input
              type="text"
              className="mb-2 p-2 border w-full border-gray-100 rounded"
              value={name}
              onChange={(e) => dispatch(setTargetName(e.target.value))}
              placeholder="Имя"
            />
            <input
              type="text"
              className="mb-2 p-2 border w-full border-gray-100 rounded"
              value={cargoName}
              onChange={(e) => dispatch(setTargetCargoName(e.target.value))}
              placeholder="Название груза"
            />
            <select
              className="mb-2 p-2 border w-full border-gray-100 rounded "
              value={status}
              onChange={(e) => dispatch(setTargetStatus(e.target.value))}>
              {Object.values(STATUS).map((item) => (
                <option key={item} value={item}>
                  {item}
                </option>
              ))}
            </select>
            <input
              type="text"
              className="mb-2 p-2 border w-full border-gray-100 rounded"
              value={origin}
              onChange={(e) => dispatch(setTargetOrigin(e.target.value))}
              placeholder="Пункт отправления"
            />
            <input
              type="text"
              className="p-2 border w-full border-gray-100 rounded"
              value={destination}
              onChange={(e) => dispatch(setTargetDestination(e.target.value))}
              placeholder="Пункт назначения"
            />
            <div className="flex justify-between w-full mt-4">
              <button
                className="bg-green-400 hover:bg-green-500 transition-colors text-white px-6 py-2 rounded"
                onClick={handleAddCargo}>
                Добавить
              </button>
              <button
                onClick={() => setIsOpenModal((prev) => !prev)}
                className="bg-red-400 hover:bg-red-500 transition-colors text-white px-6 py-2 rounded">
                Закрыть
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
