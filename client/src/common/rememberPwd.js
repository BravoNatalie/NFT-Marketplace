export const setCookie = (name, value, expiryDate) => {
    let currentDate = new Date();
    currentDate.setDate(currentDate.getDate() + expiryDate);
    document.cookie = name + '=' + value + '; expires=' + currentDate;
  };
  
  export const getCookie = name => {
    let arr = document.cookie.split('; ');
    for (let i = 0; i < arr.length; i++) {
      let arr2 = arr[i].split('=');
      if (arr2[0] === name) {
        return arr2[1];
      }
    }
    return '';
  };
  
  export const removeCookie = name => {
    setCookie(name, 1, -1);
  };
