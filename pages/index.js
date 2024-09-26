import React, { useState, useEffect } from 'react';

export default function Gallery() {
  const [listItems, setListItems] = useState(null);
  const [selectedDate, setSelectedDate] = useState('');

  const fetchEvents = (date) => {
    const [year, month, day] = date.split('-');
    fetch(`/api/historicalEvents?month=${month}&day=${day}`)
      .then(response => response.json())
      .then(json => {
        setListItems(json.map(historicEvent =>
          <li key={historicEvent.event}>
            {historicEvent.year}: {historicEvent.event}
          </li>
        ));
      })
      .catch(error => console.error(error));
  };

  const handleDateChange = (event) => {
    const newDate = event.target.value;
    setSelectedDate(newDate);
    fetchEvents(newDate);
  };

  useEffect(() => {
    // Set default date to today and fetch events
    const today = new Date().toISOString().split('T')[0];
    setSelectedDate(today);
    fetchEvents(today);
  }, []);

  return (
    <section>
      <div className="mb-4">
        <label htmlFor="datePicker" className="block mb-2">Select a date:</label>
        <input
          type="date"
          id="datePicker"
          value={selectedDate}
          onChange={handleDateChange}
          className="border rounded p-2"
        />
      </div>
      <div className="flex">
        <ul>{listItems}</ul>
      </div>
    </section>
  );
}