import css from './TagsCloud.module.css';

export const TagsCloud = ({ tags, visibleTag, onTagClick }) => {
  return (
    <ul className={css.tagsCloud}>
      <li
        className={`${css.tagItem} ${visibleTag === 'all' ? css.activeTag : ''}`}
        onClick={() => onTagClick('all')}
      >
        All
      </li>

      {tags.map((tag) => (
        <li
          key={tag._id}
          className={`${css.tagItem} ${visibleTag === tag._id ? css.activeTag : ''}`}
          onClick={() => onTagClick(tag._id)}
        >
          {tag.tagName}
        </li>
      ))}
    </ul>
  );
};