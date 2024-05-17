import { useEffect } from 'react';
import { toast } from 'react-toastify';
import { useSelector, useDispatch } from 'react-redux';
import { getTicket, reset } from '../features/tickets/ticketSlice';
import { useParams } from 'react-router-dom';
import BackButton from '../components/BackButton';
import Spinner from '../components/Spinner';

function Ticket() {
  const { ticket, isLoading, isSuccess, isError, message } = useSelector(
    (state) => state.tickets
  );

  const params = useParams();
  const dispatch = useDispatch();
  const { ticketId } = useParams();
  // console.log(ticketId);

  useEffect(() => {
    dispatch(getTicket(ticketId))
      .unwrap()
      .catch((err) => toast.error(err.message));
    // eslint-disabled-next-line
  }, [ticketId, dispatch]);

  if (isLoading) {
    return <Spinner />;
  }

  if (isError) {
    return <h3>Something went wrong</h3>;
  }
  return (
    <div className="ticket-page">
      <header className="ticket-header">
        <BackButton url="/tickets" />
        <h2>Ticket ID: {ticket._id}</h2>
        <span className={`status status-${ticket.status}`}>
          {ticket.status}
        </span>
        <h3>
          Date Submitted: {new Date(ticket.createdAt).toLocaleString('en-US')}
        </h3>
        <hr />
        <div className="ticket-desc">
          <h3>Description of Issue</h3>
          <p>{ticket.description}</p>
        </div>
      </header>
    </div>
  );
}

export default Ticket;
