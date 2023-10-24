export function MenuCard({ menu }) {
  return (
    <div className="menu-card">
      <img src={menu.imgSrc} alt="food" className="menu-img" />
      <div className="menu-info-section">
        <h3>{menu.name}</h3>
        <p>Rs.{menu.price} for one</p>
      </div>
    </div>
  );
}
