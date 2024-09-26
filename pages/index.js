import React, { useState, useEffect } from 'react';

export default function Gallery() {
  const [listItems, setListItems] = useState(null);

  useEffect(() => {
    fetch('/api/historicalEvents?month=1&day=1')
      .then(response => response.json())
      .then(json => {
        setListItems(json.map(historicEvent =>
          <li key={historicEvent.event}>
            {historicEvent.year}: {historicEvent.event}
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
    </section>
  );
}