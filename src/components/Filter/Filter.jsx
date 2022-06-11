import PropTypes from 'prop-types';

const Filter = (props) => {
    const { filter, onChange } = props;

    return (
        <label>
            Find contacts by name
            <input type="text" value={filter} onChange={onChange} />
        </label>
    )
}

Filter.propTypes = {
    filter: PropTypes.string.isRequired,
    onChange: PropTypes.func.isRequired,
  };

export default Filter;