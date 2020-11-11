export default function reducer() { 
    combineReducers({
    setSignInStatus,
    setHuntListItems,
    setItemClicked,
    setChecked,
    setThemeSelected,
    setItemAmount,
    setThemeArray,
    setHuntTitle,
    setUserId,
    setHuntListId,
    setItemId,
    setUser,
    setUserListId,
    setNavigationLocation,
    setNavigationTimer,
    setLoading,
    setLoadingImage
  })
}
  
  function setLoadingImage( state="" , action) {
    switch(action.type) {
      case "SETLOADINGIMAGE":
        return action.payload
      default:
        return state
    }
  }
  
  function setLoading( state = false, action ) {
    switch(action.type) {
      case "SETLOADING":
        return action.payload
      default: 
        return state
    }
  }
  
  function setNavigationTimer( state=0, action ) {
    switch(action.type) {
      case "SETTIMER":
        return action.payload
      default: 
        return state
    }
  }
  
  function setNavigationLocation( state="", action ) {
    switch(action.type) {
      case "SETLOCATION":
        return action.payload
      default: 
        return state
    }
  }
  
  function setUserListId(state=0, action) {
    switch(action.type) {
      case "SETUSERLISTID":
        return action.payload
      default: 
        return state
    }
  }
  
  function setUser(state="", action) {
    switch(action.type) {
      case "SETUSER":
        return action.payload
      default:
        return state
    }
  }
  
  function setItemId(state=[], action) {
    switch(action.type) {
      case "SETITEMID":
        return [...state, action.payload]
      default:
        return state
    }
  }
  
  function setHuntListId(state=0, action) {
    switch(action.type) {
      case "SETID":
        return action.payload
      default: 
        return state
    }
  }
  
  function setUserId(state=0, action) {
    switch(action.type) {
      case "SETUSERID":
        return action.payload
      default:
        return state 
    }
  }
  
  function setHuntTitle( state="", action ) {
    switch(action.type) {
      case "SETTITLE":
        return action.payload
      default: 
        return state
    }
  }
  
  function setThemeArray( state=[], action ) {
    switch(action.type) {
      case "CREATEARRAY":
        return [...action.payload]
      default:
        return state
    }
  }
  
  function setItemAmount(state="", action) {
    switch(action.type) {
      case "UPDATEITEMAMOUNT":
        return action.payload
      default: 
        return state
    }
  }
  
  function setThemeSelected( state="", action ) {
    switch(action.type) {
      case "UPDATETHEME":
        return action.payload
      default:
        return state
    }
  }
  
  function setHuntListItems(state=[], action) {
    switch(action.type) {
      case "ALLHUNTITEMS":
        return action.payload
      default: 
        return state
    }
  }
  
  function setSignInStatus(state=false, action) {
    switch(action.type) {
      case "CHANGESIGNIN":
        return action.payload
      default: 
        return state
    }
  }
  
  function setItemClicked( state="", action ) {
    switch(action.type) {
      case "CLICKED":
        return action.payload
      case "UNCLICKED":
        return action.payload
      default:
        return state
    }
  }
  
  function setChecked( state=[], action)  {
    switch(action.type) {
      case "CHECK":
        return [...state, action.payload]
      case "CHECKGROUP":
        return action.payload
      case "UNCHECK":
        const filteredIsChecked = state.filter(el => el != action.payload)
        return filteredIsChecked
      default: 
        return state
    }
  }