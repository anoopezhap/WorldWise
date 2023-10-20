import { useContext, useEffect } from "react";
import { createContext, useState } from "react";

const CitiesContext = createContext();

function CitiesProvider({ children }) {
  const [cities, setCities] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [currentCity, setCurrentCity] = useState({});

  useEffect(function () {
    async function fetchCities() {
      try {
        setIsLoading(true);
        const res = await fetch("http://localhost:8000/cities");
        const data = await res.json();
        setCities(data);
      } catch {
        alert("There was a loading error");
      } finally {
        setIsLoading(false);
      }
    }
    fetchCities();
  }, []);

  async function getCity(id) {
    {
      try {
        setIsLoading(true);
        const res = await fetch(`http://localhost:8000/cities/${id}`);
        const data = await res.json();
        setCurrentCity(data);
      } catch {
        alert("There was a loading error");
      } finally {
        setIsLoading(false);
      }
    }
  }

  async function createCity(newCity) {
    {
      try {
        setIsLoading(true);
        const res = await fetch(`http://localhost:8000/cities`, {
          method: "POST",
          body: JSON.stringify(newCity),
          headers: {
            "Content-Type": "application/json",
          },
        });
        const data = await res.json();

        setCities((cities) => [...cities, data]);
      } catch {
        alert("There was a loading error");
      } finally {
        setIsLoading(false);
      }
    }
  }

  return (
    <CitiesContext.Provider
      value={{ cities, isLoading, currentCity, getCity, createCity }}
    >
      {children}
    </CitiesContext.Provider>
  );
}

function useCities() {
  const context = useContext(CitiesContext);
  if (context === undefined)
    throw new Error("CitiesContent was used outside the scope");
  return context;
}

export { CitiesProvider, useCities };
//export { CitiesProvider };
