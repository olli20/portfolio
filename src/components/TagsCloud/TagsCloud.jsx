import css from './TagsCloud.module.css';

export const TagsCloud = ({ tags, visibleTag, onTagClick }) => {
  return (
    <ul className={css.tagsCloud}>
      {['all', ...tags].map((tag) => (
        <li
          key={tag}
          className={`${css.tagItem} ${visibleTag === tag ? css.activeTag : ''}`}
          onClick={() => onTagClick(tag)}
        >
          {tag}
        </li>
      ))}
    </ul>
  );
};