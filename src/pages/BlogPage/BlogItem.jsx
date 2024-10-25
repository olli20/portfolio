import { Link } from 'react-router-dom';
import { format } from 'date-fns';

export const BlogItem = ({ _id, title, content, date, tags, location }) => {
  const formattedDate = format(new Date(date), 'dd MMMM yyyy');

  const teaserContent = content.length > 100 ? content.substring(0, 100) + '...' : content;

  return (
    <li key={_id}>
      <article>
        <Link state={{ from: location }} to={`/blog/${_id}`}>
          <h2>{title}</h2>
        </Link>
        <p>{teaserContent}</p>
        <p>{formattedDate}</p>
        <p>{tags && tags.length > 0 ? tags.map(tag => tag.tagName).join(', ') : 'No tags'}</p>
      </article>
    </li>
  );
};
