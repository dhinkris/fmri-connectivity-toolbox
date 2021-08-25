import PropTypes from 'prop-types'
import Button from './Button'

const Header = ({title}) => {
    return (
        <div>
            <h3 style={{display:'flex',justifyContent:'center'}}>{title}</h3>
            {/*<Button text='Upload File'/>*/}
        </div>
    )
}

Header.defaultProps = {
    title: 'Default Header',
}

Header.propTypes = {
    title: PropTypes.string.isRequired,
}

export default Header
