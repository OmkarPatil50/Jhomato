import { useContext } from "react";
import { AppContext } from "..";
import { MenuCard } from "../Components/MenuCard";
import { Link } from "react-router-dom";

export function Landing() {
  const { state, dispatch } = useContext(AppContext);

  return (
    <div className="main-page">
      <h1 className="app-heading">JHOMATO</h1>
      <div className="btn-section">
        <h3 className="cuisine-heading">Select Your Cuisine</h3>
        <ul>
          {state.cuisineData.map(({ name, id }) => {
            return (
              <button
                className="landing-btn"
                onClick={() => {
                  dispatch({
                    type: "UPDATE_CUISINE_TYPE",
                    payload: id
                  });
                }}
              >
                {name}
              </button>
            );
          })}
        </ul>
      </div>
      <div className="resto-list-section">
        <ul className="resto-list-ul">
          {state.restoList.map((resto) => {
            return (
              <Link
                to={`/resto/${resto.id}`}
                key={resto.id}
                className="resto-section"
              >
                <h3 className="resto-name-landing">{`Dishes By ${resto.name}`}</h3>
                <ul className="menu-card-ul">
                  {resto.menu.map((menu) => {
                    return (
                      <li>
                        <MenuCard menu={menu} />
                      </li>
                    );
                  })}
                </ul>
              </Link>
            );
          })}
        </ul>
      </div>
    </div>
  );
}
