import { useState, useEffect } from "./htm-preact.js";

export function useChromeStorage(key, defaultValue) {
  const [value, setValue] = useState(defaultValue);
  const [status, setStatus] = useState("loading");

  useEffect(() => {
    let cancelGet = false;

    chrome.storage.sync.get({ [key]: defaultValue }, (result) => {
      if (!cancelGet) {
        setValue(result[key]);
        setStatus("done");
      }
    });

    return () => {
      cancelGet = true;
    };
  }, [setValue, key]);

  useEffect(() => {
    const storageListener = (changes) => {
      for (const changeKey in changes) {
        if (changeKey === key) {
          setValue(changes[key].newValue);
        }
      }
    };

    chrome.storage.onChanged.addListener(storageListener);
    return () => {
      chrome.storage.onChanged.removeListener(storageListener);
    };
  }, [setValue, key]);

  const saveNewValue = (newValue) => {
    chrome.storage.sync.set({ [key]: newValue }, () => {
      setValue(newValue);
    });
  };

  return [value, saveNewValue, status];
}

export function useForceRerender(intervalDuration) {
  const [, forceRerender] = useState();

  useEffect(() => {
    const interval = setInterval(() => {
      forceRerender(Math.random());
    }, intervalDuration);

    return () => {
      clearInterval(interval);
    };
  }, [intervalDuration]);
}
