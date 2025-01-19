"use client"
import { Textarea } from "@nextui-org/react"
import { useState } from "react"
export default function SpeachGeneretor() {
    const [test, setTest] = useState("Hello")
    return <div><Textarea onChange={(e) => { setTest(e.target.value) }} /></div>

}