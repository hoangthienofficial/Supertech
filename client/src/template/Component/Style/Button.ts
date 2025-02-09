import styled from "styled-components";



type Button={
    width:string,
    height?:number,
    borderRadius:number,
    background?:string,
    border?:string
    
}
export const SButtonPrimary =styled.button<Button>`
    width: ${props=>props.width };
    height: ${props=>props.height }px;
    background: ${props=>props.background ? props.background : "linear-gradient(210deg,#fe6969,#e30713)"};
    text-align: center;
    font-size: 1.7rem;
    /* line-height: 3.9rem; */
    border-radius: ${props=>props.borderRadius}rem;
    border: ${props=>props.border?`1px solid ${props.border}` : ``}
    
`