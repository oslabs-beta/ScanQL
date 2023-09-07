import React from 'react'
import reactlogo from "../../assets/techstack_icons/reactlogo.png";
import nodelogo from "../../assets/techstack_icons/nodelogo.png";
import postgresqllogo from "../../assets/techstack_icons/postgresqllogo.png";
import expressjslogo from "../../assets/techstack_icons/expressjslogo.png";
import typescriptlogo from "../../assets/techstack_icons/typescriptlogo.png";
import vitelogo from "../../assets/techstack_icons/vitelogo.png";
import tailwindlogo from "../../assets/techstack_icons/tailwindlogo.png";
import jestlogo from "../../assets/techstack_icons/jestlogo.png";

const TechStackBar = () => {
  return (
    <div className ="flex bg-white bg-opacity-10 rounded-[20px] mb-10">
        <img className = 'h-24 m-5'src = {reactlogo}></img>
        <img className = 'h-24 m-5'src = {nodelogo}></img>
        <img className = 'h-24 m-5'src = {postgresqllogo}></img>
        <img className = 'h-24 m-5' src = {expressjslogo}></img>
        <img className = 'h-24 m-5' src = {typescriptlogo}></img>
        <img className = 'h-24 m-5' src = {vitelogo}></img>
        <img className = 'h-24 m-5' src = {tailwindlogo}></img>
        <img className = 'h-24 m-5' src = {jestlogo}></img>

    </div>
  )
}

export default TechStackBar