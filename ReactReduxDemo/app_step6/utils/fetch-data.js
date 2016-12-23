export default function fetchData(action, params, method='get'){
    return fetch('http://192.168.1.196:3000/api/'+action,{
        method: method,
        headers: {
            'Accept': 'application/json, text/plain, */*',
            'Content-Type': 'application/json'
        },
        body: params ? JSON.stringify(params) : null
    })
    .then((response)=>{
        return response.json()
    });
}