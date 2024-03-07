import {Component} from 'react'
import {v4 as uuidv4} from 'uuid'
import PasswordItem from '../PasswordItem/index'
import './index.css'

class PasswordManager extends Component {
  state = {
    passwordList: [],
    website: '',
    name: '',
    password: '',
    passwordCount: 0,
    showPassword: false,
    searchInput: '',
  }

  onAddPassword = event => {
    event.preventDefault()
    const {website, name, password} = this.state
    const bgColors = [
      '#0b69ff',
      '#94a3b8',
      '#b6c3ca',
      '#7683cb',
      '#f59e0b',
      '#10b981',
      '#f97316',
      '#14b8a6',
      '#b91c1c',
      '#ffffff',
      '#0ea5e9',
      '#64748b',
    ]
    const randomIndex =
      Math.floor(Math.random() * (bgColors.length - 1 - 0 + 1)) + 0

    const newPassword = {
      id: uuidv4(),
      websiteName: website,
      userName: name,
      userPassword: password,
      logoColor: bgColors[randomIndex],
    }
    this.setState(prevState => ({
      passwordList: [...prevState.passwordList, newPassword],
      passwordCount: prevState.passwordCount + 1,
    }))
    this.setState({
      website: '',
      name: '',
      password: '',
    })
  }

  onCheckedCheckbox = () => {
    this.setState(prevState => ({
      showPassword: !prevState.showPassword,
    }))
  }

  onChangeSearch = event => {
    this.setState({
      searchInput: event.target.value,
    })
  }

  onChangeWebsite = event => {
    this.setState({
      website: event.target.value,
    })
  }

  onChangeName = event => {
    this.setState({
      name: event.target.value,
    })
  }

  onChangePassword = event => {
    this.setState({
      password: event.target.value,
    })
  }

  onDeletePassword = id => {
    const {passwordList} = this.state
    const updatedList = passwordList.filter(list => list.id !== id)
    this.setState({
      passwordList: updatedList,
    })
    this.setState(prevState => ({
      passwordCount: prevState.passwordCount - 1,
    }))
  }

  render() {
    const {
      passwordList,
      website,
      name,
      password,
      passwordCount,
      showPassword,
      searchInput,
    } = this.state
    const filteredPasswords = passwordList.filter(item =>
      item.websiteName.toLowerCase().includes(searchInput.toLowerCase()),
    )
    let showPasswordView = ''
    if (filteredPasswords.length === 0 || filteredPasswords === 'undefined') {
      showPasswordView = (
        <div className="zero-passwords-container">
          <img
            src="https://assets.ccbp.in/frontend/react-js/no-passwords-img.png"
            alt="no passwords"
            className="zero-passwords-image"
          />
          <p className="no-passwords-para">No Passwords</p>
        </div>
      )
    } else {
      showPasswordView = (
        <ul className="passwords-list">
          {filteredPasswords.map(arr => (
            <PasswordItem
              key={arr.id}
              id={arr.id}
              websiteName={arr.websiteName}
              userName={arr.userName}
              userPassword={arr.userPassword}
              showPassword={showPassword}
              logoColor={arr.logoColor}
              onDeletePassword={this.onDeletePassword}
            />
          ))}
        </ul>
      )
    }

    return (
      <div className="bg-container">
        <img
          src="
https://assets.ccbp.in/frontend/react-js/password-manager-logo-img.png "
          alt="app logo"
          className="app-logo-image"
        />
        <div className="add-password-container">
          <form onSubmit={this.onAddPassword}>
            <h1 className="add-password-heading">Add New Password</h1>
            <div className="input-container">
              <label htmlFor="website" className="label-style">
                <img
                  src="https://assets.ccbp.in/frontend/react-js/password-manager-website-img.png"
                  alt="website"
                  className="input-logo"
                />
              </label>
              <input
                type="text"
                id="website"
                className="input-style"
                placeholder="Enter Website"
                value={website}
                onChange={this.onChangeWebsite}
              />
            </div>
            <div className="input-container">
              <label htmlFor="name" className="label-style">
                <img
                  src="https://assets.ccbp.in/frontend/react-js/password-manager-username-img.png"
                  alt="username"
                  className="input-logo"
                />
              </label>
              <input
                type="text"
                id="name"
                className="input-style"
                placeholder="Enter Username"
                value={name}
                onChange={this.onChangeName}
              />
            </div>
            <div className="input-container">
              <label htmlFor="password" className="label-style">
                <img
                  src="https://assets.ccbp.in/frontend/react-js/password-manager-password-img.png"
                  alt="password"
                  className="input-logo"
                />
              </label>
              <input
                type="password"
                id="password"
                className="input-style"
                placeholder="Enter Password"
                value={password}
                onChange={this.onChangePassword}
              />
            </div>
            <button type="submit" className="add-submit-btn">
              Add
            </button>
          </form>
          <img
            src="https://assets.ccbp.in/frontend/react-js/password-manager-lg-img.png"
            alt="password manager"
            className="password-manager-image"
          />
        </div>
        <div className="your-passwords-container">
          <div className="password-count-search-container">
            <div className="password-count-container">
              <h1 className="password-count">Your Passwords</h1>
              <p className="count-style">{passwordCount}</p>
            </div>

            <div className="search-password-container">
              <label htmlFor="search">
                <img
                  src="https://assets.ccbp.in/frontend/react-js/password-manager-search-img.png"
                  alt="search"
                  className="search-icon"
                />
              </label>
              <input
                type="search"
                className="input-style"
                id="search"
                placeholder="Search"
                value={searchInput}
                onChange={this.onChangeSearch}
              />
            </div>
          </div>
          <hr />
          <div className="checkbox-container">
            <input
              type="checkbox"
              id="checkpasswords"
              className="checkbox-style"
              onChange={this.onCheckedCheckbox}
            />
            <label htmlFor="checkpasswords" className="checkbox-label-style">
              Show Passwords
            </label>
          </div>
          {showPasswordView}
        </div>
      </div>
    )
  }
}
export default PasswordManager
