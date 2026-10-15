const storage_key = 'res-history';

export function getHistory(){
    const data = localStorage.getItem(storage_key);
    if (data != null){
        return JSON.parse(data);
    } else{return [];}
}

export function saveToHistory(record){
    const history = getHistory();
    history.unshift(record);
    localStorage.setItem(storage_key, JSON.stringify(history));
}

export function clearHistory(){
    localStorage.removeItem(storage_key);
}

export function formatDate(dateStr){
    const date = new Date(dateStr);
    return new Intl.DateTimeFormat('ru-RU', {
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        timeZoneName: 'short'
    }).format(date);
}