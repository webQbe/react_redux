/* Format the Time Ago Display */
import { parseISO, formatDistanceToNow } from 'date-fns'; // to convert the timestamp string into a readable format

const TimeAgo = ({ timestamp }) => {
    let timeAgo = ''
    if (timestamp) {
        const date = parseISO(timestamp); // Convert string timestamp to Date
        const timePeriod = formatDistanceToNow(date)  // Get time difference
        timeAgo = `${timePeriod} ago` // Format it as "X minutes/hours ago"
    }

  /* Display the formatted time inside a <span> */
  return (
    <span title={timestamp}>
        &nbsp; <i>{timeAgo}</i>
    </span>
  )
}

export default TimeAgo