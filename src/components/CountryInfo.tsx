import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  selectCountryInfo,
  fetchCountryList,
  fetchCountryInfo,
  setCountryName,
  resetState
} from "../redux/reducer";
import store from "../redux/store";
import TimeSeriesChart from "./TimeSeriesChart";
export type AppDispatch = typeof store.dispatch;

const CountryInfo: React.FC = () => {
  const {
    countryName,
    status,
    highestValue,
    lowestValue,
    countryList,
    timerSeries,
  } = useSelector(selectCountryInfo);
  const dispatch = useDispatch<AppDispatch>();
  const [selectedOption, setSelectedOption] = useState<string>("");

  useEffect(() => {
    dispatch(fetchCountryList());
  }, []);

  const handleSelectChange = (event: React.ChangeEvent<HTMLSelectElement>) => {

    if(!event.target.value){
      dispatch(resetState());
      return
    }
    // Handle select change here
    const selectedOptionText = event.target.options[event.target.selectedIndex].text;

    setSelectedOption(event.target.value);
    dispatch(fetchCountryInfo(event.target.value));
    dispatch(setCountryName(selectedOptionText))
  };

  return (
    <div>
      <div>
        <label>
          Select Country:
          <select
            className="form-select"
            value={selectedOption}
            onChange={handleSelectChange}
          >
            <option value="">Select an option</option>
            {countryList.map((item: any, index) => {
              return (
                <option key={item.id} value={item.id}>
                  {item.title}
                </option>
              );
            })}
          </select>
        </label>
      </div>
      <h4>Country Information</h4>
      <p>Country Name: {countryName}</p>
      <p>Status: {status}</p>
      <p>Highest Value: {highestValue}</p>
      <p>Lowest Value: {lowestValue}</p>

      <div className="continer-center">
        {timerSeries.length > 0 && (
          <TimeSeriesChart
            data={timerSeries.map(([date, value]) => ({ date, value }))}
          />
        )}
      </div>
    </div>
  );
};

export default CountryInfo;
