import React, { useState, createContext} from 'react'

export const UserContextdefaultValue = {
    user: {username: 'Anonymous', image: 'cat1.jpg'},
    setUser: (user:UserType) => {},
    setUserImage: (img:string) => {},
    setUserUsername: (username:string) => {},
}

interface UserType{
    username: string;
    image: string;
};

interface UserContextInterface{
    user: UserType;
    setUser: (user:UserType) => void;
    setUserImage: (img:string) => void;
    setUserUsername: (username:string) => void;
}

function UserProvider({ children }:any){
    const [user, setUser] = useState(UserContextdefaultValue.user)

    function setUserImage(img:string){
        setUser({username: user.username, image:img})
    }

    function setUserUsername(username:string){
        setUser({username: username, image:user.image})
    }

    return (
        <UserContext.Provider value={{user, setUser, setUserImage, setUserUsername}}>
            {children}
        </UserContext.Provider>
    )

    
}



const UserContext = createContext<UserContextInterface>(UserContextdefaultValue);

export { UserContext, UserProvider };