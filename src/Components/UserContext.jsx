import {createContext, useEffect, useMemo, useState } from "react";

export const UserContext = createContext();

const UserProvider = ({children})=>
{
    const [LoggedIn,SetLoggedIn] = useState(()=>
    {
        const logdata = localStorage.getItem('LoggedIn');
        return logdata? JSON.parse(logdata) : false;
    });
    const [admin,SetAdmin]  = useState(()=>
    {
        const isadmin = localStorage.getItem('admin');
        return isadmin? JSON.parse(isadmin) : false;
    });
    const [user, setUser] = useState(()=>
    {
        const userData = localStorage.getItem('user');
        return userData? JSON.parse(userData) : {};
    });
    const [upevent,Setupevent] = useState(()=>
    {
        const eventdata = localStorage.getItem('upevent');
        return eventdata? JSON.parse(eventdata) : {};
    });
    
    const UserSetData = useMemo(()=>{
        return ({
            LoggedIn,admin,user,upevent,
            login:(udata)=>{
                setUser(udata);
                SetLoggedIn(true);
                SetAdmin(udata.Admin);
            },
            logout:()=>{
                setUser({});
                localStorage.removeItem('LoggedIn');
                localStorage.removeItem('admin');
                localStorage.removeItem('user');
                SetLoggedIn(false);
                SetAdmin(false);
            },
            update:(udata)=>{
                setUser(udata);
            },
            updateEvent:(evedata)=>{
                Setupevent(evedata);
            },
            removeupEvent:()=>{
                Setupevent({});
                localStorage.removeItem('upevent');
            }
        });
    },[admin,user,LoggedIn,upevent]);
    useEffect(()=>{
        localStorage.setItem('LoggedIn',JSON.stringify(LoggedIn));
        localStorage.setItem('admin',JSON.stringify(admin));
        localStorage.setItem('user',JSON.stringify(user));
        localStorage.setItem('upevent',JSON.stringify(upevent));
    },[admin,user,LoggedIn,upevent]);
    return(
        <UserContext.Provider value={UserSetData}>
            {children}
        </UserContext.Provider>
    );
}
export default UserProvider;