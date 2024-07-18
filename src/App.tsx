import { ChangeEvent, useState } from 'react';
import './App.css';
import { searchAllPhotos } from './api';

type IPhotos = {
  title: string
  url: string
}

function App() {
  const [photos, setPhotos] = useState<IPhotos[]>([]);
  const [inputValue, setInputValue] = useState("");
  const [loading, setLoading] = useState(false);

  const searchFunc = async () => {
    await searchAllPhotos(inputValue).then((res) => {
      const transformedData = res.photos.photo.map((obj: any) => ({
        title: obj.title,
        url: `https://farm${obj.farm}.staticflickr.com/${obj.server}/${obj.id}_${obj.secret}_b.jpg`
      }));
      setPhotos(transformedData)
      setLoading(false)
    })
  };


  const confirm = () => {
    setLoading(true)
    searchFunc()
  }

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    setInputValue(event.target.value);
  };

  const handleKeyDown = (event: any) => {
    if (event.key === 'Enter' && inputValue) {
      event.preventDefault();
      confirm();
    }
  };

  return (
    <div className="App">
      <section className="m-4">
        <div className="container px-6 py-10 mx-auto">
          <h1 className="text-3xl font-semibold text-gray-800 capitalize lg:text-4xl">Test</h1>
          <div className="relative flex h-10 w-full min-w-[200px] max-w-[24rem] my-4">
            <button
              className={`!absolute right-1 top-1 z-10 select-none rounded bg-indigo-400 py-2 px-4 text-center align-middle font-sans text-xs font-bold uppercase text-white shadow-md shadow-indigo-400/20 transition-all hover:shadow-lg hover:shadow-indigo-400/40 focus:opacity-[0.85] focus:shadow-none active:opacity-[0.85] active:shadow-none peer-placeholder-shown:pointer-events-none peer-placeholder-shown:bg-blue-gray-500 peer-placeholder-shown:opacity-50 peer-placeholder-shown:shadow-none ${!inputValue && "bg-blue-gray-500 opacity-50 shadow-none cursor-not-allowed"}`}
              type="button"
              data-ripple-light="true"
              onClick={confirm}
              disabled={!inputValue}
            >
              Valider
            </button>
            <input
              type="text"
              className="peer h-full w-full rounded-[7px] border border-blue-gray-200 bg-transparent px-3 py-2.5 pr-20 font-sans text-sm font-normal text-blue-gray-700 outline outline-0 transition-all placeholder-shown:border placeholder-shown:border-blue-gray-200 placeholder-shown:border-t-blue-gray-200 focus:border-2 focus:border-indigo-400 focus:border-t-transparent focus:outline-0 disabled:border-0 disabled:bg-blue-gray-50"
              placeholder=""
              value={inputValue}
              onChange={handleChange}
              onKeyDown={handleKeyDown}
              required
            />
            <label className="before:content[' '] after:content[' '] pointer-events-none absolute left-0 -top-1.5 flex h-full w-full select-none text-[11px] font-normal leading-tight text-blue-gray-400 transition-all before:pointer-events-none before:mt-[6.5px] before:mr-1 before:box-border before:block before:h-1.5 before:w-2.5 before:rounded-tl-md before:border-t before:border-l before:border-blue-gray-200 before:transition-all after:pointer-events-none after:mt-[6.5px] after:ml-1 after:box-border after:block after:h-1.5 after:w-2.5 after:flex-grow after:rounded-tr-md after:border-t after:border-r after:border-blue-gray-200 after:transition-all peer-placeholder-shown:text-sm peer-placeholder-shown:leading-[3.75] peer-placeholder-shown:text-blue-gray-500 peer-placeholder-shown:before:border-transparent peer-placeholder-shown:after:border-transparent peer-focus:text-[11px] peer-focus:leading-tight peer-focus:text-indigo-400 peer-focus:before:border-t-2 peer-focus:before:border-l-2 peer-focus:before:!border-indigo-400 peer-focus:after:border-t-2 peer-focus:after:border-r-2 peer-focus:after:!border-indigo-400 peer-disabled:text-transparent peer-disabled:before:border-transparent peer-disabled:after:border-transparent peer-disabled:peer-placeholder-shown:text-blue-gray-500">
              Rechercher
            </label>
          </div>
          <div className="flex top-2 ml-2 text-xs font-normal text-blue-gray-700">{photos.length} éléments trouvés</div>
          {loading ? (
            <button
              type="button"
              className="mt-20 bg-indigo-400 h-max w-max rounded-lg text-white font-bold hover:bg-indigo-300 hover:cursor-not-allowed duration-[500ms,800ms]"
              disabled
            >
              <div className="flex items-center justify-center m-[10px]">
                <div className="h-5 w-5 border-t-transparent border-solid animate-spin rounded-full border-white border-4"></div>
                <div className="ml-2"> Chargement... </div>
              </div>
            </button>
          ) : <div className="grid grid-cols-1 gap-8 mt-8 md:mt-16 lg:grid-cols-2 xl:grid-cols-3">
            {photos.map((item, i) =>
              <div key={i} className="bg-white rounded-lg border shadow-md max-w-xs md:max-w-none overflow-hidden">
                <img className="h-56 lg:h-60 w-full object-cover" src={item.url} alt="" />
                <div className="p-3">
                  <h3 className="font-semibold text-xl leading-6 text-gray-700 my-2">
                    {item.title}
                  </h3>
                </div>
              </div>
            )}
          </div>}
        </div>
      </section>
    </div>
  );
}

export default App;
