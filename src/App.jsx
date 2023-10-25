import { BsFillVolumeUpFill } from "react-icons/bs";
import { RiArrowLeftRightFill } from "react-icons/ri";
import { useState, useEffect } from "react";
import { countries } from "./countries";

export const App = () => {
  const [from, setFrom] = useState("auto");
  const [to, setTo] = useState("es-ES");
  const [query, setQuery] = useState("");
  const [textTranslated, setTextTranslated] = useState("");

  const handleFromChange = (e) => {
    e.preventDefault();
    setFrom(e.target.value);
  };

  const handleToChange = (e) => {
    e.preventDefault();
    setTo(e.target.value);
  };

  const translate = () => {
    const url = `${import.meta.env.VITE__TRANSLATE_URL}?client=gtx&sl=${from}&tl=${to}&dt=t&q=${encodeURI(
      query
    )}`;

    fetch(url)
      .then((response) => response.json())
      .then((json) => {
        setTextTranslated(json[0].map((item) => item[0]).join(""));
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const changeFromTo = (e) => {
    e.preventDefault();
    setFrom(to);
    setTo(from);
    setQuery((prevState) => textTranslated);
    setTextTranslated((prevState) => query);
  };

  const speak = (text, lang) => {
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = lang;
    speechSynthesis.speak(utterance);
  };

  useEffect(() => {
    translate();
  }, [from, to, query]);

  return (
    <div className="flex justify-center flex-col items-center gap-5 p-5">
      <h1 className="text-white text-2xl font-bold uppercase tracking-widest">
        Translate App
      </h1>
      <div className="flex flex-col gap-5 bg-white max-w-[700px] w-full p-8 rounded-2xl">
        <div className="flex flex-col sm:flex-row justify-between rounded-2xl border-2 overflow-hidden">
          <div className="sm:w-[50%] flex flex-col relative">
            <textarea
              name=""
              className="w-full text-3xl resize-none outline-none p-4 border-b-2  sm:border-r-2 sm:border-b-0 h-full"
              id=""
              cols="20"
              rows="7"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
            ></textarea>
            <div className="flex bottom-4 left-4 gap-2 items-center absolute">
              <BsFillVolumeUpFill
                size={40}
                onClick={() => speak(query, from)}
                className="cursor-pointer hover:bg-black/80 p-2 rounded-full hover:text-white duration-300"
              />
            </div>
          </div>
          <div className="sm:w-[50%] flex flex-col relative">
            <textarea
              name=""
              readOnly
              id=""
              className="w-full text-3xl p-4 resize-none outline-none px-4 py-2"
              cols="20"
              rows="7"
              value={textTranslated}
            ></textarea>
            <div className="flex bottom-4 left-4 gap-2 items-center absolute">
              <BsFillVolumeUpFill
                size={40}
                onClick={() => speak(textTranslated, to)}
                className="cursor-pointer hover:bg-black/80 p-2 rounded-full hover:text-white duration-300"
              />
            </div>
          </div>
        </div>
        <div className="flex justify-between items-center gap-10 ">
          <select
            name=""
            id=""
            className="w-full bg-gray-200 text-gray-800 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500 focus:ring focus:ring-blue-200 shadow-md cursor-pointer text-center text-lg p-2 hover:border-blue-500"
            value={from}
            onChange={handleFromChange}
          >
            {Object.entries(countries).map((country) => {
              return (
                <option
                  value={country[0]}
                  key={country[0]}
                  className="text-gray-700"
                >
                  {country[1]}
                </option>
              );
            })}
          </select>
          <div className="p-4 bg-[#09f] w-auto h-auto rounded-full text-white hover:scale-110 cursor-pointer duration-300">
            <RiArrowLeftRightFill onClick={changeFromTo} size={25} />
          </div>
          <select
            name=""
            id=""
            className="w-full bg-gray-200 text-gray-800 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500 focus:ring focus:ring-blue-200 shadow-md cursor-pointer text-center text-lg p-2 hover:border-blue-500"
            onChange={handleToChange}
            value={to}
          >
            {Object.entries(countries).map((country) => {
              return (
                <option value={country[0]} key={country[0]}>
                  {country[1]}
                </option>
              );
            })}
          </select>
        </div>
      </div>
      <footer className="absolute bottom-0 p-4">
        <p className="text-white">Made With Love By David Abed</p>
      </footer>
    </div>
  );
};
