
import PropTypes from 'prop-types';

export const ITagPropType = PropTypes.shape({
  _id: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
});

export const IUserPropType = PropTypes.shape({
  _id: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  bio: PropTypes.string.isRequired,
  email: PropTypes.string.isRequired,
  photo: PropTypes.string.isRequired,
  createdAt: PropTypes.string.isRequired,
  github: PropTypes.string.isRequired,
  linkedin: PropTypes.string.isRequired,
  publicEmail: PropTypes.string.isRequired,
  role: PropTypes.string.isRequired,
});

export const ISnippetPropType = PropTypes.shape({
  _id: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  code: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  language: PropTypes.string.isRequired,
  tags: PropTypes.arrayOf(ITagPropType).isRequired,
  likedBy: PropTypes.arrayOf(PropTypes.string).isRequired,
  user: IUserPropType.isRequired,
  createdAt: PropTypes.string.isRequired,
});
