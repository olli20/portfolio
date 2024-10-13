import { Link } from 'react-router-dom';
import { format } from 'date-fns';

export const BlogItem = ({ _id, title, content, date, tags, location }) => {
  const formattedDate = format(new Date(date), 'dd MMMM yyyy');

  return (
    <li key={_id}>
      <article>
        <Link state={{ from: location }} to={`/blog/${_id}`}>
          <h2>{title}</h2>
        </Link>
        <p>{content}</p>
        <p>{formattedDate}</p>
        <p>{tags.join(', ')}</p>
      </article>
    </li>
  );
};