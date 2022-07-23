import React from "react";

import "./TicketBooking.css";
export const TicketBooking = () => {
  const rows = 10;
  const cols = 10;
  const [boookedSeats, setBookedSeats] = React.useState(new Set());
  const [selectedSeats, setSelectedSeats] = React.useState(new Set());
  const [showError, setError] = React.useState(false);

  let seatRowsTimeAuto = "";
  for (let i = 0; i < cols; i++) {
    seatRowsTimeAuto += "auto ";
  }

  const parentDiv = React.useRef();

  const handleClick = React.useCallback(event => {
    const seatNo = event.target.innerText;

    setSelectedSeats((p) => {
      const seats = new Set(p);

      if (p.has(seatNo)) {
        seats.delete(seatNo)
      } else {
        seats.add(seatNo)
      }

      return seats;
    });

    setError(false);
  }, []);

  React.useEffect(() => {
    const element = parentDiv.current;

    element.addEventListener('click', handleClick);

    return () => {
      element.removeEventListener('click', handleClick);
    };
  }, [handleClick]);

  const getClassName = (seatNo) => {
    if (boookedSeats.has(seatNo)) {
      return "disabled seat";
    }

    return selectedSeats.has(seatNo) ? "selected seat" : "seat";
  };

  const onBookingClick = () => {
    if (!selectedSeats.size) {
      setError(true);
    } else {
      setBookedSeats(new Set(selectedSeats));
      setSelectedSeats(new Set());
    }
  };

  const onClearButton = () => {
    setSelectedSeats(new Set());
    setError(false);
  };

  const onResetBookings = () => {
    setSelectedSeats(new Set());
    setBookedSeats(new Set());
    setError(false);
  };

  return (
    <div className="mt-5 justify-content-center align-items-center">
      <div className="d-flex justify-content-center">
        <button className="btn btn-success" onClick={() => onBookingClick()}>
          Book Seats
        </button>
        <button
          className="btn btn-danger ms-2"
          onClick={() => onClearButton()}
        >
          Clear
        </button>
      </div>
      <div
        ref={parentDiv}
        className="mt-3"
        style={{ display: "grid", gridTemplateColumns: `${seatRowsTimeAuto}` }}
      >
        {Array(rows)
          .fill(0)
          .map((_, row) => (
            <div key={row} style={row === 4 ? { marginRight: "40px" } : null}>
              {Array(cols)
                .fill(0)
                .map((_, col) => (
                  <div
                    className={getClassName(
                      `${String.fromCharCode(65 + col)}${row}`
                    )}
                    key={`${row}${col}`}
                  >{`${String.fromCharCode(65 + col)}${row}`}</div>
                ))}
            </div>
          ))}
      </div>
      <br />
      <div className="d-flex justify-content-center">
        <button className="btn btn-primary" onClick={() => onResetBookings()}>
          Reset Bookings
        </button>
        <br />
      </div>
      {
        showError && (<div className="mt-1 d-flex justify-content-center align-items-center">Please select at least one seat.</div>)
      }
    </div>
  );
};
