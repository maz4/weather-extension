import { consts } from "../constance/constance";
import { fetchOpenWeatherData } from "../utils/api";
import {
  getStoredCities,
  getStoredOptions,
  setStoredCities,
  setStoredOptions,
} from "../utils/storage";

chrome.runtime.onInstalled.addListener(() => {
  setStoredCities([]);
  setStoredOptions({
    tempScale: "metric",
    homeCity: "",
    hasAutoOverlay: false,
  });

  chrome.contextMenus.create({
    contexts: ["selection"],
    title: "Add city to weather extension",
    id: "weatherExtension",
  });

  chrome.alarms.create({
    periodInMinutes: 60,
  });
});

chrome.contextMenus.onClicked.addListener((event) => {
  getStoredCities().then((cities) => {
    setStoredCities([...cities, event.selectionText]);
  });
});

chrome.alarms.onAlarm.addListener(() => {
  getStoredOptions().then((options) => {
    if (options.homeCity === "") {
      return;
    }

    fetchOpenWeatherData(options.homeCity, options.tempScale).then((data) => {
      const temp = Math.round(data.main.temp);
      const symbole =
        options.tempScale === "metric" ? consts.CELSIUS : consts.FAHRENHEIT;
      chrome.action.setBadgeText({
        text: `${temp}${symbole}`,
      });
    });
  });
});
