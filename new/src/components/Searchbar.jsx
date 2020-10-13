import React, { useState, useEffect } from 'react'
import styled from 'styled-components'
import { useThrottle } from '../utils/Throttle'
import {Link } from 'react-router-dom'
import { useHistory } from "react-router-dom";

const SearchBarWrapper = styled.div`
position :relative;
border:1px solid black;
border-radius:20px;
display:flex;
flex-direction:row;
padding:10px;
width:400px;
margin-left:35%;
border-bottom-right-radius :${({results})=>results?`0px`:`20px`}
border-bottom-left-radius :${({results})=>results?`0px`:`20px`}
border-bottom-color :${({results})=>results?`transparent`:`black`}
`
const IconImage = styled.img`
height:20px;
padding-right:20px;`

const Input = styled.input`
outline:none;
flex:100%;
border:none;
width:300px`

const RightSide = styled.div`
display:flex;
flex:0 0 auto;
padding-right:10px`

const Spinner = styled.div`
border:5px solid grey;
border-top: 5px solid blue;
border-radius :50%;
width:15px;
height:15px;
animation: spin 1s linear infinite;
margin-left:15px;
@keyframes spin{
    0%{
        transform :rotate (0deg)
    }
    100%{
        transform : rotate(360deg)
    }
}`


const Suggestions = styled.div`
display:flex;
flex-direction:column;
flex:0 0 auto;
width:420px;
margin-left:35%;
max-height:300px;
border-bottom-right-radius:20px;
border-bottom-left-radius:20px;

& *{
    border:1px solid grey;
    border-top-color:transparent;
    border-bottom-color:transparent;
    flex:1;
    padding:5px;
    padding-left:30px;
    text-decoration:none;
  

}
& :nth-child(${({active})=>active}){
    background:gray;
    color:white;
    font-weight:bolder
}`





export default function Searchbar({onChange,suggestions,loading,setLoading}) {
    const [q, setQ] = useState("")
    const [active, setActive] = useState(0)
    const throttleVal = useThrottle(q, 1000)
    const history = useHistory()
    const handelInput = (e) => {
        setQ(e.target.value)
        setLoading(true)
    }
    const clearQuery = ()=>{
        setQ("")
        if(loading){
            setLoading(false)
        }
    }

    useEffect (()=>{
        onChange(throttleVal)

    },[onChange,throttleVal,active])
    console.log(active,suggestions.length)
     const handleSuggestions =(e) =>{
       
         switch(e.keyCode){
             case 40 :{
                 if(active >= suggestions.length-1){
                     setActive(0)
                 }
                 else{
                     setActive((prev)=>prev+1)
                 }
                 return
             }
             case 38:{
                 if(active <= 0  ){
                     setActive(suggestions.length-1)
                 }
                 else {
                     setActive((prev) =>prev-1)
                 }
                 return
             }
             case 13 :{
                 let con = suggestions[active-1]
                 history.push(`/details/${con}`)
                 
     

             }
             default :{
                 setActive(0)
                 return
             }

         }
     }

    return (

        <>
        <SearchBarWrapper results = {suggestions.length!==0 && !loading} onKeyUp = {handleSuggestions}>
            <IconImage src="https://image.flaticon.com/icons/svg/622/622669.svg"alt="icon"/>
            <Input value={q} onChange = {handelInput}/>
            <RightSide>
                {q && <div onClick ={clearQuery}>X</div>}
                {loading && <Spinner/>}
            </RightSide>
        </SearchBarWrapper>
        {!loading  && (
             <Suggestions active={active} limit={5}>
             {suggestions.filter((items,index)=>index >=active && index<active+5).map((item,index)=>(
                 <div  key ={index} onMouseOver ={()=>setActive(index)}>{item}</div>
             
             ))}
         </Suggestions>
        )}

        </>
    )
}