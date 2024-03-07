import './index.css'

const PasswordItem = props => {
  const {
    id,
    websiteName,
    userName,
    userPassword,
    showPassword,
    logoColor,
    onDeletePassword,
  } = props
  const deletePassword = () => {
    onDeletePassword(id)
  }
  const charLogo = logoColor.replace(/[0-9]/g, '')
  const slicedLogo = charLogo.slice(1, charLogo.length)
  console.log(`${slicedLogo}-logo`)
  const firstLetter = userName.slice(0, 1)
  const passwordView = showPassword ? (
    <p className="password">{userPassword}</p>
  ) : (
    <p className="password">
      <img
        src="https://assets.ccbp.in/frontend/react-js/password-manager-stars-img.png"
        alt="stars"
        className="star-image"
      />
    </p>
  )
  return (
    <li className="password-list">
      <div className="user-container">
        <p className={`${slicedLogo}-logo`}>{firstLetter}</p>
        <div className="user-details-container">
          <p className="website">{websiteName}</p>
          <p className="name">{userName}</p>
          {passwordView}
        </div>
      </div>
      <button
        type="button"
        className="delete-btn"
        data-testid="delete"
        onClick={deletePassword}
      >
        <img
          src="https://assets.ccbp.in/frontend/react-js/password-manager-delete-img.png"
          alt="delete"
          className="delete-img"
        />
      </button>
    </li>
  )
}
export default PasswordItem
