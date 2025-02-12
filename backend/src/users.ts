export type User = {
    id: number;
    email: string;
    first_name: string;
    last_name: string;
    avatar: string;
};

const users = new Map<string, User>();

export const fetchusers = fetch(`https://reqres.in/api/users?page=1`,{
    method: 'GET',
    mode: 'cors', // no-cors, *cors, same-origin
    cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
    redirect: 'follow', // manual, *follow, error
    referrerPolicy: 'no-referrer', // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
    headers: {
        'Content-Type': 'application/json'
    }
}).then((data)=>data.json())
.then((data)=>{
    if(data?.data?.length) {
        for(const newuser of data.data) {
            users.set(`${newuser.id}`,newuser)
        }
    }
})

export default users;
