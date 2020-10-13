import React,{useRef,useState,useEffect} from 'react'

export const useThrottle = (value,wait)=>{
    const [throttleval,setThrottleval] =useState(value)
    const lastCall = useRef(Date.now())
    useEffect(()=>{
        const timer = setTimeout(()=>{
            if(Date.now()-lastCall.current >=wait){
                setThrottleval(value)
                lastCall.current = Date.now()
            }
        },wait - (Date.now()-lastCall))
        return ()=>{
            clearTimeout(timer)
        }
    },[value,wait])
    return throttleval

}