import { useEffect, useReducer } from "react";
import { AppContext } from "..";
import { CuisineData } from "../Data/CuisineData";
import { RestaurantsData } from "../Data/RestaurantsData";

export function AppContextProvier({ children }) {
  const reducerFunction = (state, action) => {
    switch (action.type) {
      case "UPDATE_CUISINE_TYPE": {
        return { ...state, cuisineType: action.payload };
      }
      case "UPDATE_RESTO_LIST": {
        return { ...state, restoList: action.payload };
      }
      case "ADD_NEW_REVIEW": {
        return {
          ...state,
          restaurantsData: state.restaurantsData.reduce((acc, curr) => {
            return curr.id === action.id
              ? [
                  ...acc,
                  {
                    ...curr,
                    averageRating:
                      (curr.averageRating * curr.ratings.length +
                        Number(action.payload.rating)) /
                      (curr.ratings.length + 1),
                    ratings: [...curr.ratings, action.payload]
                  }
                ]
              : [...acc];
          }, [])
        };
      }

      default:
        return state;
    }
  };
  const initialValue = {
    cuisineData: CuisineData,
    restaurantsData: RestaurantsData,
    cuisineType: 0,
    restoList: []
  };

  const [state, dispatch] = useReducer(reducerFunction, initialValue);

  useEffect(() => {
    let data = [...state.restaurantsData].filter(
      ({ cuisine_id }) => cuisine_id === state.cuisineType
    );
    dispatch({ type: "UPDATE_RESTO_LIST", payload: data });
  }, [state.cuisineType]);

  return (
    <AppContext.Provider value={{ state, dispatch }}>
      {children}
    </AppContext.Provider>
  );
}
