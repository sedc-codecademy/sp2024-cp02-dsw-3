class LocalStorageService {
    getFromLocalStorage(key) {
        const item = localStorage.getItem(key);
        return item ? JSON.parse(item) : null;
    }

    setToLocalStorage(key, value) {
        localStorage.setItem(key, JSON.stringify(value));
    }

    clearLocalStorage(){
        localStorage.clear()
    }

    itemsInCart(key){
        const res = this.getFromLocalStorage(key)
        if(res){
            return res.length
        }else{
            return "";
        }
        
    }

}


export { LocalStorageService};
