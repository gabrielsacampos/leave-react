


export function RankingList(){
    const items = ['Item 1', 'Item 2', 'Item 3', 'Item 4', 'Item 5'];

  return (
    <div className="carousel-container overflow-hidden whitespace-nowrap">
      <div className="carousel-track flex">
        {items.map((item, index) => (
          <div key={index} className="carousel-item p-4">{item}</div>
        ))}
        {items.map((item, index) => (
          <div key={index + items.length} className="carousel-item p-4">{item}</div>
        ))}
      </div>
    </div>
  );
}