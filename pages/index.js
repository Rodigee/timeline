import React, { useState, useEffect } from 'react';

function HistoricalEvent({ eventText }) {
  return (
    <span>{eventText}</span>
  );
}

export default function Gallery() {
  const [data, setData] = useState(null);
  const [listItems, setListItems] = useState(null);

  useEffect(() => {
    fetch('/api/historicalEvents?month=12&day=18')
      .then(response => response.json())
      .then(json => {
        setData(json);
        setListItems(json.map(historicEvent =>
          <li key={historicEvent.event}>
            {historicEvent.event}
          </li>
        ));
      })
      .catch(error => console.error(error));
  }, []);

  return (
    <section>
      <div className="flex">
        <ul>{listItems}</ul>
      </div>
      {data ? <pre>{JSON.stringify(data, null, 2)}</pre> : 'Loading...'}
    </section>
  );
}